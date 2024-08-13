import os
from datetime import datetime, timedelta
from flask import Flask
from werkzeug.security import generate_password_hash
from app import app
from models import db, User, Agreement, Payment, UserRole, Booking, Space



def create_users():
    users = [
        User(first_name='Abdulhakim', second_name='Kullow', email='john.doe@example.com', password_hash=generate_password_hash('password123'), is_admin=True, is_owner = True),
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

def create_payments(users, bookings):
    payments = [
        Payment(
            payment_date=datetime.utcnow(),
            tax=5.0,  # Example tax value
            amount=100.0,
            user_id=users[0].id,
            booking_id=bookings[0].id  # Adjust based on available bookings
        ),
        Payment(
            payment_date=datetime.utcnow(),
            tax=10.0,  # Example tax value
            amount=200.0,
            user_id=users[1].id,
            booking_id=bookings[1].id  # Adjust based on available bookings
        ),
        Payment(
            payment_date=datetime.utcnow(),
            tax=15.0,  # Example tax value
            amount=300.0,
            user_id=users[2].id,
            booking_id=bookings[2].id  # Adjust based on available bookings
        ),
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
        Space(
            name='Conference Room A',
            description='A large conference room',
            hourly_price=50.0,
            daily_price=400.0,
            owner_id=users[0].id,
            availability=True,
            capacity=50,
            image_url='https://plus.unsplash.com/premium_photo-1661878787649-71d9b0713b8a?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Nairobi',
            special_features=['Projector', 'Whiteboard']
        ),
        Space(
            name='Private Office B',
            description='A private office space',
            hourly_price=30.0,
            daily_price=200.0,
            owner_id=users[1].id,
            availability=True,
            capacity=10,
            image_url='https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Nakuru',
            special_features=['Desk', 'Wi-Fi']
        ),
        Space(
            name='Coworking Desk C',
            description='A shared coworking desk',
            hourly_price=10.0,
            daily_price=70.0,
            owner_id=users[2].id,
            availability=True,
            capacity=30,
            image_url='https://images.unsplash.com/photo-1503423571797-2d2bb372094a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Nairobi',
            special_features=['Wi-Fi', 'Coffee']
        ),
        Space(
            name='Meeting Room D',
            description='A medium-sized meeting room',
            hourly_price=40.0,
            daily_price=300.0,
            owner_id=users[0].id,
            availability=True,
            capacity=20,
            image_url='https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Thika',
            special_features=['Conference Phone', 'TV Screen']
        ),
        Space(
            name='Workshop Area E',
            description='A spacious workshop area',
            hourly_price=60.0,
            daily_price=500.0,
            owner_id=users[1].id,
            availability=True,
            capacity=100,
            image_url='https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Mombasa',
            special_features=['Tools', 'Workbenches']
        ),
        Space(
            name='Event Hall F',
            description='A large event hall',
            hourly_price=100.0,
            daily_price=800.0,
            owner_id=users[2].id,
            availability=True,
            capacity=200,
            image_url='https://images.unsplash.com/photo-1505624198937-c704aff72608?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Nairobi',
            special_features=['Stage', 'Sound System']
        ),
        Space(
            name='Outdoor Patio G',
            description='A nice outdoor patio',
            hourly_price=25.0,
            daily_price=150.0,
            owner_id=users[0].id,
            availability=True,
            capacity=30,
            image_url='https://images.unsplash.com/photo-1586814207575-0dea25062083?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            location='Naivasha',
            special_features=['Seating', 'Grill']
        ),
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
    return bookings  # Ensure that the list of bookings is returned



def seed_data():
    print("Deleting data...")
    Booking.query.delete()
    Payment.query.delete()
    Agreement.query.delete()
    UserRole.query.delete()
    Space.query.delete()
    User.query.delete()

    db.session.commit()

    users = create_users()
    create_agreements(users)
    spaces = create_spaces(users)  # Create spaces first to get available bookings
    bookings = create_bookings(users, spaces)  # Create bookings and get them
    create_payments(users, bookings)  # Pass both users and bookings to create_payments
    create_roles(users)


if __name__ == '__main__':
    with app.app_context():
        seed_data()
    print("Database has been seeded.")

