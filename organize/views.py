from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from slingshot.models import User
from tourney.models import Game, Tournament, GameStat, Round, Stage, Match, ScoreCard
from .models import Organization, Notification
from .tourneyManage import split, isPowerOfTwo, totalRounds
import math
from slingshot.views import sendNotification
from django.template.loader import get_template
from slingshot import amazonses

# Create your views here.
def createOrg(request):
    try:
        user = request.session['username']
        user = User.objects.get(username=user)
    except KeyError:
        return redirect('index')
    
    if request.method == 'POST':
        org_name = request.POST.get('org_name')
        org_desc = request.POST.get('org_desc')
        org_logo = request.FILES.get('org_logo')
        org_email = request.POST.get('org_email')
        org_website = request.POST.get('org_website')
        org_insta = request.POST.get('org_insta')
        org_twitter = request.POST.get('org_twitter')
        org_twitch = request.POST.get('org_twitch')
        org_discord = request.POST.get('org_discord')
        org_youtube = request.POST.get('org_youtube')

        organization = Organization(
            org_name = org_name,
            org_owner = user,
            org_desc = org_desc,
            org_logo = org_logo,
            org_email = org_email,
            org_website = org_website,
            org_insta = org_insta,
            org_twitter = org_twitter,
            org_twitch = org_twitch,
            org_youtube = org_youtube,
            org_discord = org_discord
        )  
              
        organization.save()
        return redirect('organize')
    return render(request, 'organize/create_org.html')

