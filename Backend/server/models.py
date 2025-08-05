from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "ix": "ix_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "pk": "pk_%(table_name)s"
})

db = SQLAlchemy(metadata=metadata)

# User Model

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_only = ('id', 'username', 'email', 'created_at')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    capsules = db.relationship('Capsule', backref='user', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

# Capsule Model

class Capsule(db.Model, SerializerMixin):
    __tablename__ = 'capsules'
    serialize_only = ('id', 'title', 'message', 'media_url', 'unlock_date', 'is_public', 'created_at', 'user_id')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    media_url = db.Column(db.String(255))
    unlock_date = db.Column(db.DateTime, nullable=False, index=True)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # One-to-one relationship
    email_reminder = db.relationship(
    'EmailReminder',
    backref=db.backref('capsule', passive_deletes=True),
    cascade="all, delete-orphan",
    uselist=False
        )


    def __repr__(self):
        return f"<Capsule {self.title} by User {self.user_id}>"

# EmailReminder Model

class EmailReminder(db.Model, SerializerMixin):
    __tablename__ = 'email_reminders'
    serialize_only = ('id', 'capsule_id', 'email', 'scheduled_for', 'sent')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    capsule_id = db.Column(
        db.Integer, 
        db.ForeignKey('capsules.id', ondelete='CASCADE'), 
        nullable=False
    )
    scheduled_for = db.Column(db.DateTime, nullable=False, index=True)
    sent = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f"<EmailReminder for Capsule {self.capsule_id} to {self.email}>"
