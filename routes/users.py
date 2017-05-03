from flask import Blueprint, jsonify, request
from database.models import User
from database.database import db_session
import helpers


users_api = Blueprint('users_api', __name__)


@users_api.route('/users', methods=['GET'])
def get_users():
    """ Returns all Users """
    users = User.query.all()
    return jsonify([user.serialize for user in users]), 200


@users_api.route('/users/<int:user_id>/photos', methods=['GET'])
def get_photos(user_id):
    """ returns photos belonging to a user """
    photos = helpers.photos_by_user(user_id)
    print photos
    if len(photos) == 0:
        return jsonify(message="You have no photo posts"), 404
    photos = [photo.serialize for photo in photos]
    return jsonify(photos), 200


@users_api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """ Deletes a User """
    user = User.query.get(user_id)
    if user is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(user)
    db_session.commit()
    return jsonify(success=True)


@users_api.route('/users', methods=['POST'])
def signup():
    """ Creates a new User """
    data = request.get_json()

    # make sure all required data is present
    message = {}
    success = ''

    username = data['username']
    password = data['password']
    email = data['email']

    # check for missing data
    if username == '':
        message['error_username'] = "username is required"
        success = False
    if password == '':
        message['error_password'] = "password is required"
        success = False
    if email == '':
        message['error_email'] = "email is required"
        success = False
    if success is False:
        message['success'] = False
        return jsonify(errors=message), 200

    # check for valid data
    if not helpers.valid_username(str(username)):
        message['error_username'] = "Username is not valid"
        success = False
    if helpers.user_by_name(username) is not None:
        message['error_username'] = "Username is taken"
        success = False
    if not helpers.valid_password(password):
        message['error_password'] = "Password is not valid"
        success = False
    if not helpers.valid_email(email):
        message['error_email'] = "Email is not valid"
        success = False
    if helpers.user_by_email(str(email)) is not None:
        message['error_email'] = "Email already in use"
    if success is False:
        message['success'] = False
        return jsonify(errors=message), 200

    # hash the password for db storage
    pw_hash = helpers.make_pw_hash(username, password)
    # create new instance of user
    new_user = User(username, email, pw_hash)
    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)
    message['success'] = True
    message['user'] = new_user.serialize
    return jsonify(message), 201
