from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from slingshot.models import User, Team
from .models import Withdrawals, Deposit, OrderId
from django.views.decorators.csrf import csrf_exempt
from PayTm import Checksum
import json

with open('/etc/gamathon_config.json') as config_file:
    config = json.load(config_file)

MERCHANT_KEY = config['PAYTM_MERCHANT_KEY']

# Create your views here.
def wallet(request, username):
    context = {}
    try:
        logged_in = request.session['logged_in']
            
    except KeyError:
        return redirect('index')

    if username != request.session['username']:
        return redirect('index')

    user = User.objects.get(username=request.session['username'])
    teams = Team.objects.filter(members=user)
    context['teams'] = teams

    if request.method == 'POST':
        amount = request.POST.get('amount')

        order_no = OrderId.objects.all().last()
        order_id = order_no.order
        order_no.order = str(int(order_id)+1)
        order_no.save()

        username = request.session['username']
        # Sending request to paytm to transfer the amount to the account after user has made the payment
        data_dict = {
            'MID':config['PAYTM_MERCHANT_ID'],
            'ORDER_ID':order_id,
            'TXN_AMOUNT': amount,
            'CUST_ID':request.session['username'],
            'INDUSTRY_TYPE_ID':'Retail',
            'WEBSITE':'DEFAULT',
            'CHANNEL_ID':'WEB',
            'CALLBACK_URL':f'https://gamathon.gg/handlerequest/{username}',
        }
        data_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
        return render(request, 'wallet/paytm.html', {'data_dict': data_dict})
    
    try: 
        user = User.objects.get(username=request.session['username'])
        deposits = Deposit.objects.filter(username=user)
        withdrawals = Withdrawals.objects.filter(username=user)
        context['deposists'] = deposits
        context['withdrawals'] = withdrawals
        context['user'] = user

    except (Deposit.DoesNotExist, User.DoesNotExist):
        return render(request, 'wallet/wallet.html', context)

    return render(request, 'wallet/wallet.html', context)

def teamWallet(request, team_name):
    context = {}
    try: 
        loggin_true = request.session['logged_in']
    except KeyError:
        return HttpResponse("Sorry kiddo not here")

    user = User.objects.get(username=request.session['username'])
    context['user'] = user
    teams = Team.objects.filter(members=user)
    try:
        team = Team.objects.get(name=team_name)
    except Team.DoesNotExist:
        return render(request, 'slingshot/404.html')

    if not team in teams:
        render(request, 'slingshot/404.html')
    
    members = team.members.all()

    deposits = Deposit.objects.filter(team=team)
    transfers = Withdrawals.objects.filter(team=team)

    context['members'] = members
    context['team'] = team
    context['deposits'] = deposits
    context['transfers'] = transfers

    if request.method == 'POST':
        response_data = {}
        amount = request.POST.get('amount')
        if user.wallet < int(amount):
            response_data['status'] = 'Failed'
            response_data['message'] = f'Transaction was unsuccessful your have Rs. {user.wallet} in your personal wallet'
       
        else:
            user.wallet -= int(amount)
            team.wallet += int(amount)
            user.save()
            team.save()
            deposit = Deposit(amount=int(amount))
            deposit.save()
            deposit.username.add(user)
            deposit.team.add(team)
            deposit.save()
            response_data['status'] = 'Success'
            response_data['message'] = 'Transaction was successful'
            response_data['user_wallet'] = user.wallet
            response_data['team_wallet'] = team.wallet

        return JsonResponse(response_data)

    return render(request, 'wallet/team_wallet.html', context)

def chooseTeam(request):
    return render(request, 'wallet/choose_team.html')

@csrf_exempt
def handleRequest(request, username):
    #Handle PayTm Post request
    form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]
            
    verify = Checksum.verify_checksum(response_dict, MERCHANT_KEY, checksum)

    if verify:
        if response_dict['RESPCODE'] == '01':
            transaction = Deposit(amount=int(float(response_dict['TXNAMOUNT'])))
            transaction.save()
            transaction.username.add(username)
            user = User.objects.get(username=username)
            user.wallet = int(float(response_dict['TXNAMOUNT']))
            user.save()
        else:
            return HttpResponse('<div style="text-align: center; font-size: 17px; color: black;">Order was not successful because ' + response_dict['RESPMSG']+'</div>'+'<div style="text-align: center; margin-top: 4rem;"><a href="https://gamathon.gg/home" style="color: white; text-decoration: none; background-color: #007bff; padding: 0.8rem 1.8rem; border-radius: 6px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">Go Back</a></div>')
    return redirect('index')

def withdraw(request, username):
    if request.method == 'POST':
        user = User.objects.get(username=request.session['username'])
        response_dict = {}
        paytm_no = request.POST.get('paytmNo')
        amount = request.POST.get('amount')

        if int(amount) <= 0 or len(paytm_no) > 10:
            response_dict['status'] = 'Failed'
            response_dict['message'] = 'Please provide valide values'
        elif int(amount) > user.wallet:
            response_dict['status'] = 'Failed'
            response_dict['message'] = f'Your wallet has {user.wallet} rupees.'
        
        else:
            withdraw = Withdrawals(paytm_no=paytm_no, amount=int(amount))
            withdraw.save()
            withdraw.username.add(user)
            user.wallet -= int(amount)
            user.save()

            response_dict['status'] = 'Success'
            response_dict['message'] = f'Rs. {amount} will be transfered to you within 2 days.'
        
        return JsonResponse(response_dict)


def teamUserTXN(request, team_name):
    if request.method == 'POST':
        response_data = {}
        member = request.POST.get('member')
        amount = request.POST.get('amount')

        user = User.objects.get(username=member)
        team = Team.objects.get(name=team_name)

        if team.wallet < int(amount):
            response_data['status'] = 'Failed'
            response_data['message'] = f'Transaction was unsuccessful team wallet has Rs. {team.wallet}'
        elif int(amount) <= 0:
            response_data['status'] = 'Failed'
            response_data['message'] = 'Please provide a valid input'
        else:
            team.wallet -= int(amount)
            user.wallet += int(amount)
            team.save()
            user.save()
            transfer = Withdrawals(amount=int(amount))
            transfer.save()
            transfer.username.add(user)
            transfer.team.add(team)
            transfer.save()
            response_data['status'] = 'Success'
            response_data['message'] = 'Transaction was successful'
        
        return JsonResponse(response_data)

    return False