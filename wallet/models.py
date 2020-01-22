from django.db import models
from slingshot.models import User, Team

# Create your models here.
class Deposit(models.Model):
    username = models.ManyToManyField(User, related_name='user_deposit', blank=True)
    team = models.ManyToManyField(Team, related_name='team_deposit', blank=True)
    amount = models.PositiveIntegerField(default=0)
    date = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"Deposited {self.amount} on {self.date}"

class Withdrawals(models.Model):
    paytm_no = models.CharField(max_length=12, blank=True)
    username = models.ManyToManyField(User, related_name='user_withdrawal', blank=True)
    team = models.ManyToManyField(Team, related_name='team_withdrawal', blank=True)
    amount = models.PositiveIntegerField(default=0)
    date = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"Withdrew Rs. {self.amount} on {self.date}"
        
class OrderId(models.Model):
    order = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"Order No. {self.order}"