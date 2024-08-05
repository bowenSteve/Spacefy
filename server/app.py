from flask import Flask
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

# Import models after initializing db
from models import User, Agreement, Payment, UserRole  



if __name__ == '__main__':
    app.run(debug=True)
