from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import timedelta
from flask_cors import CORS
from models import db, User, Agreement, Payment, UserRole, Booking, Space
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://username:password@localhost/app_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'your_default_jwt_secret')
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'your_default_secret_key')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/signup',methods=['POST'])
def SignUp():
    data= request.get_json()
    first_name = data.get("first name")
    second_name = data.get("second name")
    email = data.get("email")
    password = data.get("password")
    new_user = User(first_name=first_name, second_name=second_name,email=email,password_hash=bcrypt.generate_hash(password).decode("utf-8"))
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"Success": "user added successfully!"}), 201

@app.route('/login',methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token})
    else:
        return jsonify({"message":"Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
