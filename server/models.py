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

    agreements = relationship('Agreement', back_populates='user')
    payments = relationship('Payment', back_populates='user')
    roles = relationship('UserRole', back_populates='user')
    bookings = relationship('Booking', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


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
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = relationship('User', back_populates='payments')

    def __repr__(self):
        return f'<Payment {self.id}>'
    
class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = relationship('User', back_populates='roles')
    
    def __repr__(self):
        return f'<UserRole {self.id}>'
      
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    
    user = relationship('User', back_populates='bookings')
    space = relationship('Space', back_populates='bookings')
    
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

    bookings = relationship('Booking', back_populates='space')
    
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
