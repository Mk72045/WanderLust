# WanderLust – Full Stack Listing & Review Platform

##  Overview

WanderLust is a full-stack web application that allows users to explore, create, and manage property listings. Users can register, log in, upload listings with images, and leave reviews with ratings.

This project demonstrates real-world backend development concepts including authentication, database management, REST APIs, and cloud integration.

---

## 🛠️ Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend:

* EJS (Embedded JavaScript Templates)
* Bootstrap
* CSS

### Authentication & Security:

* Passport.js (Local Strategy)
* Express Session
* Connect-Mongo (Session Storage)

### Other Tools:

* Cloudinary (Image Upload & Storage)
* Multer (File Upload Handling)
* Joi (Validation)

---

## ✨ Features

* 🔐 User Authentication (Signup/Login/Logout)
* 🏠 Create, Edit, Delete Listings (CRUD)
* 📸 Image Upload with Cloudinary
* ⭐ Review & Rating System
* 🛡️ Authorization (Only owner can edit/delete)
* ✅ Server-side Validation using Joi
* 💾 Session Management with MongoDB

---

## Key Learnings

* Implemented **MVC architecture** for scalable project structure
* Built **RESTful APIs** for handling resources
* Learned **authentication & authorization concepts**
* Integrated **cloud storage (Cloudinary)**
* Handled **form validation and error handling**

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file and add:

```env
ATLASDB_URL=your_mongodb_url
SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
```

4. Run the project:

```bash
node app.js
```

5. Open in browser:

```
http://localhost:8080
```

---

## Project Structure

```
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── middleware/
├── app.js
```

---

## Future Improvements

* Add search & filtering functionality
* Implement REST API for frontend frameworks (React)
* Add payment integration
* Deploy on cloud (AWS / Render / Vercel)

---

## Contribution

Feel free to fork and improve this project.

---

## Contact

Manoj Kumar
Email: [manoj53739@gmail.com](mailto:manoj53739@gmail.com)
LinkedIn: https://linkedin.com/in/manoj-kumar-063715389
