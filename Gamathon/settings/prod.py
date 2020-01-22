from Gamathon.settings.base import *

# Override base settings here for production environment.
DEBUG = False
ALLOWED_HOSTS = ['13.126.115.12', 'gamathon.gg', 'www.gamathon.gg']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')