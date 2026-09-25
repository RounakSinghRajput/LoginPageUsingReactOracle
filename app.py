from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb

app = Flask(__name__)
CORS(app)

DB_USER = "app_user"
DB_PASSWORD = "your_password"
DB_DSN = "localhost:1521/XEPDB1"


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    connection = oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO app_users (email, password) VALUES (:email, :password)",
            email=email,
            password=password,
        )
        connection.commit()
    except oracledb.IntegrityError:
        return jsonify({"error": "An account with that email already exists"}), 409
    finally:
        cursor.close()
        connection.close()

    return jsonify({"message": "Account created"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    connection = oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id FROM app_users WHERE email = :email AND password = :password",
        email=email,
        password=password,
    )
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({"message": "Login successful", "user_id": user[0], "email": email})
    else:
        return jsonify({"error": "Invalid email or password"}), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)