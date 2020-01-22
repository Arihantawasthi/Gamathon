from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.db.models import Max
from .models import Game, Game_validate, Tournament, GameStat
from slingshot.models import User, Team
from wallet.models import OrderId
from django.views.decorators.csrf import csrf_exempt
from PayTm import Checksum
import datetime
import json

with open('/etc/gamathon_config.json') as config_file:
    config = json.load(config_file)

MERCHANT_KEY = config['PAYTM_MERCHANT_KEY']

# Create your views here.
def game(request, game_name):
    context = {}
    try:
        game = Game.objects.get(name=game_name)
        context['game'] = game
        
    except Game.DoesNotExist:
        return render(request, 'slingshot/404.html')

    #VALIDATING PLAYER
    if request.method == 'POST':
        #For validating game
        response_data = {}
        gameid = request.POST.get('gameid')

        user = User.objects.get(username=request.session['username'])

        game_val = Game_validate(userName=user, gameName=game_name, gameId=gameid)
        game_val.save()
        game_stat = GameStat(user=user, game=game)
        game_stat.save()

        response_data['status'] = 'Game Validated'
        response_data['message'] = 'Connected account '+gameid

        return JsonResponse(response_data)

    try:
        user = User.objects.get(username=request.session['username'])
        gid = Game_validate.objects.get(userName=user, gameName=game_name)
        context['gameidExists'] = True
        context['gameid'] = gid.gameId

    except Game_validate.DoesNotExist:
        context['gameidExists'] = False
    
    except KeyError:
        pass
    
    try:
        #Getting validated users(TOP PLAYERS)
        games_validate = Game_validate.objects.filter(gameName=game_name)
        players = []
        for game in games_validate:
            players.append(game.userName)
        
        tournaments = Tournament.objects.filter(tour_game=game_name, status=1)                    #Getting all the tournaments related to this game

        #Getting the tournament with highest players participants(Trending Tourney)
        trending_tour = tournaments.order_by('-participants').first()
        context['tournaments'] = tournaments
        context['players'] = players[0:5]
        context['trending_tour'] = trending_tour

    except (Game_validate.DoesNotExist, Tournament.DoesNotExist):
        return render(request, 'tourney/game.html', context)

    return render(request, 'tourney/game.html', context)

def tourney(request, tour_id):
    context = {}
    response_data = {}
    try:
        tournament = Tournament.objects.get(pk=tour_id)
        context['tournament'] = tournament
    except Tournament.DoesNotExist:
        return HttpResponse('Sorry Kiddo not here!')

    participants = tournament.player.all()
    context['participants'] = participants

    all_reg_teams = tournament.team.all()
    print(type(all_reg_teams))
    context['all_reg_teams'] = all_reg_teams

    game = tournament.tour_game.name
    context['game'] = game
    #Checking if user is logged in
    try:
        user = User.objects.get(username=request.session['username'])
    except KeyError:
        pass

    #Checking if user has validated game
    try:
        user = User.objects.get(username=request.session['username'])
        game_val = Game_validate.objects.get(userName=user, gameName=game)
        context['game_validated'] = True
        #Checking if user is registered
        if user in participants:
            context['registered'] = True
        else:
            context['registered'] = False

    except (Game_validate.DoesNotExist, KeyError):
        context['game_validated'] = False
    
    #Checking if tournament is completed or not
    time = datetime.datetime.now().time()
    date = datetime.datetime.now().date()
    print(f'Current Date -{date}')
    print(f'Current Time -{time}')
    print(f'Tourney Date -{tournament.start_date}')
    print(f'Tourney Time -{tournament.start_time}')

    if date < tournament.start_date:
        tournament.status = 1
        tournament.save()
    elif date < tournament.start_date:
        if time < tournament.start_time:
            tournament.status = 1
            tournament.save()
        else:
            tournament.status = 2
    else:
        tournament.status = 2

    try:
        reg_team_members = [i.members.all() for i in all_reg_teams]
        if tournament.tour_type == 'Squad':
            for participants in reg_team_members:
                for participant in participants:
                    if participant.username == request.session['username']:
                        context['team_registered'] = True
                        break
    except KeyError:
        pass

    #Checking if the player has registered
    if request.method == 'POST':
        response_data = {}
        response_data['status'] = 0

        if tournament.tour_type == 'Squad':    
            team_name = request.POST.get('team_name')
            if team_name == '':
                response_data['status'] = 0
                response_data['message'] = 'Please select a team.'
                return JsonResponse(response_data)

            selected_team = Team.objects.get(name=team_name)
            members = selected_team.members.count()

            if members > 5:
                response_data['status'] = 0
                response_data['message'] = 'Team should have 5 members to play this tournament!'
                return JsonResponse(response_data) 

            for member in members:
                try:
                    game_stat = GameStat.objects.get(game=tournament.tour_game, user=member)
                    game_stat.games_played += 1
                    game_stat.save()
                except GameStat.DoesNotExist:
                    response_data['status'] = 0
                    response_data['message'] = f"One or more players haven't added their {tournament.tour_game.fullname} account yet."
                    return JsonResponse(response_data)

            try:
                team_game_stat = GameStat.objects.get(game=tournament.tour_game, team=selected_team)
                team_game_stat.games_played += 1
            except GameStat.DoesNotExist:
                team_game_stat = GameStat(game=tournament.tour_game, team=selected_team)
                team_game_stat.games_played += 1

            team_game_stat.save()

            response_data['status'] = 1
            tournament.team.add(selected_team)
            tournament.participants += 1
            tournament.save()
            
            return JsonResponse(response_data)

        else:
            #Paid tourney registration for single user.
            user = User.objects.get(username=request.session['username'])
            if tournament.entry_fee > 0:
                if user.wallet >= tournament.entry_fee:
                    user.wallet -= tournament.entry_fee
                    user.save()
                    tournament.player.add(user)
                    tournament.participants += 1
                    game_stat = GameStat.objects.get(game=tournament.tour_game, user=user)
                    game_stat.games_played += 1
                    game_stat.save()
                    tournament.save()

                    return redirect('tourney', tournament.id)
                    
                amount = str(tournament.entry_fee)
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
                    'CALLBACK_URL':f'http://13.235.100.9/handleRegisterRequestUser/{username}/{tour_id}',
                }
                data_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
                return render(request, 'wallet/paytm.html', {'data_dict': data_dict})
            
            tournament.player.add(user)
            tournament.participants += 1
            game_stat = GameStat.objects.get(game=tournament.tour_game, user=user)
            game_stat.games_played += 1
            game_stat.save()
            tournament.save()
            response_data['status'] = 1
            response_data['message'] = "You just registered for the Hunt. Climb your way to the top, it's time to show them what you got. Good Luck Homie!"

            return JsonResponse(response_data)

    return render(request, 'tourney/tourney.html', context)


