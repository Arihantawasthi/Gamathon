from django.contrib import admin
from .models import Organization, Notification

# Register your models here.
admin.site.register(Organization)
admin.site.register(Notification)