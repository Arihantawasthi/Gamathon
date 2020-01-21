from Gamathon.settings.base import *

# Override base settings here for production environment.
DEBUG = False
ALLOWED_HOSTS = ['13.126.147.71']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')