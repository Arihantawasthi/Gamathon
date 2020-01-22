from Gamathon.settings.base import *

# Override base settings here for production environment.
DEBUG = False
ALLOWED_HOSTS = ['127.0.0.1']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')