from Gamathon.settings.base import *

# Override base settings here for production environment.
DEBUG = True

ALLOWED_HOSTS = ['gamathon.gg', 'www.gamathon.gg']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

INSTALLED_APPS.append('compressor')

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder'
)

COMPRESS_JS_FILTERS = [
    'compressor.filters.jsmin.JSMinFilter',
]

COMPRESS_CSS_FILTERS = [
    'compressor.filters.cssmin.CSSMinFilter',
    'compressor.filters.css_default.CssAbsoluteFilter',
]
