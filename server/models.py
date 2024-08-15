from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    second_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_owner = db.Column(db.Boolean, default=False)

    agreements = relationship('Agreement', back_populates='user')
    payments = relationship('Payment', back_populates='user')
    roles = relationship('UserRole', back_populates='user')
    bookings = relationship('Booking', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def add_password(self, password):
        self.password_hash = password

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    def __repr__(self):
        return f'<User {self.email}>'

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    second_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    national_id = db.Column(db.LargeBinary, nullable=False)
    closed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    
class Agreement(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    agreement_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    terms = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    
    user = relationship('User', back_populates='agreements')

    def __repr__(self):
        return f'<Agreement {self.id}>'

    
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    payment_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    tax = db.Column(db.Float, nullable=False, default=0)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id', ondelete='CASCADE'), nullable=False)
    
    user = relationship('User', back_populates='payments')
    booking = relationship('Booking', back_populates='payments')

    def to_dict(self):
        return {
            'id': self.id,
            'payment_date': self.payment_date.isoformat(),
            'tax': self.tax,
            'amount': self.amount,
            'user_id': self.user_id,
            'booking_id': self.booking_id,
            'user': {
                'id': self.user.id,
                'first_name': self.user.first_name,
                'second_name': self.user.second_name
            },
            'booking': {
                'id': self.booking.id,
                'start_time': self.booking.start_time,
                'end_time': self.booking.end_time,
                'total_amount': self.booking.total_amount
            }
        }

    def __repr__(self):
        return f'<Payment {self.id}>'



    
class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = relationship('User', back_populates='roles')
    
    def __repr__(self):
        return f'<UserRole {self.id}>'
      
from datetime import datetime

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    user = relationship('User', back_populates='bookings')
    space = relationship('Space', back_populates='bookings')
    payments = db.relationship('Payment', back_populates='booking', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'space_id': self.space_id,
            'space_name': self.space.name,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'total_amount': self.total_amount,
            'booking_date': self.booking_date.isoformat(),
            'user': {
                'id': self.user.id,
                'first_name': self.user.first_name,
                'second_name': self.user.second_name,
                'email': self.user.email
            }
        }

    def __repr__(self):
        return f'<Booking {self.id}>'



  


class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)  
    description = db.Column(db.Text, nullable=True)
    hourly_price = db.Column(db.Float, nullable=False)
    daily_price = db.Column(db.Float, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    availability = db.Column(db.Boolean, nullable=False, default=True)
    image_url = db.Column(db.String(255), nullable=True)  # New field
    location = db.Column(db.String(255), nullable=True)  # New field
    special_features = db.Column(ARRAY(db.String), nullable=True)  # New field
    capacity = db.Column(db.Integer, nullable=True, default=0) 

    bookings = relationship('Booking', back_populates='space', cascade='all, delete-orphan')
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'hourly_price': self.hourly_price,
            'daily_price': self.daily_price,
            'owner_id': self.owner_id,
            'created_at': self.created_at.isoformat(),
            'availability': self.availability,
            'image_url': self.image_url,
            'location': self.location,
            'special_features': self.special_features,
            'capacity': self.capacity
        }
    
    def __repr__(self):
        return f'<Space {self.id}>'
