"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Email/Password incorrect!"}), 401
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Email/Password incorrect!"}), 401


    expires = datetime.timedelta(minutes=30)
    access_token = create_access_token(identity=user.id, expires_delta=expires)

    data = {"status": "Success!",
            "message": "Logged in succesfully!", 
            "access_token": access_token,
            "user": user.serialize()
            }

    return jsonify(data), 200


@api.route('/user', methods=['POST'])
def create_user():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    user = User()
    user.username = username
    user.email = email 
    user.password = generate_password_hash(password)
    user.save()


    return jsonify({"status": "Success!", "message": "Register succesfully!"}), 200

    if not check_password_hash(user.password, password): return jsonify({"msg": "email/password son incorrectos"}), 400

    access_token = create_access_token(identity=user.id)

    data = {
            "access_token": access_token,
            "user": user.serialize()
        }

    if user: return jsonify(data), 201
    

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():

    id= get_jwt_identity()
    user=User.query.get(id)
    return jsonify(user.serialize()),200

    
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200