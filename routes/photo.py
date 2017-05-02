from flask import Blueprint, request, jsonify
from database.models import Photo
from database.database import db_session

photo_api = Blueprint('photo_api', __name__)


# PHOTO BY ID ENDPOINT
@photo_api.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    """ returns a photo instance by id """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(message="resource not found"), 404
    return jsonify(photo=photo.serialize)


@photo_api.route('/photos/<int:photo_id>', methods=['PUT'])
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
    return jsonify(photo=photo.serialize), 201


@photo_api.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    """ Deletes a photo """
    photo = Photo.query.get(photo_id)
    if photo is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(photo)
    db_session.commit()
    return jsonify(success=True)
