from flask import Flask
from database.database import db_session
from flask_cors import CORS
import constants
import os
import re

from routes.session import session_api
from routes.photos import photos_api
from routes.users import users_api
from routes.categories import categories_api

static_file_regex = re.compile(r".+\.(css|js)", re.IGNORECASE)

app = Flask(__name__, static_folder='public')

app.register_blueprint(categories_api, url_prefix='/api')
app.register_blueprint(session_api, url_prefix='/api')
app.register_blueprint(photos_api, url_prefix='/api')
app.register_blueprint(users_api, url_prefix='/api')
CORS(app)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# HOME
@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def static_file(path):
    if static_file_regex.match(path):
        return app.send_static_file(path)
    return app.send_static_file('index.html')


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = constants.SECRET_KEY
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
