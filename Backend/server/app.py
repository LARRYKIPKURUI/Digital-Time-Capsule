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
from flask_mail import Mail, Message

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

# Email config (use .env for safety)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_USERNAME")


# Init extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
mail = Mail(app)

def send_capsule_email(to_email, capsule_title, unlock_date):
    msg = Message(
        subject="Your Time Capsule is Unlocked 🎉",
        recipients=[to_email],
        body=(
            f"Hi,\n\nYour time capsule titled '{capsule_title}' "
            f"scheduled for {unlock_date.strftime('%Y-%m-%d')} is now unlocked!\n"
            "Visit your List Capsules Page to see it and  to read it.\n\nCheers!"
        )
    )
    mail.send(msg)


@app.route('/')
def home():
    return jsonify({"message": "Digital Time Capsule API running"}), 200

#Email Reminders
@app.route('/send_reminders', methods=['GET'])
def send_reminders():
    now = datetime.now()
    reminders = EmailReminder.query.filter(
        EmailReminder.sent == False,
        EmailReminder.scheduled_for <= now
    ).all()

    for reminder in reminders:
        capsule = Capsule.query.get(reminder.capsule_id)
        if capsule:
            send_capsule_email(reminder.email, capsule.title, capsule.unlock_date)
            reminder.sent = True
            db.session.commit()

    return jsonify({"message": f"{len(reminders)} reminders processed."}), 200


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



# Create Capsule + Optional Email Reminder
@app.route('/capsules', methods=['POST'])
@jwt_required()
def create_capsule():
    data = request.get_json()
    title = data.get('title')
    message = data.get('message')
    unlock_date = data.get('unlock_date')
    media_url = data.get('media_url')
    reminder_email = data.get('reminder_email')  # optional

    user_id = get_jwt_identity()

    if not all([title, message, unlock_date]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        unlock_datetime = datetime.fromisoformat(unlock_date)
    except ValueError:
        return jsonify({"error": "Invalid date format"}), 400

    # Create capsule
    capsule = Capsule(
        title=title,
        message=message,
        unlock_date=unlock_datetime,
        media_url=media_url,
        user_id=user_id
    )

    db.session.add(capsule)
    db.session.commit()

    # Optionally create an email reminder
    if reminder_email:
        reminder = EmailReminder(
            capsule_id=capsule.id,
            email=reminder_email,
            scheduled_for=unlock_datetime,
            sent=False
        )
        db.session.add(reminder)
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

# Update capsule
@app.route('/capsules/<int:id>', methods=['PATCH'])
@jwt_required()
def update_capsule(id):
    user_id = get_jwt_identity()
    capsule = Capsule.query.get(id)

    if not capsule:
        return jsonify({"error": "Capsule not found"}), 404

    if capsule.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    capsule.title = data.get('title', capsule.title)
    capsule.message = data.get('message', capsule.message)
    capsule.media_url = data.get('media_url', capsule.media_url)
    
    if 'unlock_date' in data:
        capsule.unlock_date = datetime.fromisoformat(data['unlock_date'])

    db.session.commit()
    return jsonify(capsule.to_dict()), 200

# Get single capsule (auth protected)
@app.route('/capsules/<int:id>', methods=['GET'])
@jwt_required()
def get_capsule(id):
    current_user = get_jwt_identity()
    capsule = Capsule.query.get(id)

    if not capsule:
        return jsonify({"error": "Capsule not found"}), 404

    if capsule.user_id != current_user:
        return jsonify({"error": "Forbidden"}), 403

    return jsonify(capsule.to_dict()), 200


# Delete capsule
@app.route('/capsules/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_capsule(id):
    user_id = get_jwt_identity()
    capsule = Capsule.query.get(id)

    if not capsule:
        return jsonify({"error": "Capsule not found"}), 404

    if capsule.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(capsule)
    db.session.commit()
    return jsonify({"message": "Capsule deleted successfully"}), 200


#  start app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
