from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import EmailMultiAlternatives
from .models import User, Team, Invite
from django.contrib.auth.hashers import make_password, check_password
from tourney.models import Game, Game_validate, Tournament, GameStat
from organize.models import Organization, Notification
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from django.template.loader import get_template
import datetime
from . import amazonses

secret_key = URLSafeTimedSerializer('thisisasecretkey!')

def sendNotification(request):
    notifications = Notification.objects.all()
    notification_all = {}
    notification_all['invite_notifications'] = []
    notification_all['org_notifications'] = []
    notification_all['follow_notifications'] = []

    for notification in notifications:
        if notification.team != None:
            notification_all['invite_notifications'].append(notification)

        elif notification.org != None:
            notification_all['org_notifications'].append(notification)
        
        else:
            notification_all['follow_notifications'].append(notification)

    return notification_all


# Create your views here.
def index(request):
    games = Game.objects.all()
    sendNoti = sendNotification(request)
    context = {
        'games': games,
        'invite_notifications': sendNoti['invite_notifications'],
        'org_notifications': sendNoti['org_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['org_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications
    
    tournaments = Tournament.objects.filter(status=1)
    context['tournaments'] = tournaments
    
    return render(request, 'slingshot/index.html', context)

def portal(request):
    try:
        if request.session['logged_in']:
            return redirect('index')
    except KeyError:
        return render(request, 'slingshot/portal.html')
    return render(request, 'slingshot/portal.html')

""" def listTourney(request):
    active_tourney = Tournament.objects.filter(status=2)
    completed = Tournament.objects.filter(status=3)
    upcoming = Tournament.objects.filter(status=1)
    context = {
        'active': active_tourney,
        'completed': completed,
        'upcoming': upcoming,
    }
    return render(request, 'slingshot/tournament_list.html', context) """

def signUp(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        response_data = {}
        try:
            #Checking if username already exists
            if username == User.objects.get(username=username).username:
                response_data['status'] = 'Failed :('
                response_data['message'] = 'Username Already Exist!'
                return JsonResponse(response_data)

        except User.DoesNotExist:                        
            #Checking If the email is already taken or not.                       
            users = User.objects.all()
            if email in [user.email for user in users]:
                response_data['status'] = 'Failed :('
                response_data['message'] = 'Email is Already Taken'
                return JsonResponse(response_data)
            
            password = make_password(password)

            user = User(name=name, username=username, email=email, password=password)
            user.save()
            response_data['status'] = 'Success!!'
            response_data['message'] = 'Your account has been created. Verify your account by clicking the link sent to your email.'

            #Sending Confirmation Email
            token = secret_key.dumps(email, salt='email_confirm')

            #email_subject, from_email, to = 'Activate your Gamathon Account', 'kohlivirat45678@gmail.com', email
            htmly = get_template('slingshot/email.html')
            link = f'http://13.235.100.9/activate/{token}'
            context =  {
                'user': name.title(),
                'link': link,
                'time': datetime.datetime.now().strftime("%A %d, %B %Y"),
                'message': "Click the link below to activate your account!",
                'buttonContent': 'Activate Account!'
            }
            html_content = htmly.render(context)
            amazonses.BODY_HTML = html_content
            amazonses.SUBJECT = 'Activate your Gamathon Account'
            amazonses.RECIPIENTS.append(email)
            amazonses.sendEmail()
            amazonses.RECIPIENTS.clear()
            request.session['logged_in'] = True
            request.session['username'] = username
            """ msg = EmailMultiAlternatives(email_subject, html_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send() """

            return JsonResponse(response_data)

    return redirect('index')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        response_data = {}
        #Checking if password is same of not
        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password):    
                request.session['logged_in'] = True
                request.session['username'] = username

                response_data['status'] = 'Success!!'
                response_data['message'] = 'You Are Successfully Logged In.'              
                response_data['logged_in'] = True
                response_data['sessionUser'] = username
                return JsonResponse(response_data)
            else:
                response_data['status'] = 0
                response_data['message'] = 'Password is Not Correct'
                return JsonResponse(response_data)

        except User.DoesNotExist:
            response_data['status'] = 0
            response_data['message'] = 'Username Or Password Is Incorrect'
            return JsonResponse(response_data)

    return redirect('index')

def profileSettings(request, username):
    #Checking if Correct user is accessing the page
    try: 
        if request.session['username'] != username:
            return HttpResponse('Sorry Kiddo Not here')
    except KeyError:
        return HttpResponse('Sorry Kiddo Not here')
    
    this_user = User.objects.get(username=username)
    context = {
        'email': this_user.email,
        'username': this_user.username
    }

    response_data = {}

    if request.method == 'POST':
        query = request.POST.get('query')
        queryFor = request.POST.get('queryFor')

        user = User.objects.get(username=request.session['username'])
        users = User.objects.all()
        
        if queryFor == 'username':
            #Checking whether username is already exists or not
            if query in [i.username for i in users]:
                response_data['status'] = 'Failed :('
                response_data['message'] = 'Username Already Exists!'
                return JsonResponse(response_data)
            else:
                user.username = query
                user.save()
                response_data['status'] = 'Success :)'
                response_data['message'] = 'Username Has Been Updated!'
                return JsonResponse(response_data)
        
        elif queryFor == 'email':
            #Checking whether email is already taken or not
            if query in [i.email for i in users]:
                response_data['status'] = 'Failed :('
                response_data['message'] = 'Email is Already Taken'
                return JsonResponse(response_data)
            else:
                user.email = query
                user.save()
                response_data['status'] = 'Success :)'
                response_data['message'] = 'Email Has Been Updated!'
                return JsonResponse(response_data)
        
        else:
            user.password = query
            user.save()
            response_data['status'] = 'Success :)'
            response_data['message'] = 'Password Has Been Updated!'
            return JsonResponse(response_data)
    

    return render(request, 'slingshot/profile_settings.html',context=context)

def profile(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return render(request, 'slingshot/404.html')

    #Total teams that the user is in
    total_teams = user.members.all()

    sendNoti = sendNotification(request)
    context = {
        'user': user,
        'totalTeams': total_teams,
        'invite_notifications': sendNoti['invite_notifications'],
        'org_notifications': sendNoti['org_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['org_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications

    tournaments = user.participant.all()
    context['tournaments'] = tournaments

    #Getting the most played game
    played_games = [tournament.tour_game for tournament in tournaments]
    if len(played_games) > 0:
        most_played_game = max(set(played_games), key=played_games.count)
    else: 
        most_played_game = ''
    context['played_games'] = played_games
    context['most_played_game'] = most_played_game

    # Getting stats for all the games the player has played.
    # Looping through all the games to find the 'GameStat' and
    # Storing it in a list called all_stats.
    all_stats = []
    for played_game in played_games:
        all_stats.append(GameStat.objects.filter(game=played_game, user=user))
    context['all_stats'] = all_stats

    try: 
        games_validated = Game_validate.objects.filter(userName=username)
        games = []
        for game in games_validated:
            games.append(Game.objects.get(name=game.gameName))
        
        context['zipped'] = zip(games, games_validated)

        stats = GameStat.objects.get(game=most_played_game, user=user)
        context['stats'] = stats
        if stats.games_played != 0:
            context['wins_perc'] = (stats.wins // stats.games_played)*100
        else:
            context['wins_perc'] = 0

    except (Game_validate.DoesNotExist, GameStat.DoesNotExist):
        pass
    
    """Getting the data for the user whose page is visited
    to get the following data once it is searched in following
    section and then followed section.
    """
    followers = user.followers.all()
    followers = [i.username for i in followers]
    print(followers)
    context['followers'] = followers
    
    try:
        # Getting the logged_in user
        logged_in_user = User.objects.get(username=request.session['username'])
        logged_in_user_followers = logged_in_user.followers.all()
        logged_in_user_followers = [i.username for i in logged_in_user_followers]
        context['logged_in_user_followers'] = logged_in_user_followers

    except (KeyError):
        return render(request, 'slingshot/profile.html', context)

    if request.method == 'POST':
        team_name = request.POST.get('team_name')        
        join_code = request.POST.get('join_code')
        response_data = {}

        #Checking whether the user has logged in or not.
        if not request.session['logged_in']:
            response_data['status'] = 'Failed :('
            response_data['message'] = 'You Must login to Create a Team!'
            return JsonResponse(response_data)         

        #Checking if the team name already exists and promting user if it does
        print('Yha')
        try:
            if team_name == Team.objects.get(name=team_name).name:
                response_data['status'] = 'Failed :('
                response_data['message'] = 'Name is Already Taken!'
                return JsonResponse(response_data)

        except Team.DoesNotExist:
            team = Team(name=team_name, captain=request.session['username'], password=join_code)
            team.save()
            team.members.add(user)
            response_data['status'] = 'Success :)'
            response_data['message'] = 'Your Team Has been created. You Can Now Join Tournaments From this Team!'
            return JsonResponse(response_data)

    return render(request, 'slingshot/profile.html', context)


def team(request, team_name):
    games = Game.objects.all()
    sendNoti = sendNotification(request)
    context = {
        'games': games,
        'invite_notifications': sendNoti['invite_notifications'],
        'org_notifications': sendNoti['org_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
    }

    total_notifications = len(context['invite_notifications']) + len(context['org_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications

    teamObject = Team.objects.get(name=team_name)
    context['teamObject'] = teamObject
    
    members = teamObject.members.exclude(username=teamObject.captain)
    context['members'] = members

    # Getting members according to username so that it can be
    # decided whether 'Join Team' Button is to be shown or not.
    members_username = [i.username for i in members]
    context['members_username'] = members_username
    
    tour_played = Tournament.objects.filter(team=teamObject)
    context['tour_played'] = tour_played
    
    all_games_played = [tour.tour_game for tour in tour_played]
    if len(all_games_played) > 0:
        most_played_game = max(set(all_games_played), key=all_games_played.count)
    else:
        most_played_game = ''

    context['most_played_game'] = most_played_game

    all_stats = []
    all_games_played = list(dict.fromkeys(all_games_played))
    for game in all_games_played:
        try:
            all_stats.append(GameStat.objects.get(game=game, team=teamObject))
        except GameStat.DoesNotExist:
            pass
    context['all_stats'] = all_stats

    try:
        stats = GameStat.objects.get(game=most_played_game, team=teamObject)
        context['stats'] = stats
    except GameStat.DoesNotExist:
        return render(request, 'slingshot/team.html', context)

    if request.method == 'POST':
        response_data = {}
        query = request.POST.get('query')
        status = request.POST.get('status')
        
        if query is not None:
            user_term = User.objects.filter(username__icontains=query)
            user_term = [i.username for i in user_term if i not in teamObject.members.all()]

            user_results = ''
            for i in user_term:
                user_results += f"""<label class='player-result-container'>
                                    {i}
                                    <input type='checkbox' name='players' value='{i}'>
                                    <span class='checkmark'></span>
                                </label>"""

            response_data['user_results'] = user_results
            return JsonResponse(response_data)

        elif status == '1' or status == '2':
            team_object = Team.objects.get(name=team_name)
            session_user = User.objects.get(username=request.session['username'])
            invite = Invite.objects.get(user=session_user, team=team_object)
            notification = Notification.objects.get(user_1=session_user, team=team_object)
            invite.status = status
            invite.save()
            print('yha')
            if status == '1':
                team_object.members.add(session_user)
                team_object.save()
                notification.delete()
                response_data['message'] = f'You are now a member of {team_object.name}'
                return JsonResponse(response_data)

            elif status == '2':
                invite.delete()
                notification.delete()
                return JsonResponse(response_data)
        else:
            team_object = Team.objects.get(name=team_name)
            user_invitee = User.objects.get(username=request.session['username'])
            players = request.POST.getlist('players[]')
            for player in players:    
                player = User.objects.get(username=player)
                invite = Invite(user=player, team=team_object, status=0)
                invite.save()
                notification = Notification(user_1=player, user_2=user_invitee, team=team_object, update=f"{user_invitee} invited you to join {team_name}")
                notification.save()
        
            response_data['message'] = "Invite Sent"    
            return JsonResponse(response_data)

    return render(request, 'slingshot/team.html', context)

def logout(request):
    try:
        del request.session['username']
        del request.session['logged_in']
    except KeyError:
        return redirect('portal')
    return redirect('portal')

def signIn(request):
    return render(request, 'slingshot/login.html')

def register(request):
    return render(request, 'slingshot/register.html')

def activate(request, token):
    try:
        email = secret_key.loads(token, salt='email_confirm', max_age=3600)
        user = User.objects.get(email=email)
        user.is_active = True
        user.save()
    
    except SignatureExpired:
        return HttpResponse("Token is Expired")
    except BadSignature:
        return HttpResponse("This won't work kiddo")

    return render(request, 'slingshot/activate.html')

def following(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponse("Sorry Kiddo Not here ;)")

    response_data = {}
    if request.method == 'POST':
        followed = request.POST.get('followed')
        follower = request.session['username']

        # In the line below user is the person who is getting followed
        # and whose profile is being visited
        # and follower is a person who is following
        user.followers.add(User.objects.get(username=follower))
        user.save()

        response_data['status'] = 'Success!'
        response_data['message'] = f'You started following {followed}'

        followed = User.objects.get(username=followed)
        follower = User.objects.get(username=follower)
        print(followed)
        print(follower)
        # Creating a notification that someone has started following you
        notification = Notification(user_1=followed, user_2=follower, update=f"{followed} started following {follower}")
        notification.save()
        return JsonResponse(response_data)
    
    followers_data = Following.objects.filter(user_1=username, status=0)
    followers = []
    for i in follow_data:
        followers.append(i.following_name)

    return HttpResponse(followers)

def search_results(request):
    query = request.POST.get('query')
    response_data = {}
    if query:
        user_term = User.objects.filter(username__icontains=query)
        user_term = [t.username for t in user_term]

        tour_term = Tournament.objects.filter(name__icontains=query)
        tour_ids = [t.id for t in tour_term]
        tour_term = [t.name for t in tour_term]

        game_term = Game.objects.filter(name__icontains=query)
        game_term = [t.name for t in game_term]

        org_term = Organization.objects.filter(org_name__icontains=query)
        org_term = [t.org_name for t in org_term]

        user_search_results = ''
        tourney_search_results = ''
        game_search_results = ''
        org_search_results = ''
        for i in user_term:
            user_search_results += f"<a href='/profile/{i}'><li class='user-list'>{i}</li></a>"
        
        for i, j in zip(tour_term, tour_ids):
            tourney_search_results += f"<a href='/tournament/{j}'><li class='user-list'>{i}</li></a>"
        
        for i in game_term:
            game_search_results += f"<a href='/game/{i}'><li class='user-list'>{i}</li></a>"
        
        for i in org_term:
            org_search_results += f"<a href='/org-profile/{i}'><li class='user-list'>{i}</li></a>"
        
        response_data['user_term'] = user_search_results
        response_data['tour_term'] = tourney_search_results
        response_data['game_term'] = game_search_results
        response_data['org_term'] = org_search_results
    
    return JsonResponse(response_data)

def usernameCheck(request):
    if request.method == 'POST':
        response_data = {}
        query = request.POST.get('query')
        email = request.POST.get('email')
        
        if query is not None:
            try:
                #Checking if username already exists
                if query == User.objects.get(username=query).username:
                    response_data['status'] = 0
                    response_data['message'] = 'Username Already Exists!'
                    return JsonResponse(response_data)

            except User.DoesNotExist: 
                response_data['status'] = 1
                response_data['message'] = 'Username Available!'

        return JsonResponse(response_data)
    
    return redirect('index')

def forgotPass(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        response_data = {}
        try:
            if email == User.objects.get(email=email).email:
                name = User.objects.get(email=email).username
                #Sending Confirmation Email
                token = secret_key.dumps(email, salt='reset_pass')

                htmly = get_template('slingshot/email.html')
                link = f'http://13.235.100.9/accounts/password/{token}'
                context =  {
                    'user': name.title(), 
                    'link': link,
                    'time': datetime.datetime.now().strftime("%A %d, %B %Y"),
                    'message': "Click the link below to recover your password. If you didn't request for this you can ignore this email.",
                    'buttonContent': 'Recover Password!'
                }
                html_content = htmly.render(context)
                amazonses.BODY_HTML = html_content
                amazonses.SUBJECT = 'Recover your password!'
                amazonses.RECIPIENTS.append(email)
                amazonses.sendEmail()
                amazonses.RECIPIENTS.clear()
                
                """ msg = EmailMultiAlternatives(email_subject, html_content, from_email, [to])
                msg.attach_alternative(html_content, "text/html")
                msg.send() """

                response_data['status'] = 1
                response_data['message'] = f'We have sent an email with further instructions to {email}. It might take a moment to show up in your inbox. Make sure you check your spam folders too.'
            
        except User.DoesNotExist:
            response_data['status'] = 0
            response_data['message'] = 'Email does not Exists!'
        
        return JsonResponse(response_data)
    
    return redirect('index')

def resetPass(request, token):
    try:
        email = secret_key.loads(token, salt='reset_pass', max_age=3600)
        user = User.objects.get(email=email)

    except SignatureExpired:
        return HttpResponse("Token is Expired")
    except BadSignature:
        return redirect('index')

    if request.method == 'POST':
        response_data = {}
        password = request.POST.get('pass')
        user.password = make_password(password)
        user.save()
        response_data['status'] = 1

        return JsonResponse(response_data)
    return render(request, 'slingshot/resetpass.html')

def uploadProfile(request, username):
    if request.method == 'POST':
        user = User.objects.get(username=username)
        profile_back = request.FILES.get('profile-back')
        profile_pic = request.FILES.get('profile-pic')

        if profile_back == None:
            user.profile_pic = profile_pic
        elif profile_pic == None:
            user.profile_back = profile_back
        print(profile_back)
        print(profile_pic)
        user.save()
        return redirect('profile', username)
    
    return redirect('index')

def uploadTeamProfile(request, team_name):
    if request.method == 'POST':
        team = Team.objects.get(name=team_name)
        team_profile_back = request.FILES.get('profile-back')
        logo = request.FILES.get('profile-pic')

        if team_profile_back == None:
            team.logo = logo
        elif logo == None:
            team.team_banner = team_profile_back

        team.save()
        return redirect('team', team_name)
    
    return redirect('index')

def joinTeam(request, team_name):
    if request.method == 'POST':
        join_code = request.POST.get('join_code')
        username = request.POST.get('username')
        team = Team.objects.get(name=team_name)
        user = User.objects.get(username=username)
        
        response_data = {}

        if join_code == team.password:
            response_data['status'] = 1
            response_data['message'] = f'You are now a member of {team_name}'
            team.members.add(user)
        
        else:
            response_data['status'] = 0
            response_data['message'] = f'Something went wrong: Join Code provided does not matches the {team_name} join code. Please Try Again.'
        
        return JsonResponse(response_data)
    
    return redirect('index')

def privacyPolicy(request):
    return render(request, 'slingshot/privacy_policy.html')

def termsOfUse(request):
    return render(request, 'slingshot/terms_of_use.html')

def about(request):
    return render(request, 'slingshot/about.html')

def error_404(request, exception):
    return render(request, 'slingshot/404.html')

def error_500(request):
    return render(request, 'slingshot/500.html')