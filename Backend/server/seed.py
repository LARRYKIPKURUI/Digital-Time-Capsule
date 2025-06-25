from app import app
from models import db, User, Capsule, EmailReminder
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

with app.app_context():
    print(" Dropping and recreating all tables...")
    db.drop_all()
    db.create_all()

    print(" Seeding users...")
    user1 = User(
        username='larrydev',
        email='larry@example.com',
        password_hash=generate_password_hash('password123')
    )
    user2 = User(
        username='janedoe',
        email='jane@example.com',
        password_hash=generate_password_hash('secure456')
    )
    user3 = User(
        username='mikee',
        email='mike@example.com',
        password_hash=generate_password_hash('mike789')
    )
    db.session.add_all([user1, user2, user3])
    db.session.commit()

    print(" Seeding capsules with image URLs...")
    capsule1 = Capsule(
        title='My 2025 Goals',
        message='Keep building, keep growing.',
        media_url='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        unlock_date=datetime.now() + timedelta(days=180),
        is_public=False,
        user_id=user1.id
    )
    capsule2 = Capsule(
        title='2024 Recap',
        message='Learned so much in tech and life.',
        media_url='https://via.placeholder.com/400x200/0099ff/ffffff?text=2024+Recap',
        unlock_date=datetime.now() - timedelta(days=7),
        is_public=True,
        user_id=user2.id
    )
    capsule3 = Capsule(
        title='A Note to Myself',
        message='Remember to breathe and slow down sometimes.',
        media_url='https://picsum.photos/seed/breathe/400/200',
        unlock_date=datetime.now() + timedelta(days=365),
        is_public=False,
        user_id=user2.id
    )
    capsule4 = Capsule(
        title='Mombasa Trip',
        message='That trip to the coast was unforgettable.',
        media_url='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        unlock_date=datetime.now() - timedelta(days=1),
        is_public=True,
        user_id=user3.id
    )
    capsule5 = Capsule(
        title='For My Future Family',
        message='Hope you’re proud of who I became.',
        media_url='https://picsum.photos/seed/familylove/400/200',
        unlock_date=datetime.now() + timedelta(days=90),
        is_public=False,
        user_id=user3.id
    )

    db.session.add_all([capsule1, capsule2, capsule3, capsule4, capsule5])
    db.session.commit()

    print(" Seeding email reminders...")
    reminder1 = EmailReminder(
        capsule_id=capsule1.id,
        email='larry@example.com',
        scheduled_for=capsule1.unlock_date,
        sent=False
    )
    reminder2 = EmailReminder(
        capsule_id=capsule3.id,
        email='jane@example.com',
        scheduled_for=capsule3.unlock_date,
        sent=False
    )
    reminder3 = EmailReminder(
        capsule_id=capsule5.id,
        email='mike@example.com',
        scheduled_for=capsule5.unlock_date,
        sent=True  # Pretending already sent
    )

    db.session.add_all([reminder1, reminder2, reminder3])
    db.session.commit()

    print(" Capsule DB Seeded Successfully G.")
