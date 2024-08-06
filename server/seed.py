from app import app
from models import db, User, Agreement, Payment, UserRole, Booking, Space
from datetime import datetime
def seed_data():
    # Create all tables
    db.create_all()

    # Create Users
    user1 = User(first_name="John", second_name="Doe", email="john@example.com", is_admin=True)
    user1.set_password("password123")
    
    user2 = User(first_name="Jane", second_name="Smith", email="jane@example.com")
    user2.set_password("password123")

    # Add users to the session
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()  # Commit to ensure user IDs are generated

    # Create Agreements
    agreement1 = Agreement(terms="User Agreement Terms", user=user1)
    agreement2 = Agreement(terms="User Agreement Terms", user=user2)
    
    # Create Payments
    payment1 = Payment(amount=100.00, user=user1)
    payment2 = Payment(amount=150.00, user=user2)
    
    # Create User Roles
    role1 = UserRole(role="admin", user=user1)
    role2 = UserRole(role="member", user=user2)
    
    # Create Spaces with valid owner_id and short names
    space1 = Space(name="Conf Room", description="A large conference room", hourly_price=50.00, daily_price=300.00, owner_id=user1.id)
    space2 = Space(name="Event Hall", description="A spacious event hall", hourly_price=100.00, daily_price=600.00, owner_id=user2.id)
    
    # Create Bookings
    booking1 = Booking(user=user1, space=space1, start_time=datetime(2023, 1, 1, 9, 0), end_time=datetime(2023, 1, 1, 17, 0), total_amount=300.00)
    booking2 = Booking(user=user2, space=space2, start_time=datetime(2023, 1, 2, 9, 0), end_time=datetime(2023, 1, 2, 17, 0), total_amount=600.00)
    
    # Add all to the session
    db.session.add_all([user1, user2, agreement1, agreement2, payment1, payment2, role1, role2, space1, space2, booking1, booking2])
    
    # Commit the session
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_data()
