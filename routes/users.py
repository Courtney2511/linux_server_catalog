from flask import Blueprint, jsonify
from database_models import User


user_api = Blueprint('user_api', __name__)


# ALL USERS
@user_api.route('/users')
def get_users():
    users = User.query.all()
    return jsonify(users=[user.serialize for user in users])
