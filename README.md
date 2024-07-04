

# Paytm Clone

This repository contains a clone of the Paytm application with functionalities including user signup, signin, displaying users, and showing the account balance. This project is built using React for the frontend and a Node.js/Express backend.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (or any other database supported by your backend)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/bajshorya/Paytm.git
    cd Paytm/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```env
    PORT=3001
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

## Usage

1. Ensure your backend server is running at `http://localhost:3000`.
2. Ensure your frontend server is running at `http://localhost:5173`.
3. Open your browser and navigate to `http://localhost:5173` to access the application.

## Project Structure

```
Paytm
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env (created manually)
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
└── package.json
```

## API Endpoints

### User Routes

- **POST** `/api/v1/user/signup`
  - Create a new user account.
- **POST** `/api/v1/user/signin`
  - Authenticate a user and return a token.
- **GET** `/api/v1/user/bulk`
  - Get a list of users.

### Account Routes

- **GET** `/api/v1/account/balance`
  - Get the account balance of the authenticated user.

## Components

### Sign Up

Handles user registration.

### Sign In

Handles user authentication.

### Dashboard

Displays the user's current balance and a list of other users.

### Users

Displays a list of all users.

### Balance

Displays the user's account balance.

### Appbar

A navigation bar for the application.

## Screenshots

Include screenshots of your application here.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

