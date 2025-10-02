# Attendance App

A simple **Employee Attendance Management System** built with **Next.js** and **React**. This app allows employees to mark their attendance (clock in/out) and admins to view attendance reports and export them as PDF.

---

## Features

### Employee
- Login using **email**, **password**, and role as **employee**.
- Clock In and Clock Out for daily attendance.
- View start and end times for the current day.
- Logout option.

### Admin
- Login using **email**, **password**, and role as **admin**.
- View all employee attendance records (Email, Date, Start, End).
- Export attendance reports as **PDF**.
- Logout option.

### Common
- Role-based authentication.
- Data stored in **localStorage** (currently in-memory).

---

## Tech Stack
- **Next.js 15.5.4** (React + Server-side Rendering)
- **React** (useState, useEffect)
- **Tailwind CSS** (UI styling)
- **jspdf** and **jspdf-autotable** (Export PDF)
- LocalStorage for temporary data storage

---

## Project Structure

attendance-app/
│
├─ pages/
│ ├─ login.js # Login page
│ ├─ attendance.js # Employee attendance page
│ ├─ dashboard.js # Admin dashboard
│ └─ api/
│ └─ login.js # Login API
│
├─ components/ # Optional: reusable components
├─ public/ # Static assets (images, icons)
├─ styles/ # Global CSS
└─ package.json

npm install
# or
yarn install
npm run dev
# or
yarn dev
Open http://localhost:3000
 to view the app.
#Admin
 Email: admin@gmail.com
Password: admin123
Role: admin

#Employees
Email: vaibhav@gmail.com
Password: emp123
Role: employee

Email: saurabh@gmail.com
Password: emp123
Role: employee

You can add more employees in login.js API data arra
