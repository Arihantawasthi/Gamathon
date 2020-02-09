from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='user/profile', default='user/profile/default.jpg', blank=True)
    profile_back = models.ImageField(upload_to='user/profile', default='user/profile/default-back.jpg', blank=True)
    bio = models.TextField(max_length=300, default="", blank=True)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    wallet = models.PositiveIntegerField(default=0, blank=True)
    earnings = models.PositiveIntegerField(default=0, blank=True)
    wins = models.PositiveSmallIntegerField(default=0, blank=True)
    loss = models.PositiveSmallIntegerField(default=0, blank=True)
    tie = models.PositiveSmallIntegerField(default=0, blank=True)
    kills = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)
    followers = models.ManyToManyField('User', related_name='followed_by')

    def __str__(self):
        return self.username

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    logo = models.ImageField(upload_to='team/profile', default='team/profile/default.jpg', blank=True)
    team_banner = models.ImageField(upload_to='team/profile', default='team/profile/default-back.jpg', blank=True)
    password = models.CharField(max_length=30, blank=True, null=True)
    captain = models.CharField(max_length=50)
    members = models.ManyToManyField(User, blank=True, related_name='members')
    wallet = models.PositiveIntegerField(default=0, blank=True)
    earnings = models.PositiveIntegerField(default=0, blank=True)
    wins = models.PositiveSmallIntegerField(default=0, blank=True)
    loss = models.PositiveSmallIntegerField(default=0, blank=True)
    tie = models.PositiveSmallIntegerField(default=0, blank=True)
    kills = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

class Invite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_name', blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_name', blank=True, null=True)
    status = models.PositiveSmallIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.team} 'invited' {self.user}" 

##################################
#                                #
# STATUS CODES:                  #
#       0 -> Request Pending     #
#       1 -> Reqeust Accepted    #
#       2 -> Request Declined    #
#                                #
##################################