from django.db import models
from slingshot.models import User, Team

# Create your models here.
class Organization(models.Model):
    org_name = models.CharField(max_length=60, primary_key=True)
    org_owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='org', blank=True)
    org_desc = models.TextField(max_length=500, blank=True)
    org_logo = models.ImageField(upload_to='media/organazition/profile-pics', blank=True)
    org_email = models.CharField(max_length=60, blank=True)
    org_website = models.CharField(max_length=60, blank=True)
    org_insta = models.CharField(max_length=60, blank=True)
    org_twitter = models.CharField(max_length=60, blank=True)
    org_twitch = models.CharField(max_length=60, blank=True)
    org_youtube = models.CharField(max_length=60, blank=True)
    org_discord = models.CharField(max_length=60, blank=True)

    def __str__(self):
        return self.org_name

class Notification(models.Model):
    user_1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_1', blank=True, null=True)
    user_2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_2', blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_notification', blank=True, null=True)
    org = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='org', blank=True, null=True)
    update = models.TextField(max_length=300, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f"Notification:= {self.update}"
