🏠 StayNest

StayNest is a mini clone of Airbnb — a full-stack web application where users can browse, book, and list properties for short-term stays.
Built using Node.js, Express.js, MongoDB, and EJS.



## Output Demo: 


https://github.com/user-attachments/assets/71f1c8a0-1a79-465e-bb10-8533bdbad419


## 🚧 Project Status

This project is now finished. 🎉
⚡ Note: This project was built as part of the Apna College Delta Web Development Course. The main goal was to practice full-stack development concepts. I extended/customized some parts to improve my learning.


 
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

🔑 Environment Variables

To run this project, you will need to add the following variables to your `.env` file:

`CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` (Cloudinary)  
`DB_URL` (MongoDB Connection string)  
`SECRET` (For express-session)

MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_secret_key
PORT=8080


4️⃣ Run the application

nodemon app.js


5️⃣ Visit in browser

http://localhost:8080/listings
