import os
import csv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.dev')
django.setup()

from slingshot.models import User, Team
from tourney.models import Tournament, Game_validate, GameStat, Round, ScoreCard, Stage, Match

tour = Tournament.objects.get(id=9)
group = Round.objects.get(tour=tour, stage=Stage.objects.get(stage_name='Qualifiers'), round_name='Group 18')
match = Match.objects.get(tour=tour, round_id=group)
scs_all = ScoreCard.objects.filter(tour=tour, match=match)

with open ('../tour_info/Updated_csv/Group 18.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for r in reader:
        team = group.team.get(name=r[1])
        if team in [i.team for i in scs_all]:
            print('Team Already Exists!')
            print(f'----------{team}-------------')
            s = ScoreCard.objects.get(tour=tour, match=match, team=team) 
            s.kills += int(r[4])
            s.points = s.in_game_rank + s.kills
            s.save()
        else:
            print('Creating a Team!')
            print(f'------------{team}------------')
            s = ScoreCard(tour=tour, match=match, team=team)
            s.save()
            s.kills += int(r[4])
            s.in_game_rank += int(r[3])
            s.save()
            scs_all = ScoreCard.objects.filter(tour=tour, match=match)
        try:
            s = ScoreCard(tour=tour, match=match, solo=Game_validate.objects.filter(gameId=r[2])[0].userName)
        except:
            continue
        s.save()
        s.kills += int(r[4])
        s.points += int(r[5])
        s.in_game_rank += int(r[3])
        s.save()
        print('Updating User!')

teams = group.team.all()
print(len(teams))
for team in teams:
    ladder = ScoreCard.objects.get(tour=tour, match=match, team=team)
    print(f'{ladder.team} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')

players = group.solo.all()
for player in players:
    try:
        ladder = ScoreCard.objects.get(tour=tour, match=match, solo=player)
    except:
        pass
    print(f'{ladder.solo} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')
