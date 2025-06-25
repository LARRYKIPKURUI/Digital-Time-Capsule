from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
from flask_migrate import Migrate
from datetime import datetime, timedelta

# Models
from models import db, User, Capsule, EmailReminder

load_dotenv() 

# App setup
app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///capsule.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Init extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


@app.route('/')
def home():
    return jsonify({"message": "Digital Time Capsule API running"}), 200


# Register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = generate_password_hash(password)
    user = User(username=username, email=email, password_hash=hashed_pw)


    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "User registered successfully.",
        "token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 201


# Login 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT Token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": user.to_dict()
    }), 200



# Create Capsule
@app.route('/capsules', methods=['POST'])
@jwt_required()
def create_capsule():
    data = request.get_json()
    title = data.get('title')
    message = data.get('message')
    unlock_date = data.get('unlock_date')
    media_url = data.get('media_url')

    user_id = get_jwt_identity()  # Extract from JWT token

    if not all([title, message, unlock_date]):
        return jsonify({"error": "Missing required fields"}), 400

    capsule = Capsule(
        title=title,
        message=message,
        unlock_date=datetime.fromisoformat(unlock_date),
        media_url=media_url,
        user_id=user_id
    )

    db.session.add(capsule)
    db.session.commit()

    return jsonify(capsule.to_dict()), 201


# Get capsules by User
@app.route('/capsules/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_capsules(user_id):
    current_user = get_jwt_identity()
    if user_id != current_user:
        return jsonify({"error": "Unauthorized"}), 403

    capsules = Capsule.query.filter_by(user_id=user_id).all()
    return jsonify([c.to_dict() for c in capsules]), 200


# View Capsule
@app.route('/capsule/<int:id>', methods=['GET'])
def view_capsule(id):
    capsule = Capsule.query.get(id)
    if not capsule:
        return jsonify({"error": "Capsule not found"}), 404

    if capsule.unlock_date > datetime.now():
        return jsonify({"message": "Capsule is still locked"}), 403

    return jsonify(capsule.to_dict()), 200


#  start app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
