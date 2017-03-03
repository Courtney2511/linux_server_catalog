from flask import Flask, render_template, url_for, request, redirect, \
    flash, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_models import Base, Category, User, Photo
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


engine = create_engine('sqlite:///photocatalogue.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# PHOTOS #


# All Photos
@app.route('/photos')
def photosJSON():
    photos = session.query(Photo).all()
    return jsonify(photos=[photo.serialize for photo in photos])


# Photo By Id
@app.route('/photos/<int:photo_id>')
def photoJSON(photo_id):
    photo = session.query(Photo).get(photo_id)
    return jsonify(photo.serialize)


# Edit Photo
@app.route('/photos/<int:photo_id>/edit', methods=['GET', 'POST'])
def editPhoto(photo_id):
    photo = session.query(Photo).get(photo_id)
    if request.method == 'POST':
        print "post request received"
    else:
        return jsonify(photo.serialize)


# new photo
@app.route('/photos/new', methods=['GET', 'POST'])
def newPhoto():
    # adds photo instance to db from POST request data
    if request.method == 'POST':
        newPhoto = Photo(description=request.args.get("description"),
                         picture=request.args.get("picture"),
                         category_id=request.args.get("category_id"))
        session.add(newPhoto)
        session.commit()


# Categories
@app.route('/categories')
def categoriesJSON():
    categories = session.query(Category).all()
    return jsonify(categories=[category.serialize for category in categories])


# Category
@app.route('/categories/<int:category_id>')
def categoryJSON(category_id):
    category = session.query(Category).get(category_id)
    return jsonify(category.serialize)


# Photos by Category
@app.route('/categories/<int:category_id>/photos')
def categoryPhotosJSON(category_id):
    category = session.query(Category).get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])


# all users
@app.route('/users')
def users():
    users = session.query(User).all()
    return jsonify(users=[user.serialize for user in users])


# home
@app.route('/')
def home():
    categories = session.query(Category).all()
    print categories
    return render_template('testpage.html', categories=categories)


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = 'super_secret_key'
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
