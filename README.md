# 👨‍👩‍👧 Family Management App

A modern Angular-based web application to manage family members efficiently.
Users can **add, update, delete, and view family members** with a clean UI and real-time database integration.

---
# ⛓️‍💥 URL of deployed Project
https://family-management-app-33038.web.app

## ✨ Features

* 🔐 User Authentication (Firebase)
* ➕ Add family members
* ✏️ Edit member details
* 🗑️ Delete members
* 📋 View all members in a table
* 🔑 Proper validation in fields
* ⚡ Real-time updates using Firestore
* 🎨 Clean UI with PrimeNG components
* 🔔 Toast notifications for actions
* ⏳ Loading indicators for better UX

---

## 🛠️ Tech Stack

* **Frontend:** Angular 21
* **UI Library:** PrimeNG
* **Backend:** Firebase (Authentication + Firestore)
* **Database:** FireStore
* **Deployment:** Firebase Hosting + GitHub Actions

---

## 🔐 Authentication Flow

* User signs up / logs in using Firebase Auth
* Each user has their own data stored at:

```
users/{userId}/family/{memberId}
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/family-management-app.git
cd family-management-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure Firebase
login in firebase and create a project.
Update your `environment.ts` from firebase project/project settings:

```ts
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  }
};
```

---

### 4. Run the app

```bash
ng serve
```

Open:
👉 http://localhost:4200/

---

## 🏗️ Build for Production

```bash
ng build
```


## 🌐 Deployment

This project uses **Firebase Hosting with GitHub Actions**.

### Auto Deployment Flow:

```
git push →
GitHub Actions →
Angular Build →
Firebase Deploy 🚀
```

---


## 👨‍💻 Author

**Aarya**
Full Stack Developer

---
