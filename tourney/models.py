from django.db import models
from slingshot.models import User, Team
from organize.models import Organization
from PIL import Image
from io import BytesIO

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=60, primary_key=True)
    fullname = models.CharField(max_length=60)
    bg_image = models.ImageField(upload_to='games/bg_images', blank=True)
    card_image = models.ImageField(upload_to='games/card_images', blank=True)
    water_image = models.ImageField(upload_to='games/water_marks', blank=True)

    def __str__(self):
        return self.name

class Game_validate(models.Model):
    userName = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user', blank=True)
    gameName = models.CharField(max_length=60, blank=True)
    gameId = models.CharField(max_length=60, blank=True)

    def __str__(self):
        return f"{self.userName} plays {self.gameName} with {self.gameId}"

class Announcements(models.Model):
    ann = models.CharField(max_length=500, blank=True)

class Tournament(models.Model):
    name = models.CharField(max_length=60, blank=True)
    desc = models.CharField(max_length=500, blank=True, null=True)
    announcement = models.ForeignKey(Announcements, on_delete=models.CASCADE, related_name='announcement', blank=True, null=True)
    player = models.ManyToManyField(User, related_name='participant', blank=True)
    participants = models.PositiveIntegerField(default=0, blank=True)
    sponsor = models.CharField(max_length=50, blank=True)
    organizer = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='creator', blank=True, null=True)
    entry_fee = models.PositiveSmallIntegerField(default=0, blank=True)
    team = models.ManyToManyField(Team, related_name='team', blank=True)
    banner = models.ImageField(upload_to='tournament/banners', blank=True)
    prize_pool = models.PositiveIntegerField(default=0, blank=True)
    start_date = models.DateField(blank=True)
    start_time = models.TimeField(blank=True)
    limit = models.PositiveIntegerField(default=0, blank=True)
    winner = models.ManyToManyField(User, related_name="winner", blank=True)
    status = models.PositiveSmallIntegerField(default=0, blank=True )
    rules = models.TextField(max_length=500, blank=True)
    contact  = models.TextField(max_length=400, blank=True)
    schedule = models.TextField(max_length=600, blank=True)
    tour_nature = models.CharField(max_length=60, blank=True)
    tour_type = models.CharField(max_length=60, blank=True)
    tour_game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='tour_game', blank=True)
    place_1 = models.PositiveIntegerField(blank=True, default=0)
    place_2 = models.PositiveIntegerField(blank=True, default=0)
    place_3 = models.PositiveIntegerField(blank=True, default=0)
    place_5 = models.PositiveIntegerField(blank=True, default=0)
    place_6 = models.PositiveIntegerField(blank=True, default=0)
    place_7 = models.PositiveIntegerField(blank=True, default=0)
    place_8 = models.PositiveIntegerField(blank=True, default=0)
    place_9 = models.PositiveIntegerField(blank=True, default=0)
    place_10 = models.PositiveIntegerField(blank=True, default=0)

    def __str__(self):
        return self.name

class GameStat(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game_stats', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_stats', blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_stats', blank=True, null=True)
    games_played = models.PositiveIntegerField(default=0)
    kills = models.PositiveIntegerField(default=0)
    wins = models.PositiveIntegerField(default=0)
    loss = models.PositiveIntegerField(default=0)
    tie = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user} stats'

class Stage(models.Model):
    tour = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tourney_stage', blank=True, null=True)
    stage_name = models.CharField(max_length=20, blank=True)
    solo = models.ManyToManyField(User, related_name='solo_stage', blank=True)
    team = models.ManyToManyField(Team, related_name='team_stage', blank=True)

    def __str__(self):
        return f'{self.stage_name}'

class Round(models.Model):
    tour = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tourney_round', blank=True, null=True)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='stage_round', blank=True, null=True)
    round_name = models.CharField(max_length=20, blank=True)
    solo = models.ManyToManyField(User, related_name='solo_round', blank=True)
    team = models.ManyToManyField(Team, related_name='team_round', blank=True)
    start_date = models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    total_participants = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.round_name}'

class Match(models.Model):
    tour = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tourney_match', blank=True, null=True)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='stage_match', blank=True, null=True)
    round_id = models.ForeignKey(Round, on_delete=models.CASCADE, related_name='round_match', blank=True, null=True)
    solo = models.ManyToManyField(User, related_name='solo_match', blank=True)
    team = models.ManyToManyField(Team, related_name='team_match', blank=True)
    match_name = models.CharField(max_length=20, blank=True)
    match_number = models.PositiveSmallIntegerField(default=0)
    map_name = models.CharField(max_length=10, blank=True)
    match_status = models.SmallIntegerField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'{self.match_name}'

class ScoreCard(models.Model):
    solo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solo_score_card', blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_score_card', blank=True, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='match_score_card', blank=True, null=True)
    kills = models.PositiveSmallIntegerField(blank=True)
    wins = models.PositiveSmallIntegerField(blank=True)
    loss = models.PositiveSmallIntegerField(blank=True)
    tie = models.PositiveSmallIntegerField(blank=True)
    in_game_rank = models.PositiveSmallIntegerField(blank=True)
    points = models.PositiveSmallIntegerField(blank=True)

    def __str__(self):
        return f'{self.solo} {self.team} score card in {self.match}'
