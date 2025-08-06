

# 🏡 StayNest

**StayNest** is a mini clone of Airbnb — a web application that allows users to browse, book, and list properties for short-term stays. Built using the EJS templating engine, Node.js, MongoDB, and styled with Bootstrap, StayNest is a lightweight project focused on core functionality.

---

## 🚀 Features

- 🧑 User registration and login
- 🏘 View all property listings
- 📝 Create, update, and delete listings (CRUD)
- 📸 Upload property images 


---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Templating:** EJS
- **Other:** Multer (for image uploads), Express-Session / Passport (for authentication)

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/jayalloyd/staynest.git
cd staynest

2. Install dependencies



npm install
3. Setup environment variables
Create a .env file in the root directory and add:

env

PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
4. Run the app

nodemon app.js
Then open your browser and go to:
👉 http://localhost:8080

📁 Project Structure

staynest/
├── models/            # Mongoose models (User, Listing, Booking)
├── routes/            # Route handlers
├── views/             # EJS templates
│   ├── partials/      # Header, footer, etc.
│   └── pages/         # Full pages (home, listings, etc.)
├── public/            # Static assets (images, CSS)
├── app.js             # Main Express app
└── .env               # Environment variables


📚 Learning Goals
This project helped explore:

Server-side rendering using EJS

MVC structure in a Node.js app

Authentication and session management

MongoDB CRUD operations with Mongoose

Frontend design with Bootstrap

👤 Author
JayaRani.Y.S
Github: jayalloyd
