from flask import Blueprint, jsonify
from database.models import User


users_api = Blueprint('users_api', __name__)


# ALL USERS
@users_api.route('/users')
def get_users():
    """ Returns all Users """
    users = User.query.all()
    return jsonify(users=[user.serialize for user in users])
