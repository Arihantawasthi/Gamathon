from django.contrib import admin
from .models import Game, Game_validate, Tournament, GameStat, Stage, Round, Match, Announcements, Prize, ScoreCard

# Register your models here.
admin.site.register(Game)
admin.site.register(Game_validate)
admin.site.register(Tournament)
admin.site.register(GameStat)
admin.site.register(Stage)
admin.site.register(Round)
admin.site.register(Match)
admin.site.register(Announcements)
admin.site.register(Prize)
admin.site.register(ScoreCard)
