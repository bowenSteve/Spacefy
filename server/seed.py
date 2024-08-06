from app import app  
from datetime import datetime, timedelta
from models import db, User, Agreement, Payment, UserRole, Booking, Space
from werkzeug.security import generate_password_hash
import os

def create_users():
    users = [
        User(first_name='Abdulhakim', second_name='Kullow', email='john.doe@example.com', password_hash=generate_password_hash('password123'), is_admin=True),
        User(first_name='Jane', second_name='Smith', email='jane.smith@example.com', password_hash=generate_password_hash('password456')),
        User(first_name='Alice', second_name='Johnson', email='alice.johnson@example.com', password_hash=generate_password_hash('password789')),
    ]
    db.session.add_all(users)
    db.session.commit()
    return users

def create_agreements(users):
    agreements = [
        Agreement(agreement_date=datetime.utcnow(), terms='Standard Terms and Conditions', user_id=users[0].id),
        Agreement(agreement_date=datetime.utcnow(), terms='Standard Terms and Conditions', user_id=users[1].id),
        Agreement(agreement_date=datetime.utcnow(), terms='Standard Terms and Conditions', user_id=users[2].id),
    ]
    db.session.add_all(agreements)
    db.session.commit()

def create_payments(users):
    payments = [
        Payment(payment_date=datetime.utcnow(), amount=100.0, user_id=users[0].id),
        Payment(payment_date=datetime.utcnow(), amount=200.0, user_id=users[1].id),
        Payment(payment_date=datetime.utcnow(), amount=300.0, user_id=users[2].id),
    ]
    db.session.add_all(payments)
    db.session.commit()

def create_roles(users):
    roles = [
        UserRole(role='Admin', user_id=users[0].id),
        UserRole(role='User', user_id=users[1].id),
        UserRole(role='User', user_id=users[2].id),
    ]
    db.session.add_all(roles)
    db.session.commit()

def create_spaces(users):
    spaces = [
        Space(name='Conference Room A', description='A large conference room', hourly_price=50.0, daily_price=400.0, owner_id=users[0].id, availability=True, capacity=50),
        Space(name='Private Office B', description='A private office space', hourly_price=30.0, daily_price=200.0, owner_id=users[1].id, availability=True, capacity=10),
        Space(name='Coworking Desk C', description='A shared coworking desk', hourly_price=10.0, daily_price=70.0, owner_id=users[2].id, availability=True, capacity=1),
        Space(name='Meeting Room D', description='A medium-sized meeting room', hourly_price=40.0, daily_price=300.0, owner_id=users[0].id, availability=True, capacity=20),
        Space(name='Workshop Area E', description='A spacious workshop area', hourly_price=60.0, daily_price=500.0, owner_id=users[1].id, availability=True, capacity=100),
        Space(name='Event Hall F', description='A large event hall', hourly_price=100.0, daily_price=800.0, owner_id=users[2].id, availability=True, capacity=200),
        Space(name='Outdoor Patio G', description='A nice outdoor patio', hourly_price=25.0, daily_price=150.0, owner_id=users[0].id, availability=True, capacity=30),
        Space(name='Training Room H', description='A room equipped for training sessions', hourly_price=35.0, daily_price=250.0, owner_id=users[1].id, availability=True, capacity=15),
    ]
    db.session.add_all(spaces)
    db.session.commit()
    return spaces

def create_bookings(users, spaces):
    bookings = [
        Booking(user_id=users[0].id, space_id=spaces[0].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=2), total_amount=100.0),
        Booking(user_id=users[1].id, space_id=spaces[1].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=3), total_amount=90.0),
        Booking(user_id=users[2].id, space_id=spaces[2].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=1), total_amount=10.0),
        Booking(user_id=users[0].id, space_id=spaces[3].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=2), total_amount=80.0),
        Booking(user_id=users[1].id, space_id=spaces[4].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=5), total_amount=300.0),
        Booking(user_id=users[2].id, space_id=spaces[5].id, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(hours=4), total_amount=400.0),
    ]
    db.session.add_all(bookings)
    db.session.commit()

def seed_data():
    if os.path.exists('app.db'):
        os.remove('app.db')
    db.create_all()

    users = create_users()
    create_agreements(users)
    create_payments(users)
    create_roles(users)
    spaces = create_spaces(users)
    create_bookings(users, spaces)

if __name__ == '__main__':
    
    with app.app_context():
        seed_data()
    print("Database has been seeded.")