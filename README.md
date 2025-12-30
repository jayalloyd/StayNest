🏠 StayNest

StayNest is a mini clone of Airbnb — a full-stack web application where users can browse, book, and list properties for short-term stays.
Built using Node.js, Express.js, MongoDB, and EJS.


##
Note:  Since this is a full-stack application with sensitive logic, the live deployment is private to prevent security exploits. Please see the video walkthrough below for a full feature demo.
##

## Output Demo: 


https://github.com/user-attachments/assets/71f1c8a0-1a79-465e-bb10-8533bdbad419


## 🚧 Project Status

This project is now finished. 🎉
⚡ Note: This project was built as part of the Apna College Delta Web Development Course. The main goal was to practice full-stack development concepts. I extended/customized some parts to improve my learning.

## 🧠 Technical Challenges & Solutions

Building a full-stack rental platform surfaced several architectural challenges. Here is how I navigated them:

### 1. Robust Image Management (Cloudinary)
**The Challenge:** Handling multi-image uploads without slowing down the server or cluttering the local filesystem.
**The Solution:** I integrated **Cloudinary** using a buffer-to-stream approach. Instead of saving files locally, I used `multer` to store images in memory as buffers, which are then streamed directly to Cloudinary. This ensures the application remains scalable and prevents "ghost files" from accumulating on the server.

### 2. Secure Authentication (Passport.js + Sessions)
**The Challenge:** Deciding between LocalStorage (XSS vulnerable) and more secure alternatives for persistent login.
**The Solution:** I opted for **Passport.js with Session-based authentication**. By using `connect-mongo` to store sessions in MongoDB and `express-session` to manage cookies, I ensured that user credentials never touch the client-side storage. This provides a higher layer of security against XSS attacks compared to standard JWT/LocalStorage implementations.

### 3. Complex Data State (Booking Logic)
**The Challenge:** Managing the relationship between Listings, Users, and Bookings while maintaining data integrity.
**The Solution:** I designed a relational-style schema within MongoDB using **Object Document Mapping (ODM)**. By using `.populate()` on the backend, I managed to keep the frontend state clean. For "Bookings," I implemented server-side validation to ensure a user cannot book their own listing and that dates do not overlap, keeping the UI in sync with the actual availability in the database.
 
## ✨ Features

🧑 User registration & login

🏘 View all property listings

📝 Create, update, and delete listings (CRUD)

📸 Upload property images (via Multer)

🔒 Authentication & session management (via Passport.js)

## 🛠 Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Passport.js](https://img.shields.io/badge/passport.js-%2334E27A.svg?style=for-the-badge&logo=passport&logoColor=white)

### Database & Storage
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

## 📦 Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/jayalloyd/staynest.git
cd staynest


2️⃣ Install dependencies

npm install


3️⃣ Setup environment variables
Create a .env file in the root directory and add the following:

MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_secret_key
PORT=8080


4️⃣ Run the application

nodemon app.js


5️⃣ Visit in browser

http://localhost:8080/listings
