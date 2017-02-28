from flask import Flask, render_template, url_for, request, redirect, flash, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_models import Base, Category, User, Photo

app = Flask(__name__)
engine = create_engine('sqlite:///photocatalogue.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
def home():
    categories = session.query(Category).all()
    print categories
    return render_template('testpage.html', categories=categories)


@app.route('/photos')
def photos():
    return "this is the photo index page"

@app.route('/users/new')
def new_user():
    return "This is the new users page"


if __name__ == '__main__':
    # secret key for flash to create a session
    app.secret_key = 'super_secret_key'
    # setting debug to true tell the server to restart anytime code changes
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
