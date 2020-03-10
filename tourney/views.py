from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.db.models import Max, Q
from .models import Game, Game_validate, Tournament, GameStat, Announcements, Prize, Round, Stage, Match, ScoreCard
from slingshot.models import User, Team
from wallet.models import OrderId
from django.views.decorators.csrf import csrf_exempt
from PayTm import Checksum
import datetime
import json
from slingshot.views import sendNotification

with open('/etc/gamathon_config.json') as config_file:
    config = json.load(config_file)

MERCHANT_KEY = config['PAYTM_MERCHANT_KEY']

# Create your views here.
def game(request, game_name):
    #Getting notifications of the user
    sendNoti = sendNotification(request)
    context = {
        'invite_notifications': sendNoti['invite_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
        'group_notifications': sendNoti['group_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['follow_notifications']) + len(context['group_notifications'])
    context['total_notifications'] = total_notifications
    try:
        game = Game.objects.get(name=game_name)
        context['game'] = game
        
    except Game.DoesNotExist:
        return render(request, 'slingshot/404.html')

    try:
        user = User.objects.get(username=request.session['username'])
        gid = Game_validate.objects.get(userName=user, gameName=game_name)
        context['gameidExists'] = True
        context['gameid'] = gid.gameId

    except (Game_validate.DoesNotExist, KeyError):
        context['gameidExists'] = False
    
    try:
        #Getting TOP Players of the Game
        top_players = GameStat.objects.select_related('user').filter(
            Q(game=game) & ~Q(user=None)
        ).order_by('-points')[0:5]

        #Getting all the tournaments related to this game
        tournaments = Tournament.objects.filter(Q(tour_game=game, status=1) | Q(tour_game=game, status=2))

        #Getting the tournament with highest players participants(Trending Tourney)
        trending_tour = tournaments.order_by('-participants').first()
        context['tournaments'] = tournaments
        context['trending_tour'] = trending_tour
        context['top_players'] = top_players

    except (Game_validate.DoesNotExist, Tournament.DoesNotExist):
        return render(request, 'tourney/game.html', context)
    
    #VALIDATING PLAYER
    if request.method == 'POST':
        #For validating game
        response_data = {}
        gameid = request.POST.get('gameid')
        changed = request.POST.get('changed')
        print(gameid+' Game Id')
        print(changed+ ' Statues')

        user = User.objects.get(username=request.session['username'])

        #For Request for changing Game Account
        if changed == 'True':
            game_val = Game_validate.objects.get(userName=user, gameName=game_name)
            game_val.gameId = gameid
            game_val.save()
            print(gameid+' changed')
            response_data['status'] = 'Game Account Changed!'
            response_data['message'] = 'Connected Account '+gameid

        elif changed == 'False':
            game_val = Game_validate(userName=user, gameName=game_name, gameId=gameid)
            game_val.save()
            game_stat = GameStat(user=user, game=game)
            game_stat.save()
            print(gameid+' validate')
            response_data['status'] = 'Game Validated!'
            response_data['message'] = 'Connected account '+gameid

        return JsonResponse(response_data)

    return render(request, 'tourney/game.html', context)

def tourney(request, tour_id):
    #Getting all the notifications of the user.
    sendNoti = sendNotification(request)
    context = {
        'invite_notifications': sendNoti['invite_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
        'group_notifications': sendNoti['group_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['follow_notifications']) + len(context['group_notifications'])
    context['total_notifications'] = total_notifications

    response_data = {}
    try:
        tournament = Tournament.objects.get(pk=tour_id)
        context['tournament'] = tournament
    except Tournament.DoesNotExist:
        return HttpResponse('Sorry Kiddo not here!')

    participants = tournament.player.all().prefetch_related('user')
    context['participants'] = participants

    game = tournament.tour_game.name
    context['game'] = game

    prizes = tournament.tour_prize.all()
    context['prizes'] = tournament.tour_prize.all().order_by('place')

    announcements = tournament.tour_ann.all()
    context['announcements'] = tournament.tour_ann.all()
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

    if tournament.status == 1:
        if date < tournament.start_date:
            tournament.status = 1
            tournament.save()
        elif date >= tournament.start_date:
            if time < tournament.start_time:
                tournament.status = 1
                tournament.save()
            else:
                tournament.status = 2
                tournament.save()
        else:
            tournament.status = 2
            tournament.save()

    """ stage = Stage.objects.get(tour=tournament, stage_name='Qualifiers')
    context['groups'] = Round.objects.only('round_name').filter(tour=tournament, stage=stage)
    context['stages'] = Stage.objects.only('stage_name').filter(tour=tournament)
    context['matches'] = Match.objects.only('match_name').filter(tour=tournament, round_id=Round.objects.get(round_name='Group 1', tour=tournament, stage=stage))
    g1_players = Round.objects.filter(tour=tournament, stage=stage)[5].team.all()
    g1 = Round.objects.filter(tour=tournament, stage=stage)[5] """
    score_card = []
    """ for p in g1_players:
        match = Match.objects.get(tour=tournament, round_id=g1, match_name='Match 1')
        score = ScoreCard.objects.get(tour=tournament, match=match, team=p)
        score_card.append(score) """
    
    score_card = sorted(score_card, key=lambda x: (x.points, x.kills), reverse=True)

    context['score_card'] = score_card

    #Checking if the player has registered
    if request.method == 'POST':
        response_data = {}
        response_data['status'] = 0

        if tournament.tour_type == 'Squad':    
            team_name = request.POST.get('team-name')
            selected_members = request.POST.getlist('players')
            print(selected_members)
            if team_name == '':
                response_data['status'] = 0
                response_data['message'] = 'Please select a team.'
                return JsonResponse(response_data)

            selected_team = Team.objects.get(name=team_name)
            for member in selected_members:
                tournament.player.add(member)
                try:
                    game_stat = GameStat.objects.get(game=tournament.tour_game, user=member)
                    game_stat.games_played += 1
                    game_stat.save()
                except GameStat.DoesNotExist:
                    response_data['status'] = 0
                    response_data['message'] = f"{member} haven't added {tournament.tour_game.fullname} account yet."
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
            
            return redirect('tourney', tournament.id)

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
                    'CALLBACK_URL':f'https://gamathon.gg/handleRegisterRequestUser/{username}/{tour_id}',
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
    sendNoti = sendNotification(request)
    context = {
        'invite_notifications': sendNoti['invite_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications
    
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
            valid_members = []
            for member in members:
                try:
                    game_valid = Game_validate.objects.get(userName=member, gameName=tournament.tour_game.name)
                    valid_members.append(member)
                except Game_validate.DoesNotExist:
                    pass

            members_results = ''
            for i in valid_members:
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
            selected_members = request.POST.getlist('selectedPlayers[]')
            members = [User.objects.get(username=i) for i in selected_members]

            if team.wallet >= int(amount):
                team.wallet -= int(amount)
                team.save()
                tournament = Tournament.objects.get(id=tour_id)
                tournament.team.add(team)
                for member in members:
                    tournament.players.add(member)
                    player_stat = GameStat.objects.get(user=member, game=tournament.tour_game)
                    player_stat.games_played += 1

                tournament.participants += 1
                tournament.save()
                try:
                    game_stat = GameStat.objects.get(team=team, game=tournament.tour_game)
                    game_stat.games_played += 1
                    game_stat.save()
                except GameStat.DoesNotExist:
                    game_stat = GameStat(team=team, game=tournament.tour_game)
                    game_stat.games_played += 1
                    game_stat.save()
                return redirect('tourney', tournament.id)

    return render(request, 'tourney/choose_team.html', context)


def choosePlayers(request, team_name, tour_id):
    team = Team.objects.get(name=team_name)
    tour = Tournament.objects.get(id=tour_id)
    members = team.members.all()
    valid_members = []
    for member in members:
        try:
            game_valid = Game_validate.objects.get(userName=member, gameName=tour.tour_game.name)
            valid_members.append(member)
        except Game_validate.DoesNotExist:
            pass

    context = {
        'members': valid_members,
        'team': team,
        'tour': tour
    } 

    return render(request, 'tourney/choose_members.html', context)

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
            return HttpResponse('<div style="text-align: center; font-size: 17px; color: black;">Order was not successful because ' + response_dict['RESPMSG']+'</div>'+'<div style="text-align: center; margin-top: 4rem;"><a href="https://gamathon.gg/home" style="color: white; text-decoration: none; background-color: #007bff; padding: 0.8rem 1.8rem; border-radius: 6px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">Go Back</a></div>')
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
            return HttpResponse('<div style="text-align: center; font-size: 17px; color: black;">Order was not successful because ' + response_dict['RESPMSG']+'</div>'+'<div style="text-align: center; margin-top: 4rem;"><a href="https://gamathon.gg/home" style="color: white; text-decoration: none; background-color: #007bff; padding: 0.8rem 1.8rem; border-radius: 6px; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);">Go Back</a></div>')
        return redirect('tourney', tour_id)

def teamPaidRegistration(request, team_name, tour_id):
    order_no = OrderId.objects.all().last()
    order_id = order_no.order
    order_no.order = str(int(order_id)+1)
    order_no.save()

    tournament = Tournament.objects.get(id=tour_id)
    
    # Sending request to paytm to transfer the amount to the account after user has made the payment
    data_dict = {
        'MID':config['PAYTM_MERCHANT_ID'],
        'ORDER_ID':order_id,
        'TXN_AMOUNT': str(tournament.entry_fee),
        'CUST_ID':request.session['username'],
        'INDUSTRY_TYPE_ID':'Retail',
        'WEBSITE':'DEFAULT',
        'CHANNEL_ID':'WEB',
        'CALLBACK_URL':f'https://gamathon.gg/handleRegisterRequestTeam/{team_name}/{tour_id}',
    }
    data_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
    return render(request, 'wallet/paytm.html', {'data_dict': data_dict})

def loadParticipants(request, tour_id):
    tournament = Tournament.objects.get(id=tour_id)
    all_reg_teams = tournament.team.all()
    participants = tournament.player.all()
    context = {
        'all_reg_teams': all_reg_teams,
        'participants': participants
    }

    return render(request, 'tourney/load_participants.html', context)    

def loadLadder(request, tour_id):
    context = {}
    tournament = Tournament.objects.get(id=tour_id)
    stage_name = request.GET.get('stage_name')
    match_name = request.GET.get('match_name')
    round_name = request.GET.get('round_name')

    stage = Stage.objects.get(tour=tournament, stage_name=stage_name)
    try:
        group = Round.objects.get(tour=tournament, round_name=round_name, stage=stage)
        match = Match.objects.get(tour=tournament, round_id=group, stage=stage, match_name=match_name)
    except:
        context['note'] = f'{stage_name} hasn\'t started yet.'
        context['status'] = 1
        return render(request, 'tourney/load_ladder.html', context)

    r = Round.objects.get(round_name='Group 1', tour=tournament, stage=stage)
    context['groups'] = Round.objects.only('round_name').filter(tour=tournament, stage=stage)
    context['matches'] = Match.objects.only('match_name').filter(tour=tournament, round_id=r)
    all_teams = group.team.all()
    score_card = []
    for team in all_teams:
        score = ScoreCard.objects.get(tour=tournament, match=match, team=team)
        score_card.append(score)
        
    score_card = sorted(score_card, key=lambda x: (x.points, x.kills), reverse=True)
    context['score_card'] = score_card
    return render(request, 'tourney/load_ladder.html', context)

def loadOptions(request, tour_id):
    context = {}
    tour = Tournament.objects.get(id=tour_id)
    stage_name = request.GET.get('stage_name')
    round_name = request.GET.get('round_name')

    stage = Stage.objects.get(stage_name=stage_name)
    groups = Round.objects.only('round_name').filter(stage=stage, tour=tour)
    context['groups'] = groups
    return render(request, 'tourney/load_options.html', context)