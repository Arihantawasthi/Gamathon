from django.urls import path
from . import views

urlpatterns = [
    path('wallet/<slug:username>', views.wallet, name='wallet'),
    path('team-wallet/<team_name>', views.teamWallet, name='teamWallet'),
    path('handlerequest/<username>', views.handleRequest, name='handleRequest'),
    path('teamUserTXN/<team_name>', views.teamUserTXN, name='teamUserTXN'),
    path('withdraw/<username>', views.withdraw, name='withdraw')
]