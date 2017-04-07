from flask import Blueprint, jsonify
import helpers

photos_by_user_api = Blueprint('photos_by_user_api', __name__)


@photos_by_user_api.route('/users/<int:user_id>/photos', methods=['GET'])
def get_photos(user_id):
    photos = helpers.photos_by_user(user_id)
    return jsonify(photos=[photo.serialize for photo in photos]), 200
