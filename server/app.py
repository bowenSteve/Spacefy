import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Update to PostgreSQL URI
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost/app1_db"
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from models import db, User, Agreement, Payment, UserRole, Booking, Space
migrate = Migrate(app, db)
db.init_app(app)

@app.route('/signup', methods=['POST'])
def SignUp():
    data = request.get_json()
    first_name = data.get("first_name")
    second_name = data.get("second_name")
    email = data.get("email")
    password = data.get("password")
    if not all([first_name, second_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400
    
    new_user = User(first_name=first_name, second_name=second_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Success": "User added successfully!"}), 201


@app.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):  
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"message": "Invalid email or password"}), 401
        
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user:
        return jsonify({"id": current_user.id, "first_name": current_user.first_name, "second_name": current_user.second_name, "email": current_user.email}), 200
    else:
        return jsonify({"error": "User not found"}), 404
# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200

@app.route('/user_details', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "second_name": user.second_name,
        "email": user.email,
        "role": user.role
    }

    return jsonify(user_data), 200

    #spaces
@app.route('/spaces', methods=['GET'])
def get_spaces():
    spaces = Space.query.all()
    spaces_list = [
        {
            'id': space.id,
            'name': space.name,
            'description': space.description,
            'hourly_price': space.hourly_price,
            'daily_price': space.daily_price,
            'owner_id': space.owner_id,
            'created_at': space.created_at.isoformat(),
            'availability': space.availability,
            'image_url': space.image_url,
            'location': space.location,
            'special_features': space.special_features,
            'capacity': space.capacity
        }
        for space in spaces
    ]
    
    return jsonify(spaces_list)

@app.route('/spaces/<int:id>', methods=['GET'])
def get_a_space(id):
    space = Space.query.filter_by(id=id).first()
    if not space:
        return jsonify({"error": "space not found"}), 404
    else:
        return jsonify(space.to_dict()), 200

@app.route('/create_booking', methods=['POST'])
@jwt_required()
def create_booking():
    current_user_id = get_jwt_identity()  # Assumes this returns the user ID
    data = request.get_json()

    # Debugging: Print received data
    print('Received data:', data)

    space_id = data.get('id')
    start_time = data.get('startDate')
    end_time = data.get('endDate')
    total_amount = data.get('totalAmount')

    # Check if all required fields are provided
    if not all([space_id, start_time, end_time, total_amount]):
        return jsonify({"message": "All fields are required"}), 400

    # Convert strings to datetime objects if necessary
    try:
        start_time = datetime.fromisoformat(start_time)
        end_time = datetime.fromisoformat(end_time)
    except ValueError:
        return jsonify({"message": "Invalid date format"}), 400

    # Convert space_id and total_amount to appropriate types
    try:
        space_id = int(space_id)
        total_amount = float(total_amount)
    except ValueError:
        return jsonify({"message": "Invalid data type"}), 400

    new_booking = Booking(
        user_id=current_user_id,
        space_id=space_id,
        start_time=start_time,
        end_time=end_time,
        total_amount=total_amount
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking added successfully!"}), 201
if __name__ == '__main__':
    app.run(debug=True)
