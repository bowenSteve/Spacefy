from datetime import datetime
from app import db

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    space_id = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

    def __init__(self, user_id, space_id, start_time, end_time, total_amount):
        self.user_id = user_id
        self.space_id = space_id
        self.start_time = start_time
        self.end_time = end_time
        self.total_amount = total_amount

    def __repr__(self):
        return f'<Booking {self.id}>'

class Space(db.Model):
    __tablename__ = 'spaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    hourly_price = db.Column(db.Float, nullable=False)
    daily_price = db.Column(db.Float, nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    # created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    availability = db.Column(db.Boolean, nullable=False, default=True)

    def __init__(self, name, description, hourly_price, daily_price, owner_id, availability=True):
        self.name = name
        self.description = description
        self.hourly_price = hourly_price
        self.daily_price = daily_price
        self.owner_id = owner_id
        # self.created_at = datetime.utcnow()
        self.availability = availability

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    def __init__(self, name, description=None):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'<Role {self.name}>'
