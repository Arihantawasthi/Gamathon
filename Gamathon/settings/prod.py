from Gamathon.settings.base import *

# Override base settings here for production environment.
DEBUG = False
ALLOWED_HOSTS = ['13.235.100.9', 'gamathon.gg', 'www.gamathon.gg']
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
