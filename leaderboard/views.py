from django.shortcuts import render
from slingshot.models import User, Team
from slingshot.views import sendNotification

# Create your views here.
def leaderboard(request):
    teams = Team.objects.all().order_by('-wins')[0:20]
    users = User.objects.all().order_by('-wins')[0:20]

    sendNoti = sendNotification(request)
    context = {
        'invite_notifications': sendNoti['invite_notifications'],
        'follow_notifications': sendNoti['follow_notifications'],
        'teams': teams,
        'users': users
    }

    total_notifications = len(context['invite_notifications']) + len(context['follow_notifications'])
    context['total_notifications'] = total_notifications

    return render(request, 'leaderboard/leaderboard.html', context)