from flask import Blueprint, request, jsonify
from database_models import Photo
from database import db_session
import helpers

photos_api = Blueprint('photos_api', __name__)


# GET Photos
@photos_api.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize for photo in photos]), 200


# NEW PHOTO
@photos_api.route('/photos', methods=['POST'])
def new_photo():
    data = request.get_json()

    # initialze return message
    message = {}
    success = ''

    name = data['name']
    description = data['description']
    category = data['category']
    url = data['url']
    user_id = data['userId']
    if category:
        category_id = helpers.get_category_id(category)

    # check for missing data
    if name == '':
        message['error_name'] = "you must provide a name"
        success = False
    if description == '':
        message['error_description'] = "you must provide a description"
        success = False
    if category == '':
        message['error_category'] = "please choose a cateogry"
        success = False
    if url == '':
        message['error_picture'] = "provide a url for your picture"
        success = False
    if success is False:
        return jsonify(message), 200

    # validate data
    url_is_valid = helpers.valid_url(url)
    print url_is_valid
    if not helpers.valid_url(url):
        message['error_picture'] = "you must provide a valid url"
        success = False

    if success is False:
        return jsonify(message), 200

    # create a new photo instance
    newPhoto = Photo(name, description, category_id,
                     url, user_id)
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    message['photo'] = newPhoto.serialize
    message['success'] = True
    return jsonify(message), 200
