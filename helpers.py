from database_models import User
from database_models import Category
from database_models import Photo
import re
import random
import string
import hashlib


# Helper Methods:

def photos_by_user(user_id):
    photos = Photo.query.filter(Photo.user_id == user_id).all()
    return photos


# checks password given at login against stored hashed password
def valid_login_password(username, password, pw_hash):
    salt = pw_hash.split(',')[1]
    return pw_hash == make_pw_hash(username, password, salt)


# returns user if login info is valid
def valid_login(username, password):
    user = User.query.filter(User.username == username).one_or_none()

    if user and valid_login_password(username, password, user.password):
        return user


def valid_url(url):
    url_regex = re.compile(r"https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}")
    return url and url_regex.match(url)


# returns none if password is not 5-20 char long
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


def get_category_id(category):
    category = Category.query.filter(Category.name == category).one_or_none()
    return category.id


# user by name
def user_by_name(username):
    user = User.query.filter(User.username == username).one_or_none()
    return user


def user_by_email(email):
    user = User.query.filter(User.email == email).one_or_none()
    return user


def user_by_id(user_id):
    user = User.query.filter(User.id == user_id).one_or_none()
    return user


# creates a random 5 letter salt
def make_salt():
    return ''.join(random.choice(string.letters) for x in xrange(5))


# hashes a users password
def make_pw_hash(name, password, salt=None):
    if not salt:
        salt = make_salt()
    pw_hash = hashlib.sha256(name + password + salt).hexdigest()
    return '%s,%s' % (pw_hash, salt)
