from flask import Blueprint, request, jsonify
from database.models import Photo
from database.database import db_session
import helpers
import jwt
import constants

photos_api = Blueprint('photos_api', __name__)


@photos_api.route('/photos', methods=['GET'])
def get_photos():
    """ Returns all photos """
    photos = Photo.query.all()
    if len(photos) == 0:
        return jsonify(errors="resource not found"), 404
    photos = [photo.serialize for photo in photos]
    return jsonify(photos), 200


@photos_api.route('/photos', methods=['POST'])
def new_photo():
    """ Creates a new photo """
    headers = request.headers
    data = request.get_json()
    # initialze return message
    message = {}
    success = ''
    # check for valid token
    jwt_token = headers['X-Authorization']
    try:
        jwt.decode(jwt_token, constants.SECRET_KEY)
    except jwt.exceptions.InvalidTokenError:
        message['error'] = 'token is invalid'
        return jsonify(message), 400
    name = data['name']
    description = data['description']
    category_id = data['categoryId']
    url = data['url']
    user_id = data['userId']

    # check for missing data
    if name == '':
        message['error_name'] = "you must provide a name"
        success = False
    if description == '':
        message['error_description'] = "you must provide a description"
        success = False
    if category_id == '':
        message['error_category'] = "please choose a cateogry"
        success = False
    if url == '':
        message['error_picture'] = "provide a url for your picture"
        success = False
    if success is False:
        return jsonify(errors=message), 200

    # validate data
    if not helpers.valid_url(url):
        message['error_picture'] = "you must provide a valid url"
        success = False

    if success is False:
        return jsonify(errors=message), 200

    # create a new photo instance
    newPhoto = Photo(name, description, category_id,
                     url, user_id)
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    photo = newPhoto.serialize
    return jsonify(photo), 201


@photos_api.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    """ returns a photo instance by id """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(errors="resource not found"), 404
    return jsonify(photo.serialize), 200


@photos_api.route('/photos/<int:photo_id>', methods=['PUT'])
def edit_photo(photo_id):
    """ Updates a photo instance """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(errors="resource not found"), 404
    data = request.get_json()
    headers = request.headers
    jwt_token = headers['X-Authorization']
    message = {}
    # check for valid token
    try:
        decoded = jwt.decode(jwt_token, constants.SECRET_KEY)
    except jwt.exceptions.InvalidTokenError:
        message['error'] = 'token is invalid'
        return jsonify(message), 400
    # check to see if user owns photo
    if decoded['username'] != photo.user.username:
        return jsonify("You must own a photo to edit it"), 401
    if decoded and decoded['username'] == photo.user.username:
        photo.name = data['name']
        photo.description = data['description']
        photo.picture = data['url']
        photo.category_id = data['categoryId']
        db_session.add(photo)
        db_session.commit()
        db_session.refresh(photo)
        photo = photo.serialize
        return jsonify(photo), 202


@photos_api.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    """ Deletes a photo """
    headers = request.headers
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(errors="Not Found"), 404
    # authenticate user by jwtToken
    jwt_token = headers['X-Authorization']
    message = {}
    # decode the jwtToken
    try:
        decoded = jwt.decode(jwt_token, constants.SECRET_KEY)
    except jwt.exceptions.InvalidTokenError:
        message['error'] = 'token is invalid'
        return jsonify(message), 400
    # validate the photo owner
    if decoded['username'] != photo.user.username:
        return jsonify("You can only delete your own photos"), 401
    else:
        db_session.delete(photo)
        db_session.commit()
    return jsonify(success=True), 202