def chooseTeam(request, tour_id):
    context = {}
    tournament = Tournament.objects.get(pk=tour_id)
    teams = Team.objects.filter(captain=request.session['username'])
    context['teams'] = teams
    context['tournament'] = tournament

    if request.method == 'POST':
        response_data = {}
        team_name = request.POST.get('team-name')
        request_type = request.POST.get('request-type')

        if request_type == 'get-players':
            if team_name == '':
                response_data['status'] = 0
                response_data['message'] = 'Please select a team.'
                return JsonResponse(response_data)
            
            selected_team = Team.objects.get(name=team_name)
            members = selected_team.members.all()
            members_results = ''
            for i in members:
                members_results += f"""<label class='player-result-container'>
                                        {i}
                                        <div class="members">{ i.name }</div>
                                        <input type='checkbox' class="member-names" name='players' value='{i}'>
                                        <span class='player-result-checkmark'></span>
                                    </label>"""

            response_data['message'] = members_results+f""" <div style="display: flex; justify-content: space-around"; width: 100%"; background-color: black";>
                                                                <div class="back-btn">Back</div>
                                                                <button class="createTeam-modal-nxt-btn" id='register-btn'>Register</button>
                                                            </div> <input type="hidden" class="team-name-input" name='team-name' value='{team_name}'>"""
            return JsonResponse(response_data)
        
        elif request_type == 'register':
            amount = str(tournament.entry_fee)
            team = Team.objects.get(name=team_name)
            if team.wallet >= int(amount):
                team.wallet -= int(amount)
                team.save()
                tournament = Tournament.objects.get(id=tour_id)
                tournament.team.add(team)
                tournament.participants += 1
                tournament.save()
                game_stat = GameStat(team=team, game=tournament.tour_game)
                game_stat.save()

                return redirect('tourney', tournament.id)

            order_no = OrderId.objects.all().last()
            order_id = order_no.order
            order_no.order = str(int(order_id)+1)
            order_no.save()

            # Sending request to paytm to transfer the amount to the account after user has made the payment
            data_dict = {
                'MID':config['PAYTM_MERCHANT_ID'],
                'ORDER_ID':order_id,
                'TXN_AMOUNT': amount,
                'CUST_ID':request.session['username'],
                'INDUSTRY_TYPE_ID':'Retail',
                'WEBSITE':'DEFAULT',
                'CHANNEL_ID':'WEB',
                'CALLBACK_URL':f'http://13.235.100.9/handleRegisterRequestTeam/{team_name}/{tour_id}',
            }
            data_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
            return render(request, 'wallet/paytm.html', {'data_dict': data_dict})

    return render(request, 'tourney/choose_team.html', context)

# Method for registering single user.
@csrf_exempt
def handleRegisterRequestUser(request, username, tour_id):
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
            user = User.objects.get(username=username)
            tournament = Tournament.objects.get(id=tour_id)
            tournament.player.add(user)
            tournament.participants += 1
            tournament.save()
            game_stat = GameStat(user=user, game=tournament.tour_game)
            game_stat.save()

            return redirect('tourney', tour_id)
        else:
            return HttpResponse('<div style="text-align: center; font-size: 17px; color: black;">Order was not successful because ' + response_dict['RESPMSG']+'</div>'+'<div style="text-align: center; margin-top: 4rem;"><a href="http://13.235.100.9/home" style="color: white; text-decoration: none; background-color: #007bff; padding: 0.8rem 1.8rem; border-radius: 6px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">Go Back</a></div>')
    return redirect('tourney', tour_id)

# Method for registering Team.
@csrf_exempt
def handleRegisterRequestTeam(request, team_name, tour_id):
    #Handle PayTm Post Request
    form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]
    
    verify = Checksum.verify_checksum(response_dict, MERCHANT_KEY, checksum)

    if verify:
        if response_dict['RESPCODE'] == '01':
            team = Team.objects.get(name=team_name)
            tournament = Tournament.objects.get(id=tour_id)
            tournament.team.add(team)
            tournament.participants += 1
            tournament.save()
            game_stat = GameStat(team=team, game=tournament.tour_game)
            game_stat.save()

            return redirect('tourney', tour_id)
        else:
            return HttpResponse('<div style="text-align: center; font-size: 17px; color: black;">Order was not successful because ' + response_dict['RESPMSG']+'</div>'+'<div style="text-align: center; margin-top: 4rem;"><a href="http://13.235.100.9/home" style="color: white; text-decoration: none; background-color: #007bff; padding: 0.8rem 1.8rem; border-radius: 6px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">Go Back</a></div>')
        return redirect('tourney', tour_id)