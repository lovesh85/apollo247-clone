# Apollo 24|7 Destination Page Clone 🩺

This project is a frontend and backend clone of the **Apollo 24|7 General Physician/Internal Medicine destination page**, built using **Next.js** with Off-page SEO support. It features a doctor listing UI, functional filters, and API integration to serve doctor data from a database.

## 🔧 Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS/SCSS
- **Backend:** Express.js / Firebase / Flask (choose based on what you used)
- **Database:** Firebase Firestore / MongoDB Atlas / PostgreSQL (mention the one you used)
- **Deployment:** Vercel (frontend), Replit / Render / Firebase (backend)

---

## 🖥️ Features

🔹 Fully responsive **destination page** UI  
🔹 **Doctors listing** with card layout  
🔹 **Filter functionality** by specialization, experience, and location  
🔹 Backend **REST APIs** with pagination support  
🔹 Supports **Off-page SEO** using Next.js capabilities

---

## 📁 Project Structure

```bash
├── pages/
│   └── index.js (main destination page)
│   └── api/
│       └── add-doctor.js
│       └── list-doctor-with-filter.js
├── components/
│   └── Header.jsx
│   └── DoctorCard.jsx
│   └── Filters.jsx
├── backend/
│   └── server.js (Express or Flask backend)
│   └── routes/
│       └── doctors.js
├── public/
├── styles/
├── .env.example
├── package.json
├── README.md
```

---

## 📡 API Endpoints

1. **Add Doctor**
   - `POST /api/add-doctor`
   - Payload:
     ```json
     {
       "name": "Dr. John Doe",
       "specialization": "General Physician",
       "experience": "10 years",
       "location": "Delhi"
     }
     ```

2. **List Doctors with Filter**
   - `GET /api/list-doctor-with-filter?page=1&limit=10&specialization=General Physician&location=Delhi`

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/lovesh85/apollo247-clone.git
cd apollo247-clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` based on `.env.example`.

### 4. Run the Frontend
```bash
npm run dev
```

### 5. Run the Backend
Go into `/backend` and run your server file (depends on whether you're using Node.js or Flask).

---

## 📌 Deployment

- Frontend (Next.js) → [Vercel link here]
- Backend (API server) → [Replit/Render link here]

---

## 🤝 Credits

This project was built as part of an internship assignment and is a **clone of the Apollo 24|7 destination page**:  
🔗 https://www.apollo247.com/specialties/general-physician-internal-medicine

---

## 📬 Contact

**Lovesh Sharma**  
[GitHub Profile](https://github.com/lovesh85)  
[slovesh52@gmail.com]

---

