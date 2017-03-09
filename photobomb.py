import random
import string
import hashlib
import hmac
import re
from flask import Flask, render_template, url_for, request, redirect, \
    flash, jsonify
from flask import session as login_session
from database import db_session
from database_models import Base, Category, User, Photo
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# DELETE USER
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(user)
    db_session.commit()
    return jsonify(success=True)


# NEW USER
@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']

    # check for valid data
    message = dict(username=username, email=email)
    success = True

    if not valid_username(str(username)):
        message['error_username'] = "Username is not valid"
        success = False
    if user_by_name(username) is not None:
        message['error_username'] = "Username is taken"
        success = False
    if not valid_password(password):
        message['error_password'] = "Password is not valid"
        success = False
    if not valid_email(email):
        message['error_email'] = "Email is not valid"
        success = False
    if user_by_email(str(email)) is not None:
        message['error_email'] = "Email already in use"
    if success is False:
        message['success'] = "False"
        return jsonify(message=message)

    # hash the password for db storage
    pw_hash = make_pw_hash(username, password)
    # create new user object with hashed password
    new_user = User(username, email, pw_hash)
    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)
    # return user JSON and status code
    return jsonify(user=new_user.serialize), 200


# returns none is password is not 5-20 char long
def valid_username(username):
    user_regex = re.compile(r"^.{5,20}$")
    return username and user_regex.match(username)


# returns none if not valid email
def valid_email(email):
    email_regex = re.compile(r"^[\S]+@[\S]+.[\S]+$")
    return email and email_regex.match(email)


# returns none if password not 8-20 characters
def valid_password(password):
    password_regex = re.compile(r"^.{8,20}$")
    return password and password_regex.match(password)


# user by name
def user_by_name(username):
    user = User.query.filter_by(username=username).one()
    print user.username
    return user


def user_by_email(email):
    user = User.query.filter_by(email=email).one()
    return user


# creates a random 5 letter salt
def make_salt():
    return ''.join(random.choice(string.letters) for x in xrange(5))


def make_pw_hash(name, password, salt=None):
    if not salt:
        salt = make_salt()
    pw_hash = hashlib.sha256(name + password + salt).hexdigest()
    return '%s,%s' % (pw_hash, salt)


@app.route('/test')
def test():
    return "test page"


@app.route('/login', methods=['GET', 'POST'])
def login():
    # create a state token to prevent forgery
    state = ''.join(random.choice(string.ascii_uppercase +
                                  string.digits) for x in xrange(32))
    # store token in the session
    login_session['state'] = state
    # get login data from request
    data = request.get_json()
    username = data['username']
    password = data['password']
    return "working on this still"


# checks password given at login against stored hashed password
def valid_login_password(username, password, pw_hash):
    salt = pw_hash.split(',')[1]
    return pw_hash == make_pw_hash(username, password, salt)


# -- PHOTO -- #


# ALL Photos
@app.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize for photo in photos])


# Photo By Id
@app.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    photo = Photo.query.get(photo_id)
    return jsonify(photo=photo.serialize)


# NEW photo
@app.route('/photos', methods=['POST'])
def new_photo():
    data = request.get_json()
    # adds photo instance to db from POST request data
    newPhoto = Photo(data['description'], data['picture'], data['category_id'],
                     data['user_id'])
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    return jsonify(photo=newPhoto.serialize)


# EDIT Photo
@app.route('/photos/<int:photo_id>', methods=['PUT'])
def edit_photo(photo_id):
    photo = Photo.query.get(photo_id)
    data = request.get_json()
    photo.description = data['description']
    photo.picture = data['picture']
    photo.category_id = data['category_id']
    db_session.add(photo)
    db_session.commit()
    return jsonify(photo=photo.serialize)


# DELETE photo
@app.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(photo)
    db_session.commit()
    return jsonify(success=true)

# -- CATEGORY -- #


# Categories
@app.route('/categories')
def get_categories():
    categories = Category.query.all()
    return jsonify(categories=[category.serialize for category in categories])


# Category
@app.route('/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.get(category_id)
    return jsonify(category.serialize)


# Photos by Category
@app.route('/categories/<int:category_id>/photos')
def get_category_photos(category_id):
    category = Category.query.get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])


# -- USER -- #

# all users
@app.route('/users')
def get_users():
    users = User.query.all()
    return jsonify(users=[user.serialize for user in users])


# New User
@app.route('/users/new', methods=['GET', 'POST'])
def new_user():
    if request.method == 'POST':
        newUser = User(request.form['name'], request.form['email'],
                       request.form['password'])
        db_session.add(newUser)
        db_session.commit()


# home
@app.route('/')
def home():
    print "this is the home page"

# Helper Methods:


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = 'super_secret_key'
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
