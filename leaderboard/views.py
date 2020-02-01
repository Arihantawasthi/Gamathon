from django.shortcuts import render
from slingshot.models import User, Team

# Create your views here.
def leaderboard(request):
    teams = Team.objects.all().order_by('-wins')[0:20]
    users = User.objects.all().order_by('-wins')[0:20]
    
    context = {
        'teams': teams,
        'users': users
    }
    return render(request, 'leaderboard/leaderboard.html', context)