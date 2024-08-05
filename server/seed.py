from app import db, User, Agreement, Payment, UserRole
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_user_with_details(name, email, password, agreement_terms, payment_amount, role_name):
    try:
        # Create a new user
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.flush()  #

        # Add an agreement
        agreement = Agreement(agreement_date=datetime.utcnow(), terms=agreement_terms, user_id=new_user.id)
        db.session.add(agreement)

        # Add a payment
        payment = Payment(amount=payment_amount, payment_date=datetime.utcnow(), user_id=new_user.id)
        db.session.add(payment)

        # Add a user role
        role = UserRole(role_name=role_name, user_id=new_user.id)
        db.session.add(role)

        # Commit the transaction
        db.session.commit()

    except Exception as e:
        db.session.rollback() 
        print(f"An error occurred: {e}")

# Example usage
create_user_with_details(
    name='Jane Doe',
    email='jane.doe@example.com',
    password='securepassword',
    agreement_terms='Sample terms',
    payment_amount=100.0,
    role_name='Admin'
)
