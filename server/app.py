import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost/app1_db"
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from models import db, User, Agreement, Payment, UserRole, Booking, Space, Admin
migrate = Migrate(app, db)
db.init_app(app)

@app.route('/signup', methods=['POST'])
def SignUp():
    first_name = request.form.get('first_name')
    second_name = request.form.get('second_name')
    email = request.form.get('email')
    password = request.form.get('password')
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
@app.route('/users/<int:id>', methods=['PATCH'])
@jwt_required()
def update_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({"error": "Unauthorized access"}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    for attr, value in data.items():
        if hasattr(user, attr):
            setattr(user, attr, value)

    db.session.commit()

    return jsonify({"success": "User has been updated successfully", "user": {"id": user.id, "first_name": user.first_name, "second_name": user.second_name, "email": user.email}}), 200
#admin
@app.route('/admin_signup', methods=['POST'])
def admin_signup():
    first_name = request.form.get('first_name')
    second_name = request.form.get('second_name')
    email = request.form.get('email')
    password = request.form.get('password')
    national_id_file = request.files.get('national_id')


    if not all([first_name, second_name, email, password, national_id_file]):
        return jsonify({"error": "All fields are required."}), 400

   
    national_id_data = national_id_file.read()

   
    new_admin = Admin(
        first_name=first_name,
        second_name=second_name,
        email=email,
        password_hash=bcrypt.generate_password_hash(password).decode('utf-8'),
        national_id=national_id_data
    )


    try:
        db.session.add(new_admin)
        db.session.commit()
        return jsonify({"success": "Admin account created successfully."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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
        "role": user.is_admin
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


@app.route('/spaces/<int:id>', methods=['PATCH'])
@jwt_required()
def update_space(id):
    space = Space.query.filter_by(id=id).first()
    if not space:
        return jsonify({"error": "Space not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

   
    for attr, value in data.items():
        if hasattr(space, attr):
            setattr(space, attr, value)

    db.session.commit()
    return jsonify({"success": "Space has been updated successfully", "space": space.to_dict()}), 200



@app.route('/spaces', methods=['POST'])
@jwt_required()
def create_space():
    user_id = get_jwt_identity()

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    location = data.get('location')
    hourly_price = data.get('hourly_price')
    daily_price = data.get('daily_price')
    capacity = data.get('capacity')
    image_url = data.get('image_url')
    special_features = data.get('special_features')

    if not name or not location or not hourly_price or not daily_price:
        return jsonify({'error': 'Required fields are missing'}), 400

    new_space = Space(
        name=name,
        description=description,
        location=location,
        hourly_price=hourly_price,
        daily_price=daily_price,
        capacity=capacity,
        image_url=image_url,
        special_features=special_features,
        owner_id=user_id
    )

    db.session.add(new_space)
    db.session.commit()

    return jsonify(new_space.to_dict()), 201

@app.route("/user_spaces", methods=["GET"])
@jwt_required()
def user_spaces():
    user_id = get_jwt_identity()
    spaces = Space.query.filter_by(owner_id=user_id).all()

    
    spaces_list = [space.to_dict() for space in spaces]

    return jsonify(spaces_list), 200


@app.route('/create_booking', methods=['POST'])
@jwt_required()
def create_booking():
    data = request.get_json()

    user_id=data.get("user_id")
    space_id = data.get('space_id')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    total_amount = data.get('total_amount')

    if not all([user_id,space_id, start_time, end_time, total_amount]):
        return jsonify({"message": "All fields are required"}), 400

    new_booking = Booking(
        user_id=user_id,
        space_id=space_id,
        start_time=start_time,
        end_time=end_time,
        total_amount=total_amount
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking added successfully!"}), 201


@app.route("/user_bookings", methods=["GET"])
@jwt_required()
def user_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()
    bookings_list = [
        {
            'id': booking.id,
            'space_name': booking.space.name,
            'start_time': booking.start_time,
            'end_time': booking.end_time,
            'total_amount': booking.total_amount
        }
        for booking in bookings
    ]

    return jsonify(bookings_list), 200


if __name__ == '__main__':
    app.run(debug=True)
