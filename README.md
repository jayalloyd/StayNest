# 🏠 StayNest

StayNest is a **mini clone of Airbnb** — a full-stack web application that allows users to browse, book, and list properties for short-term stays.  
Built with **Node.js**, **Express.js**, **MongoDB**, and the **EJS templating engine**, StayNest focuses on delivering the **core features** of an online booking platform.

---

## 🚀 Features
- 🧑 **User Registration & Login** (with authentication & sessions)
- 🏘 **View Property Listings**
- 📝 **Create, Update, and Delete Listings** (CRUD functionality)
- 📸 **Upload Property Images** using Multer
- 🔒 **Secure Authentication** with Passport.js

---

## 🛠 Tech Stack
**Frontend:** HTML, CSS, Bootstrap, EJS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Other:** Multer (image uploads), Express-Session, Passport.js  

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone https://github.com/jayalloyd/staynest.git
cd staynest
2️⃣ Install dependencies


npm install
3️⃣ Setup environment variables
Create a .env file in the root directory:

PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
4️⃣ Run the app


nodemon app.js
Then open:
👉 http://localhost:3000

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
Implementing MVC structure in a Node.js application

Server-side rendering with EJS

MongoDB CRUD operations with Mongoose

Authentication & session management with Passport.js

Integrating Bootstrap for responsive UI design

👤 Author
JayaRani Y.S
GitHub: jayalloyd

🌐 Live Demo
(Coming soon) – Once hosted on Render, Vercel, or Heroku, link it here.
