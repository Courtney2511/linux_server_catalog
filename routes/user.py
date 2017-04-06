from flask import Blueprint, jsonify
from database_models import User
from database import db_session

user_api = Blueprint('user_api', __name__)


# DELETE USER
@user_api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify(Message="Not Found"), 404
    db_session.delete(user)
    db_session.commit()
    return jsonify(success=True)
