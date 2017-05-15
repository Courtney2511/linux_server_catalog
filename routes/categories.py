from flask import Blueprint, jsonify
from database.models import Category

categories_api = Blueprint('categories_api', __name__)


# ALL CATEGORIES
@categories_api.route('/categories')
def get_categories():
    result = [category.serialize for category in Category.query.all()]
    return jsonify(result), 200


# CATEGORY BY ID
@categories_api.route('/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.get(category_id)
    return jsonify(category.serialize)


# PHOTOS BY CATEGORY
@categories_api.route('/categories/<int:category_id>/photos')
def get_category_photos(category_id):
    category = Category.query.get(category_id)
    return jsonify(photos=[photo.serialize for photo in category.photos])
