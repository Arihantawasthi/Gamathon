from django.urls import path
from . import views

urlpatterns = [
    path('game/<game_name>', views.game, name='game'),
    path('tournament/<int:tour_id>', views.tourney, name='tourney'),
    path('choose-team/registration/<int:tour_id>', views.chooseTeam, name='chooseTeam'),
    path('handleRegisterRequestUser/<username>/<int:tour_id>', views.handleRegisterRequestUser, name='handleRegisterRequestUser'),
    path('handleRegisterRequestTeam/<team_name>/<int:tour_id>', views.handleRegisterRequestTeam, name='handleRegisterRequestTeam'),
    path('teamPaidRegistration/<team_name>/<int:tour_id>', views.teamPaidRegistration, name='teamPaidRegistration')
]