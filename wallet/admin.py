from django.contrib import admin
from .models import Withdrawals, Deposit, OrderId

# Register your models here.
admin.site.register(Withdrawals)
admin.site.register(Deposit)
admin.site.register(OrderId)