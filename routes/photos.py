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
    # get post data from client
    data = request.get_json()
    name = data['name']
    description = data['description']
    category = data['category']
    url = data['url']
    user_id = data['userId']
    category_id = helpers.get_category_id(category)

    message = {}
    success = ''

    # check for missing data
    if name == '':
        message['error_name'] = "you must provide a name"
        success = False
    if description == '':
        message['error_descrption'] = "you must provide a description"
        success = False
    if category == '':
        message['error_category'] = "please choose a cateogry"
        success = False
    if url == '':
        message['error_picture'] = "provide a url for your picture"
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
    return jsonify(message), 200
