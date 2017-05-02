from flask import Blueprint, jsonify
import helpers

photos_by_user_api = Blueprint('photos_by_user_api', __name__)


@photos_by_user_api.route('/users/<int:user_id>/photos', methods=['GET'])
def get_photos(user_id):
    """ returns photos belonging to a user """
    photos = helpers.photos_by_user(user_id)
    if len(photos) == 0:
        return jsonify(message="resource not found"), 404
    photos = [photo.serialize for photo in photos]
    return jsonify(photos, success=True), 200
