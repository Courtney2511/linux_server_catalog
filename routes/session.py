from flask import Blueprint, request, jsonify
import helpers
import jwt
import datetime
import constants

session_api = Blueprint('session_api', __name__)


# LOGIN ENDPOINT
@session_api.route('/session/new', methods=['POST'])
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
        print message
        return jsonify(message), 200


@session_api.route('/session/end', methods=['POST'])
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


@session_api.route('/session/fb', methods=['POST'])
def fblogin():
    """ Handles login requests through facebook login"""
    data = request.get_json()
    print "data from request is"
    print data
    message = {}
    message['message'] = "facebook login in received"

    email = data['data']['email']

    return jsonify(message), 200

    user = helpers.user_by_email(email)

    if user:
        print "this user "
