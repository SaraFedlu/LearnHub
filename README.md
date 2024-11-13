# QuizPlatform

QuizPlatform is a web application that allows users to take quizzes, track their progress, and earn badges for achievements. The platform provides different roles: admin, staff (quiz creators), and regular users, each with their specific dashboards and functionalities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Roles and Permissions](#roles-and-permissions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## Features

### User Roles
- **Admin**: Manage users, quizzes, and badges.
- **Staff**: Create and manage quizzes.
- **User**: Take quizzes, track progress, and earn badges.

### Core Functionalities
- **Authentication**: JWT-based login and role-based access control.
- **Quiz Management**: Create, edit, delete quizzes (for staff and admin).
- **Progress Tracking**: Users can view scores and badges based on completed quizzes.
- **Badge Management**: Admins can create badges for specific achievements.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Technologies Used

- **Frontend**: React, Reactstrap, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Requests**: Axios
- **Version Control**: Git and GitHub
- **Testing**: Postman for API testing

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://npmjs.com/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) set up locally or on a cloud provider like MongoDB Atlas.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sarafedlu/QuizPlatform.git
   cd QuizPlatform
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   
   - Create a `.env` file in the `backend` directory:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

   - **Run the backend server**:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   - **Run the frontend server**:
     ```bash
     npm start
     ```

4. **Access the Application**: The application should now be running at `http://localhost:3000` with the backend API at `http://localhost:5000`.

---

## Usage

1. **Register/Login**: Users can register or log in.
2. **Admin Dashboard**: Admins can access user management, badge creation, and quiz moderation tools.
3. **Staff Dashboard**: Staff members can create and manage quizzes.
4. **User Dashboard**: Regular users can explore quizzes, take quizzes, and view progress.
5. **Badge Earning**: Users can earn badges based on quiz achievements.

---

## Architecture

The application follows a full-stack architecture with separate frontend and backend servers.

- **Frontend**: Built with React, handling user interfaces, conditional navigation, and state management for role-based access.
- **Backend**: Node.js and Express manage API routes, handle business logic, and communicate with the MongoDB database.
- **Database**: MongoDB stores users, quizzes, progress, and badges.

---

## API Documentation

### Authentication
- **POST** `/api/users/login` - Login a user and return a JWT token.
- **POST** `/api/users/register` - Register a new user.

### User
- **GET** `/api/users/me` - Retrieve the logged-in user's profile information.

### Quizzes
- **POST** `/api/quizzes` - Create a new quiz (Staff/Admin only).
- **GET** `/api/quizzes/:id` - Get quiz details.
- **PUT** `/api/quizzes/:id` - Update quiz (Staff/Admin only).
- **DELETE** `/api/quizzes/:id` - Delete a quiz (Admin only).

### Badges
- **POST** `/api/admin/badges` - Create a badge (Admin only).
- **GET** `/api/admin/badges` - List all badges (Admin only).
- **DELETE** `/api/admin/badges/:id` - Delete a badge (Admin only).

> **Note**: For detailed API request/response formats, refer to `API.md` in the project repository.

---

## Roles and Permissions

| Role   | Access Level                                       |
|--------|----------------------------------------------------|
| Admin  | Manage users, quizzes, and badges.                 |
| Staff  | Create and manage quizzes.                         |
| User   | Take quizzes, view progress, and earn badges.      |

Permissions are enforced through role-based access control using JWT tokens, verified on each request to protected routes.

---

## Future Improvements

- **Real-time Multiplayer Quizzes**: Allow users to join live quiz sessions and compete.
- **Leaderboard and Analytics**: Add user performance tracking and display global leaderboard rankings.
- **Enhanced Badges and Achievements**: Introduce additional badges for more diverse achievements.
- **Email Notifications**: Notify users of new quizzes, badges earned, or activity reminders.

---

## Contributing

Contributions are welcome! If you would like to contribute:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request, describing the feature and your changes.

---

## Contact

For further information or questions about this project, please contact:
- **Name**: Sara Fedlu
- **Email**: sfedlu28@gmail.com
- **GitHub**: [Sara Fedlu](https://github.com/SaraFedlu)
