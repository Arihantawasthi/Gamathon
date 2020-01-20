from django.contrib import admin
from .models import Game, Game_validate, Tournament, GameStat, Stage, Round, Match, ScoreCard, Announcements

# Register your models here.
admin.site.register(Game)
admin.site.register(Game_validate)
admin.site.register(Tournament)
admin.site.register(GameStat)
admin.site.register(Stage)
admin.site.register(Round)
admin.site.register(Match)
admin.site.register(ScoreCard)
admin.site.register(Announcements)