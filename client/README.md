# 🌿 AgriSmart Marketplace

> A Full-Stack MERN E-Commerce Platform connecting local farmers directly to consumers.

**Live Demo:** [Paste your Vercel Link Here]  
**API Documentation:** [Paste your Render Link Here]

![Project Screenshot](client/src/assets/screenshot.png) **

## 🚀 Project Overview
AgriSmart is a digital marketplace designed to solve the problem of "Middlemen" in the agricultural supply chain. It allows farmers to list produce and buyers to purchase fresh, organic goods directly.

**Key Features:**
* **🛒 Full E-Commerce Flow:** Browse, Search, Cart, and Checkout.
* **⚡ Real-Time Notifications:** Admin/Sellers get instant popup alerts (via Socket.io) when orders are placed.
* **🔐 Authentication:** Secure JWT Login/Registration with Role-Based access (Buyer vs. Seller).
* **🎨 Dynamic Dashboard:** Unified dashboard for managing Orders (Buyers) and Products (Sellers).
* **📱 Responsive Design:** Built with React + Tailwind CSS for mobile and desktop.
* **🧪 Automated Testing:** Integrated Unit and Integration tests using Vitest and Supertest.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, Socket.io-client, React Hot Toast
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** MongoDB Atlas (Mongoose)
* **Testing:** Vitest, Supertest
* **Deployment:** Vercel (Frontend), Render (Backend)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/tunjenicholas-eng/mern-final-project-tunjenicholas-eng.git](https://github.com/tunjenicholas-eng/mern-final-project-tunjenicholas-eng.git)
    cd mern-final-project-tunjenicholas-eng
    ```

2.  **Install Dependencies (Root, Client, Server)**
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` folder:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    ```

4.  **Run Locally**
    ```bash
    # Run Backend (from server folder)
    npm run dev
    
    # Run Frontend (from client folder)
    npm run dev
    ```

## 🧪 Running Tests
This project includes automated testing for Quality Assurance.

```bash
# Backend Integration Tests
cd server
npm test

# Frontend Component Tests
cd client
npm test
