import os
import csv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.dev')
django.setup()

from slingshot.models import User, Team
from tourney.models import Tournament, Game_validate, GameStat, Round, ScoreCard, Stage, Match

tour = Tournament.objects.get(id=1)
group = Round.objects.get(tour=tour, stage=Stage.objects.get(stage_name='Semi-Finals'), round_name='Group 1')
match = Match.objects.filter(tour=tour, round_id=group, stage=Stage.objects.get(stage_name='Semi-Finals'))[0]

scs_all = ScoreCard.objects.filter(tour=tour, match=match)

with open ('./Group 1.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for r in reader:
        if Team.objects.get(name=r[1]) in [i.team for i in scs_all]:
            print('Team Already Exists!')
            s = ScoreCard.objects.get(tour=tour, match=match, team=Team.objects.get(name=r[1])) 
            s.kills += int(r[4])
            s.points = s.in_game_rank + s.kills
            s.save()
        else:
            print('Creating a Team!')
            s = ScoreCard(tour=tour, match=match, team=Team.objects.get(name=r[1]))
            s.save()
            s.kills += int(r[4])
            s.in_game_rank += int(r[3])
            s.save()
            scs_all = ScoreCard.objects.filter(tour=tour, match=match)

        s = ScoreCard(tour=tour, match=match, solo=Game_validate.objects.get(gameId=r[2]).userName)
        s.save()
        s.kills += int(r[4])
        s.points += int(r[5])
        s.in_game_rank += int(r[3])
        s.save()
        print('Updating User!')

teams = Team.objects.all()
for team in teams:
    ladder = ScoreCard.objects.get(tour=tour, match=match, team=team)
    print(f'{ladder.team} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')

players = User.objects.all()
for player in players:
    print(player)
    ladder = ScoreCard.objects.get(tour=tour, match=match, solo=player)
    print(f'{ladder.solo} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')