from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('home', views.index, name='index'),
    path('', views.portal, name='portal'),
    path('about', views.about, name='about'),
    path('profile-settings/<username>', views.profileSettings, name='profileSettings'),
    path('profile/<username>', views.profile, name='profile'),
    path('team/<team_name>', views.team, name='team'),
    path('login', views.login, name='login'),
    path('signup', views.signUp, name='signUp'),
    path('logout', views.logout, name='logout'),
    path('activate/<token>', views.activate, name='activate'),
    path('signin', views.signIn, name='signIn'),
    path('register', views.register, name='register'),
    path('following/<username>', views.following, name='following'),
    path('search_results', views.search_results, name='search_results'),
    path('usernameCheck', views.usernameCheck, name='usernameCheck'),
    path('forgot-password', views.forgotPass, name='forgotPass'),
    path('upload-profile/<username>', views.uploadProfile, name='uploadProfile'),
    path('upload-team-profile/<team_name>', views.uploadTeamProfile, name='uploadTeamProfile'),
    path('join-team/<team_name>', views.joinTeam, name='joinTeam'),
    path('accounts/password/<token>', views.resetPass, name='resetPass'),
    path('privacy-policy', views.privacyPolicy, name='privacyPolicy'),
    path('terms-of-use', views.termsOfUse, name='termsOfUse'),
    path('remove-member/<member>', views.removeMember, name='removeMember'),
    path('robots.txt', TemplateView.as_view(template_name="slingshot/robots.txt", content_type="text/plain")),
]