from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Import models after initializing db
from models import User, Agreement, Payment, UserRole  # Adjust import path as necessary

# Create all tables
with app.app_context():
    db.create_all()

# Define a function to add data
def add_data():
    try:
        # Create a new user
        new_user = User(name='Jane Doe', email='jane.doe@example.com')
        new_user.set_password('securepassword')
        db.session.add(new_user)
        db.session.flush()  

        # Add an agreement for the user
        agreement = Agreement(
            agreement_date=datetime.utcnow(),
            terms='Sample terms and conditions',
            user_id=new_user.id
        )
        db.session.add(agreement)

        # Add a payment for the user
        payment = Payment(
            amount=100.0,
            payment_date=datetime.utcnow(),
            user_id=new_user.id
        )
        db.session.add(payment)

        # Add a role for the user
        user_role = UserRole(
            role='Admin',
            user_id=new_user.id
        )
        db.session.add(user_role)

        # Commit all changes to the database
        db.session.commit()
        print("Data added successfully!")

    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {e}")

# Define a route to add data
@app.route('/add-data', methods=['POST'])
def add_data_route():
    try:
        add_data()
        return "User added successfully!", 200

    except Exception as e:
        return f"An error occurred: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
