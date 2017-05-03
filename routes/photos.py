from flask import Blueprint, request, jsonify
from database.models import Photo
from database.database import db_session
import helpers

photos_api = Blueprint('photos_api', __name__)


@photos_api.route('/photos', methods=['GET'])
def get_photos():
    """ Returns all photos """
    # photos = Photo.query.all()
    photos = []
    if len(photos) == 0:
        return jsonify(errors="resource not found", status="404"), 404
    photos = [photo.serialize for photo in photos]
    return jsonify(photos), 200


@photos_api.route('/photos', methods=['POST'])
def new_photo():
    """ Creates a new photo """
    data = request.get_json()

    # initialze return message
    message = {}
    success = ''

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
    url_is_valid = helpers.valid_url(url)
    print url_is_valid
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
    message['photo'] = newPhoto.serialize
    message['success'] = True
    return jsonify(message), 201


@photos_api.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    """ returns a photo instance by id """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(errors="resource not found", status=404), 404
    return jsonify(photo.serialize)


@photos_api.route('/photos/<int:photo_id>', methods=['PUT'])
def edit_photo(photo_id):
    """ Updates a photo instance """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(message="resource not found"), 404
    data = request.get_json()
    photo.name = data['name']
    photo.description = data['description']
    photo.picture = data['url']
    photo.category_id = data['categoryId']
    db_session.add(photo)
    db_session.commit()
    db_session.refresh(photo)
    return jsonify(photo.serialize), 201


@photos_api.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    """ Deletes a photo """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(errors="Not Found", status=404), 404
    db_session.delete(photo)
    db_session.commit()
    return jsonify(success=True)
