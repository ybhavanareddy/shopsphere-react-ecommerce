# 🛍️ ShopSphere – E-commerce Frontend


## 🌟 Overview

- ShopSphere is a feature-rich frontend simulation of an e-commerce platform built using React.

- It replicates real-world shopping workflows including product discovery, filtering, cart management, and checkout — while focusing on scalable frontend architecture and user experience patterns.

## 🚀 Live Demo

- 🔗 https://shopsphere-react-ecommerce-dqivr0dlg-bhavana-yathams-projects.vercel.app/

## 🎯 Key Highlights

- Scalable component-based architecture

- Context API for global state management

- Derived state for efficient UI updates

- Debounced search for performance optimization

- Clean separation of concerns (UI, logic, services)

## 🧩 Features

### 🔐 Authentication (Mock)

- Persistent login using Context API

- Protected routes

- Username-based session handling

- ⚠️ Note: This is a frontend-only simulation (no backend)

### 🛒 Cart System

- Add/remove products

- Quantity management

- Real-time price updates

- Order summary

### 🔍 Search & Filtering

- Debounced search input

- Category-based filtering

- Multi-condition filtering logic

- Sorting (price & rating)

### 📄 Data Handling

- Client-side pagination

- Derived state for filtered results

- API integration using FakeStore API

### ⚡ UI / UX

- Skeleton loading states

- Error handling & empty states

- Toast notifications

- Responsive design (in progress)

#### 🧾 Checkout Flow

- Order summary

- Simulated order confirmation

## 🏗️ Architecture & Design Decisions

##### Context API over Redux
- Chosen for simplicity and project scale while still maintaining global state separation.

##### Derived State Approach
- Instead of storing filtered data, UI is computed dynamically → reduces redundancy.

##### Service Layer (API abstraction)
-API calls separated into services → improves maintainability and testability.

##### Debouncing for Search
- Prevents unnecessary renders and improves performance.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|--------|
| ⚛️ **React.js (Vite)** | UI development |
| ✨ **React Router** | Client-side routing |
| 🎨 **Context API** | State management |
| 📊 **Tailwind CSS** | Styling |
| 🍪 **jFakeStore API** | Mock backend data |
| 💾 **localStorage** | Client-side data persistence |
|     ** Vercel **     | Deployment |


---



## 📂 Project Structure
src/
│
├── components/   # Reusable UI components
├── pages/        # Route-based pages
├── context/      # Global state management
├── services/     # API calls
├── hooks/        # Custom hooks
├── utils/        # Helper functions
│
├── App.jsx
└── main.jsx

## ⚙️ Run Locally

- git clone https://github.com/ybhavanareddy/shopsphere-react-ecommerce.git

- cd shopsphere-react-ecommerce

- npm install

- npm run dev

## 🧠 Key Learnings

- How to structure a scalable React application

- Managing global state without over-engineering

- Handling derived UI state efficiently

- Designing user-friendly loading & error states

- rade-offs between simplicity (Context) vs scalability (Redux)

- Challenges of client-side routing in deployed environments

## 🚧 Future Improvements

- Backend integration (Node.js / Firebase)

- Real authentication (JWT)

- Payment gateway integration

- Wishlist feature

