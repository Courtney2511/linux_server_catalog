import random
import string
import hashlib
import hmac
import re
from flask import Flask, render_template, url_for, request, redirect, \
    flash, jsonify
from flask import session as login_session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_models import Base, Category, User, Photo
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


engine = create_engine('sqlite:///photocatalogue.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


# -- Signup -- #

@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    username = data['username']
    password = data['password']
    # hash the password for db storage
    pw_hash = make_pw_hash(username, password)
    # create new user object with hashed password
    new_user = User(username=username,
                    email=data['email'],
                    password=pw_hash
                    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    # return user JSON and status code
    return jsonify(user=new_user.serialize), 200


@app.route('/test')
def test():



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


# user by name
def user_by_name(username):
    user = session.query(User).filter_by(username="Courtney").one()
    print user
    return user


# creates a random 5 letter salt
def make_salt():
    return ''.join(random.choice(string.letters) for x in xrange(5))


def make_pw_hash(name, password, salt=None):
    if not salt:
        salt = make_salt()
    pw_hash = hashlib.sha256(name + password + salt).hexdigest()
    return '%s,%s' % (pw_hash, salt)
# -- PHOTO -- #


# ALL Photos
@app.route('/photos', methods=['GET'])
def photosJSON():
    photos = session.query(Photo).all()
    return jsonify(photos=[photo.serialize for photo in photos])


# Photo By Id
@app.route('/photos/<int:photo_id>', methods=['GET'])
def photoJSON(photo_id):
    photo = session.query(Photo).get(photo_id)
    return jsonify(photo=photo.serialize)


# NEW photo
@app.route('/photos', methods=['POST'])
def newPhoto():
    data = request.get_json()
    # adds photo instance to db from POST request data
    newPhoto = Photo(description=data['description'],
                     picture=data['picture'],
                     category_id=data['category_id'],
                     user_id=data['user_id'])
    session.add(newPhoto)
    session.commit()
    session.refresh(newPhoto)
    return jsonify(photo=newPhoto.serialize)


# EDIT Photo
@app.route('/photos/<int:photo_id>', methods=['PUT'])
def editPhoto(photo_id):
    photo = session.query(Photo).get(photo_id)
    photo.description = data['description']
    photo.picture = data['picture']
    photo.category_id = data['category_id']
    session.add(Photo)
    session.commit()
    return jsonify(photo=photo.serialize)


# delete photo
@app.route('/photos/<int:photo_id>', methods=['DELETE'])
def deletePhoto(photo_id):
    photo = session.query(Photo).get(photo_id)
    if photo is None:
        return jsonify(Message="Not Found"), 404
    session.delete(photo)
    session.commit()
    return jsonify(success=true)

# -- CATEGORY -- #


# Categories
@app.route('/categories')
def categoriesJSON():
    categories = session.query(Category).all()
    return jsonify(categories=[category.serialize for category in categories])


# Category
@app.route('/categories/<int:category_id>')
def categoryJSON(category_id):
    category = session.query(Category).get(category_id)
    return jsonify(category.serialize)


# Photos by Category
@app.route('/categories/<int:category_id>/photos')
def categoryPhotosJSON(category_id):
    category = session.query(Category).get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])


# -- USER -- #

# all users
@app.route('/users')
def users():
    users = session.query(User).all()
    return jsonify(users=[user.serialize for user in users])


# New User
@app.route('/users/new', methods=['GET', 'POST'])
def newUser():
    if request.method == 'POST':
        newUser = User(name=request.form['name'],
                       email=request.form['email'])
        session.add(newUser)
        session.commit()


# home
@app.route('/')
def home():
    categories = session.query(Category).all()
    print categories
    return render_template('testpage.html', categories=categories)

# Helper Methods:


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = 'super_secret_key'
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
