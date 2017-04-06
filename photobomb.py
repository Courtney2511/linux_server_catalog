from flask import Flask, jsonify
from database import db_session
from database_models import Category
from flask_cors import CORS
import constants

from routes.signup import signup_api
from routes.login import login_api
from routes.logout import logout_api
from routes.photos import photos_api
from routes.fblogin import fblogin_api
from routes.photo import photo_api
from routes.user import user_api

app = Flask(__name__)
app.register_blueprint(signup_api)
app.register_blueprint(login_api)
app.register_blueprint(logout_api)
app.register_blueprint(photos_api)
app.register_blueprint(fblogin_api)
app.register_blueprint(photo_api)
app.register_blueprint(user_api)
CORS(app)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# ALL CATEGORIES
@app.route('/categories')
def get_categories():
    categories = Category.query.all()
    return jsonify(categories=[category.serialize for category in categories])


# CATEGORY BY ID
@app.route('/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.get(category_id)
    return jsonify(category.serialize)


# PHOTOS BY CATEGORY
@app.route('/categories/<int:category_id>/photos')
def get_category_photos(category_id):
    category = Category.query.get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])


# HOME
@app.route('/')
def home():
    return "this is the home page"


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = constants.SECRET_KEY
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
