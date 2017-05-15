from database.models import User
from database.models import Category
from database.models import Photo
import re
import random
import string
import hashlib


# Helper Methods:

def photos_by_user(user_id):
    """ returns a list of photos by user_id """
    photos = Photo.query.filter(Photo.user_id == user_id).all()
    return photos


def valid_login_password(username, password, pw_hash):
    """ checks login password against stored hashed password """
    salt = pw_hash.split(',')[1]
    return pw_hash == make_pw_hash(username, password, salt)


def valid_login(username, password):
    """ returns user is login info is valid """
    user = User.query.filter(User.username == username).one_or_none()
    if user and valid_login_password(username, password, user.password):
        return user


def valid_url(url):
    """ checks for valid url """
    url_regex = re.compile(r"https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}")
    return url and url_regex.match(url)


def valid_username(username):
    """ checks for valid username (5-20 char long) """
    user_regex = re.compile(r"^.{5,20}$")
    return username and user_regex.match(username)


def valid_email(email):
    """ checks for valid email address """
    email_regex = re.compile(r"^[\S]+@[\S]+.[\S]+$")
    return email and email_regex.match(email)


def valid_password(password):
    """ checks for valid password (8-20 char long)"""
    password_regex = re.compile(r"^.{8,20}$")
    return password and password_regex.match(password)


def get_category_id(category):
    """ returns category id for a category name"""
    category = Category.query.filter(Category.name == category).one_or_none()
    return category.id


# user by name
def user_by_name(username):
    """ returns User by username """
    user = User.query.filter(User.username == username).one_or_none()
    return user


def user_by_email(email):
    """" returns User by email """
    user = User.query.filter(User.email == email).one_or_none()
    return user


def user_by_id(user_id):
    """ returns User by id"""
    user = User.query.filter(User.id == user_id).one_or_none()
    return user


def make_salt():
    """ returns a random 5 letter salt """
    return ''.join(random.choice(string.letters) for x in xrange(5))


# hashes a users password
def make_pw_hash(name, password, salt=None):
    """ returns a hash of a users password with a salt """
    if not salt:
        salt = make_salt()
    pw_hash = hashlib.sha256(name + password + salt).hexdigest()
    return '%s,%s' % (pw_hash, salt)
