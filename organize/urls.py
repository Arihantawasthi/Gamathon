from django.urls import path
from . import views

urlpatterns = [
    path('create-organization', views.createOrg, name='createOrg'),
    path('create-tournament/<organization>', views.createTourney, name='createTourney'),
    path('publish-tourney/<organization>', views.publishTourney, name='publishTourney'),
    path('org-profile/<orgName>/<username>', views.orgProfile, name='orgProfile'),
    path('organize', views.organize, name='organize'),
    path('upload-organization-background/<org_name>/<username>', views.uploadOrgBackground, name='uploadOrgBackground'),
    path('name-check', views.nameCheck, name='nameCheck'),
]