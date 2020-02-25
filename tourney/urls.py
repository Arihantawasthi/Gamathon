from django.urls import path
from . import views

urlpatterns = [
    path('game/<game_name>', views.game, name='game'),
    path('tournament/<int:tour_id>', views.tourney, name='tourney'),
    path('tournament/<int:tour_id>/participants', views.loadParticipants, name='loadParticipants'),
    path('tournament/<int:tour_id>/ladder', views.loadLadder, name='loadLadder'),
    path('choose-team/registration/<int:tour_id>', views.chooseTeam, name='chooseTeam'),
    path('choose-players/registration/<team_name>/<int:tour_id>', views.choosePlayers, name='choosePlayers'),
    path('handleRegisterRequestUser/<username>/<int:tour_id>', views.handleRegisterRequestUser, name='handleRegisterRequestUser'),
    path('handleRegisterRequestTeam/<team_name>/<int:tour_id>', views.handleRegisterRequestTeam, name='handleRegisterRequestTeam'),
    path('teamPaidRegistration/<team_name>/<int:tour_id>', views.teamPaidRegistration, name='teamPaidRegistration')
]