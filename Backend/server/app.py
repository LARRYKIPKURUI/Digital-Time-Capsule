from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Capsule, EmailReminder
from datetime import datetime
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///capsule.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

#  ROUTES

@app.route('/')
def home():
    return jsonify({"message": "Digital Time Capsule API running"}), 200

# User Authentication

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    hashed = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": user.serialize()
    }), 200

# Capsule Routes

@app.route('/capsules', methods=['POST'])
def create_capsule():
    data = request.get_json()
    title = data.get('title')
    message = data.get('message')
    unlock_date = data.get('unlock_date')
    media_url = data.get('media_url')
    user_id = data.get('user_id')

    if not all([title, message, unlock_date, user_id]):
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

    return jsonify(capsule.serialize()), 201


@app.route('/capsules/<int:user_id>', methods=['GET'])
def get_user_capsules(user_id):
    capsules = Capsule.query.filter_by(user_id=user_id).all()
    return jsonify([c.serialize() for c in capsules]), 200


@app.route('/capsule/<int:id>', methods=['GET'])
def view_capsule(id):
    capsule = Capsule.query.get(id)
    if not capsule:
        return jsonify({"error": "Capsule not found"}), 404

    # Only show if unlocked
    if capsule.unlock_date > datetime.now():
        return jsonify({"message": "Capsule is still locked"}), 403

    return jsonify(capsule.serialize()), 200




if __name__ == '__main__':
    app.run(port=5555, debug=True)