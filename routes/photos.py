from flask import Blueprint, request, jsonify
from database_models import Photo
from database import db_session

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
    category_id = data['category_id']
    picture = data['picture']

    message = {}
    success = ''

    # check for missing data
    if name == '':
        message['error_name'] = "you must provide a name"
        success = False
    if description == '':
        message['error_descrption'] = "you must provide a description"
        success = False
    if category_id == '':
        message['error_category'] = "please choose a cateogry"
        success = False
    if picture == '':
        message['error_picture'] = "provide a url for your picture"
        success = False
    if success is False:
        return jsonify(message), 200

    # create a new photo instance
    newPhoto = Photo(data['name'], data['description'], data['category_id'],
                     data['picture'], data['user_id'])
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    message['photo'] = newPhoto.serialize
    return jsonify(message), 200
