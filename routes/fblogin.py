from flask import Blueprint, request, jsonify
import helpers

fblogin_api = Blueprint('fblogin_api', __name__)


@fblogin_api.route('/fblogin', methods=['POST'])
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
