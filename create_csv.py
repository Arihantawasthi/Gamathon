import os
import csv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.prod')
django.setup()

from tourney.models import Game_validate, Tournament, Round, Match

groups = Round.objects.filter(tour=Tournament.objects.get(id=9))
groups = groups[0:4]
print(groups) 

reg_users = Tournament.objects.get(id=9).player.all()

for group in groups:
    for team in group.team.all():
        team_all_members = team.members.all()
        for i in team_all_members:
            if i in reg_users:
                group.solo.add(i)

for group in groups:
    g_dict = {}
    g_teams = group.team.all()
    g_players = group.solo.all()

    for team in g_teams:
        g_dict[team.name] = []
        for i in team.members.all():
            if i in g_players:
                g_dict[team.name].append(Game_validate.objects.get(userName=i, gameName='PUBGM').gameId)
    with open(f'../tour_info/{group.round_name}.csv', 'w') as f:
        w = csv.writer(f)
        w.writerow(['SNo.', 'Team Name', 'Player IGN', 'Rank', 'Kills', 'Points'])
        counter = 0
        for team, players in g_dict.items():
            counter += 1
            for player in players:
                w.writerow([counter, team, player, 0, 0, 0])
