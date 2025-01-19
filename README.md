# 🏥 AlloHealth Backend API

Welcome to the **AlloHealth Backend API**, a robust and scalable solution for managing healthcare application functionalities. This backend is built with **Node.js** and **Express.js**, and it supports secure authentication for staff and admin, appointment management, and doctor-related operations.

---

## 🚀 Features

### 🌟 Staff Features
- **Signup and Login**: Staff can securely create accounts and log in.
- **Logout**: End the session securely.
- **Appointment Management**:
  - Book new appointments.
  - Update or delete existing appointments.
- **Doctor Details**:
  - Fetch a list of all doctors.
  - Manage doctor-specific functionalities.

### 🌟 Admin Features
- **Signup and Login**: Admin can securely create accounts and log in.
- **Staff Details**:
  - Fetch and manage staff details.
- **Advanced Appointment Management**:
  - Perform CRUD operations for appointments.
  - Monitor statuses and schedules.

---

## 🛠️ Technologies Used

- **Node.js** 🚀
- **Express.js** 🌐
- **MongoDB** 🍃
- **JWT Authentication** 🔒
- **Environment Variables** via `dotenv` 🌱
- **Deployed on Render** 🔗

---

## 📂 API Endpoints

### 🛡️ Authentication

- **Staff Signup**  
  `POST /api/v1/user/staff/signup`

- **Staff Login**  
  `POST https://allobackend.onrender.com/api/v1/user/staff/login`

- **Staff Logout**  
  `GET /api/v1/user/stafflogout`

- **Admin Signup**  
  `POST https://allobackend.onrender.com/api/v1/user/admin/signup`

- **Admin Login**  
  `POST /api/v1/user/admin/login`

---

### 👨‍⚕️ Doctor Management

- **Doctor Signup**  
  `POST /api/v1/user/doctor/signup`

- **Get Doctor Details**  
  `GET /api/v1/user/staff/details`

---

### 📅 Appointment Management

- **Book Appointment**  
  `POST /api/v1/apoointment/bookappointment`

- **Get All Appointments**  
  `GET /api/v1/apoointment/bookappointment`

- **Update Appointment**  
  `PUT /api/v1/apoointment/update/:id`  
  Example: `/api/v1/apoointment/update/678bc73cbcc9b39d2db6f`

- **Delete Appointment**  
  `DELETE /api/v1/apoointment/delete/:id`  
  Example: `/api/v1/apoointment/delete/678bc592f8d3d32f769a087f`

