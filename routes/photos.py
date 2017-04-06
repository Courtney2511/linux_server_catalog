from flask import Blueprint, request, jsonify
from database_models import Photo
from database import db_session

photos_api = Blueprint('photos_api', __name__)


# GET Photos
@photos_api.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize for photo in photos])


# NEW PHOTO
@photos_api.route('/photos', methods=['POST'])
def new_photo():
    # get post data from client
    data = request.get_json()
    # make sure all required data is present
    if ['name'] not in data:
        raise ValueError("you must provide a name")
    if ['description'] not in data:
        raise ValueError("you must provide a description")
    if ['category_id'] not in data:
        raise ValueError("please choose a cateogry")
    if ['picture'] not in data:
        raise ValueError("provide a url for your picture")

    # adds photo instance to db from POST request data
    newPhoto = Photo(data['name'], data['description'], data['category_id'],
                     data['picture'], data['user_id'])
    db_session.add(newPhoto)
    db_session.commit()
    db_session.refresh(newPhoto)
    return jsonify(photo=newPhoto.serialize)
