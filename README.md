# Node.js Backend Project

This project is a Node.js backend API that provides authentication. The API is built using Express.js and integrates with a MySQL database for user management and data persistence.

---

## **Features**

### Authentication

- **Register**: Users can register with a unique username and password.
- **Login**: Authenticate users and generate JSON Web Tokens (JWT) for session management.
- **Example Protected Routes**: Access to certain routes is restricted to authenticated users.

---

## **Tech Stack**

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database for data persistence.
- **bcrypt**: For password hashing.
- **jsonwebtoken (JWT)**: For token-based authentication.

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database:

   - Create a MySQL database named `node_learn`.
   - Import the provided `schema.sql` file to create the required tables.
   - Update `config/db.js` with your MySQL credentials.

5. Start the server:
   ```bash
   npm start
   ```
6. Access the API at `http://localhost:3000`.

---

## **API Endpoints**

### **Authentication Endpoints**

#### **Register**

- **Endpoint:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```
- **Response:**
  - Success:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - Error:
    ```json
    {
      "error": "Username already exists"
    }
    ```

#### **Login**

- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```
- **Response:**
  - Success:
    ```json
    {
      "token": "<JWT_TOKEN>"
    }
    ```
  - Error:
    ```json
    {
      "error": "Authentication failed"
    }
    ```

### **Protected Route**

- **Endpoint:** `GET /protected`
- **Headers:**
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response:**
  ```json
  {
    "message": "This is a protected route",
    "user": {
      "userId": 1,
      "username": "exampleUser"
    }
  }
  ```

---

## **Database Schema**

### **Users Table**

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

### **Sample Data**

```sql
INSERT INTO users (username, password) VALUES
('user1', '<hashed_password1>'),
('user2', '<hashed_password2>');
```

---

## **Project Structure**

```plaintext
project/
├── config/
│   └── db.js               # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   └── itemController.js   # CRUD logic for items
├── middleware/
│   └── authMiddleware.js   # Token authentication middleware
├── models/
│   └── userModel.js        # Database queries for users
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── itemRoutes.js       # Item routes
├── app.js                  # Main app configuration
├── server.js               # Entry point
└── package.json            # Project metadata and dependencies
```
