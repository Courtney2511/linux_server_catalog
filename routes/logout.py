from flask import Blueprint, request, jsonify
import jwt
import constants

logout_api = Blueprint('logout_api', __name__)


# LOGOUT ENDPOINT
@logout_api.route('/logout', methods=['POST'])
def logout():
    """ Posts to application with logout parameters"""
    data = request.get_json()
    token = data['auth_token']
    message = {}
    try:
        jwt.decode(token, constants.SECRET_KEY)
    except jwt.exceptions.ExpiredSignatureError:
        pass
    except jwt.exceptions.InvalidTokenError:
        message['error'] = 'token is invalid'
        return jsonify(message), 400

    message['message'] = 'Successfully logged out'
    message['success'] = True
    return jsonify(message), 200
