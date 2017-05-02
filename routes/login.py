from flask import Blueprint, request, jsonify
import helpers
import jwt
import datetime
import constants

login_api = Blueprint('login_api', __name__)


# LOGIN ENDPOINT
@login_api.route('/login', methods=['POST'])
def login():
    """ Posts to application with login parameters """
    # get login data from request
    data = request.get_json()
    username = data['username']
    password = data['password']
    # use login data to verify if the info is valid
    user = helpers.valid_login(username, password)
    message = {}
    # if not valid, send failure response with redirect
    if user is None:
        message['error'] = "Username or Password are incorrect"
        message['success'] = False
        return jsonify(message), 200
    # if valid:
    if user:
        # create JWT token
        token_data = {
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'username': username,
            'userId': user.id,
            'isLoggedIn': True,
        }
        auth_token = jwt.encode(token_data, constants.SECRET_KEY,
                                algorithm='HS256')
        # create a JSON message with JWT and send it to client
        message['auth_token'] = auth_token
        message['success'] = True
        return jsonify(message), 200
