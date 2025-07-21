# 🖥️ Medix UI – Patient Management System (Next.js Frontend)

This is the **frontend** for the Patient Management System built using **Next.js (App Router)**. It connects to a FastAPI backend to manage patient records 

🧑‍⚕️ Doctors can log in, view, create, update,  delete and many more of  their patient records — all from a clean and responsive web interface.

---

## 🌐 Live Website

Visit the deployed frontend:

👉 **[https://medix-neon.vercel.app](https://medix-neon.vercel.app)**

> Fully integrated with the FastAPI backend at [https://medixapi.onrender.com](https://medixapi.onrender.com)

> DOCS at [https://medixapi.onrender.com/docs](https://medixapi.onrender.com/docs)

---



# ⚙️ **Backend (FastAPI):**  
  [https://github.com/080bct12alex/MedixAPI](https://github.com/080bct12alex/MedixAPI)

---

## ✅ Key Features

-   🔐 JWT-authenticated API access
    
-   👨‍⚕️ Doctor-Based Access Control
      -   📋 View all patients
    
      -   🔍 Retrieve a patient by ID
    
      -   ➕ Add new patient records
    
      -   🛠 Update patient information
    
      -   🗑 Delete a patient
    
      -   📊 Sort by   `_id`, `latest_diagnosis_date`, `latest_condition`, `age`,`height`, `weight`.

      -   �� Automatically calculate BMI and assign a health category (`Underweight`, `Normal`, `Obese`)
     - 🩺 Diagnosis Tracking
       - Track each patient’s medical diagnosis history .
     - 📚 Diagnosis-Based Grouping
       - Group patients by `disease` , `condition` .

     - Filter patients based on  `Disease name` , `Condition` , `Diagnosis` `date`. 
       


- 🧭 Responsive UI


---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **API:** REST API powered by FastAPI
- **Deployment:** Vercel (Frontend), Render (Backend)

---