def createTourney(request, organization):
    try:
        user = request.session['username']
        user = User.objects.get(username=user)
        organization = Organization.objects.get(org_name=organization)
        context = {
            'organization': organization
        }
    except (KeyError, Organization.DoesNotExist):
        return redirect('index')
    
    if request.method == 'POST':
        game_name = request.POST.get('game-name')
        tour_name = request.POST.get('tour-name')
        start_date = request.POST.get('start-date')
        start_time = request.POST.get('start-time')
        prize_pool = request.POST.get('prize-pool')
        entry_fee = request.POST.get('entry-fee')
        tour_contact = request.POST.get('tour-contact')
        rules = request.POST.get('tour-rules')
        schedule = request.POST.get('schedule')
        tour_type = request.POST.get('tour-type')
        bracket_name = request.POST.get('bracket-name')
        tour_nature = request.POST.get('tour-nature')
        participants = request.POST.get('participants')

        game = Game.objects.get(name=game_name)
        
        tournament = Tournament(
            name = tour_name,
            organizer = organization,
            entry_fee = entry_fee,
            prize_pool = prize_pool,
            start_date = start_date,
            start_time = start_time,
            limit = participants,
            status = 0,
            rules = rules,
            contact = tour_contact,
            schedule = schedule,
            tour_nature = tour_nature,
            tour_type = tour_type,
            tour_game = game
        )

        tournament.save()
        context = {
            'tournament': tournament,
        }

        teams_per_match = 20
        counter = 0
        participants = int(participants)
        no_of_matches = 3
        while participants > 1:
            counter += 1
            no_of_groups = participants // teams_per_match
            no_of_winners = 10
            
            print(no_of_groups)
            #Creating Phases/Stages for the tournament
            stage = Stage(tour=tournament, stage_name=f'Phase-{counter}')
            print(f'-----Phase-{counter}-----')
            stage.save()

            if no_of_groups == 3:
                no_of_winners = 10
                for i in range(3):
                    group = Round(tour=tournament, stage=stage, round_name=f'Group-{i+1}', total_participants=20)
                    group.save()
                    print(f"Group-{i+1} participants {20}")
                    for j in range(no_of_matches):
                        match = Match(tour=tournament, round_id=group, match_name=f'Match-{j+1}', map_name='Erangel')
                        print(f"Match-{j+1}")
                        match.save()

                no_of_teams = 30
                no_of_winners = 15
                no_of_groups = 2
                counter += 1
                stage = Stage(tour=tournament, stage_name=f'Phase-{counter}')
                stage.save()
                print(f"-----Phase-{counter}-----")

                for i in range(2):
                    group = Round(tour=tournament, stage=stage, round_name=f'Group-{i+1}', total_participants=15)
                    group.save()
                    print(f"Group-{i+1} || participants {15}")

                    for j in range(no_of_matches):
                        match = Match(tour=tournament, round_id=group, match_name=f'Match-{j+1}', map_name='Erangel')
                        print(f"Match-{j+1}")
                        match.save()
                
                no_of_winners = 10
                participants = 20
                no_of_groups = 1
                continue

            if no_of_winners <= teams_per_match//2 and (no_of_winners*no_of_groups)%20 == 0:
                participants = no_of_groups * no_of_winners
            elif no_of_groups == 1 and participants == 20:
                if no_of_winners < teams_per_match:
                    group = Round(tour=tournament, stage=stage, round_name=f'Final Group', total_participants=20)
                    print(f'Final Group || participants {20}')
                    group.save()

                    for j in range(no_of_matches):
                        match = Match(tour=tournament, round_id=group, match_name=f'Match-{j+1}', map_name='Erangel')
                        print(f"Match-{j+1}")
                        match.save()
                    break
                else:
                    print(f"Sorry No of winners should be less than 20")
            else:
                possible = []
                for i in range(teams_per_match//2+1):
                    if i*no_of_groups % 20 == 0:
                        possible.append(i)
                print(f"Sorry No of winners for this structure can only be {possible}")

            #Creating Groups/Rounds for each phase or stage
            for i in range(no_of_groups):
                group = Round(tour=tournament, stage=stage, round_name=f'Group-{i+1}', total_participants=20)
                print(f'Group={i+1} || participants={20}')
                group.save()

                #Creating Matches for each Group/Round
                for j in range(no_of_matches):
                   match = Match(tour=tournament, round_id=group, match_name=f'Match-{j+1}', map_name='Erangel')
                   print(f"Match-{j+1}")
                   match.save()

        return render(request, 'organize/draft_tourney.html', context)

    return render(request, 'organize/create_tourney.html', context)

def publishTourney(request, organization):
    if request.method == 'POST':
        banner = request.FILES.get('tour-banner')
        tour_id = request.POST.get('publish')
        tournament = Tournament.objects.get(id=tour_id)

        tournament.banner = banner
        tournament.status = 1
        tournament.save()
        return redirect('index')
    
    return HttpResponse('Na man no shit')

def orgProfile(request, orgName, username):
    organization = Organization.objects.get(org_name=orgName)
    user = User.objects.get(username=username)
    tournaments = Tournament.objects.filter(organizer=organization)
    total_prize = 0

    for tournament in tournaments:
        #Calculating total prize
        total_prize += tournament.prize_pool

    context = {
        'organization': organization,
        'user': user,
        'tournaments': tournaments,
        'total_prize': total_prize,
    }

    try:
        if request.session['username'] == user.username:
            context['is_user'] = True
    except KeyError:
        context['is_user'] = False

    return render(request, 'organize/org_profile.html', context)

def organize(request):
    sendNoti = sendNotification(request)
    context = {
        'invite_notifications': sendNoti['invite_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications
    try: 
        user = request.session['username']
        user = User.objects.get(username=user)
        organizations = Organization.objects.filter(org_owner=user)
        context['organizations'] = organizations
    except:
        pass
    return render(request, 'organize/organize.html', context)

def nameCheck(request):
    if request.method == 'POST':
        response_data = {}
        query = request.POST.get('query')

        if query is not None:
            try:
                #Checking if name already exists
                if query == Organization.objects.get(org_name=query).org_name:
                    response_data['status'] = 0
                    response_data['message'] = 'Name already exists!'
                    return JsonResponse(response_data)

            except Organization.DoesNotExist: 
                response_data['status'] = 1
                response_data['message'] = 'Name Available!'

        return JsonResponse(response_data)
    
    return redirect('index')

def uploadOrgBackground(request, org_name, username):
    if request.method == 'POST':
        organization = Organization.objects.get(org_name=org_name)
        user = User.objects.get(username=username)

        try:
            if user.username != request.session['username'] or organization.org_owner != user:
                return redirect('index')
        except KeyError:
            return redirect('index')

        logo = request.FILES.get('org-back')
        print(logo)
        organization.org_logo = logo
        organization.save()
        return redirect('orgProfile', org_name, username)

    return redirect('index')

#For sending Room Id and passwords to users
def orgPortal(request, tour_id):
    try:
        if request['username'] != 'naman1234':
            return redirect('index')
    except:
        return redirect('index')
    tour = Tournament.objects.get(pk=tour_id)
    stage = Stage.objects.get(stage_name='Qualifiers', tour=tour)
    groups = Round.objects.filter(stage=stage, tour=tour)
    context = {
        'tour': tour,
        'stage': stage,
        'groups': groups
    }
    
    if request.method == 'POST':
        response_data = {}
        stage_name = request.POST.get('stage_name')
        group_name = request.POST.get('group_name')
        room_id = request.POST.get('roomid')
        password = request.POST.get('password')
        time = request.POST.get('time')

        response_data['stage_name'] = stage_name
        response_data['group_name'] = group_name
        response_data['room_id'] = room_id
        response_data['password'] = password
        response_data['time'] = time

        tour= Tournament.objects.get(id=tour_id)
        stage = Stage.objects.get(stage_name=stage_name, tour=tour)
        group = Round.objects.get(round_name=group_name, stage=stage)

        g_dict = {}
        g_teams = group.team.all()
        g_players = group.solo.all()
        print(len(g_players))

        for team in g_teams:
            g_dict[team.name] = []
            for i in team.members.all():
                if i in g_players:
                    g_dict[team.name].append(i.email)

        print(g_dict)

        c = 0
        for recipients, emails in g_dict.items():
            c += 1
            for em in emails:
                try:
                    noti = Notification(user_1=User.objects.get(email=em), update=f'Match info: RoomID: {room_id}, Password: {password}, Slot No: {c}, Match Start Time: {time}')
                    noti.save()
                    print('DONE!')
                except Exception as e:
                    print(e)

        htmly = get_template('organize/room_email.html')
        context =  {
            'room_id': room_id,
            'password': password,
            'time': time
        }
        amazonses.SUBJECT = 'Information Regarding Room ID and Password'

        counter = 0
        for recipents, emails in g_dict.items():
            counter += 1
            context['counter'] = counter
            html_content = htmly.render(context)
            amazonses.RECIPIENTS = emails
            amazonses.BODY_HTML = html_content
            amazonses.sendEmail()
            amazonses.RECIPIENTS.clear()

        return JsonResponse(response_data)
    return render(request, 'organize/draft_tourney.html', context)