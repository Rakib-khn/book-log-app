# Book Log App

## Description

Book Log App is a personal book tracking web application built using Vanilla JavaScript, HTML, and CSS. This interactive app allows users to manage their personal library by adding, editing, rating, and deleting books. It integrates with Firebase to securely authenticate users (via their Google accounts) and to persist data using Firestore. An AI-powered chatbot, built with the Google Bard API, assists users by providing information about the books they’re adding or summarizing book content.

> **Note:** This project is a school assignment by Rakib Khan, designed to build on the fundamentals of web development.

## Features

- **User Authentication:** Secure login using Firebase Authentication (Google Sign-In).
- **Book Management:** Add, edit, rate, and delete books in your personal library.
- **Library Organization:** Organize and filter books by genre or author.
- **Private Reviews:** Keep personal notes and reviews that are accessible only to the logged-in user.
- **AI Chatbot Integration:** Get assistance or detailed book information using an AI chatbot powered by the Google Bard API.
- **Responsive Design:** Fully responsive layout that works seamlessly on both desktop and mobile devices.
- **Firebase Integration:** Real-time data storage with Firebase Firestore ensuring persistence across sessions.

## Upcoming Features

- **Biometric Authentication:** Enhanced security through biometric login options (e.g., fingerprint or face recognition) will be added in future updates.
- **GitHub Actions CI/CD Pipeline:** Automation for linting, testing, and deployment via GitHub Actions is on the roadmap.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Setup Instructions](#setup-instructions)
- [Firebase Setup](#firebase-setup)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Setup Instructions

### Prerequisites

- **Web Browser:** A modern browser such as Chrome, Firefox, or Safari.
- **Firebase Account:** Required for setting up authentication and the Firestore database.
- **GitHub Account:** To clone the repository and for GitHub Pages deployment.

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Rakib-khn/book-log-app.git
   ```
2. **Set Up Firebase:**

   - Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Firebase Authentication** (using Google Sign-In) and **Firestore Database**.
   - Obtain your Firebase configuration details.
   - In the project folder, create a file named `firebase-config.js` and insert your Firebase configuration:

     ```javascript
     // firebase-config.js
     const firebaseConfig = {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_STORAGE_BUCKET',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID',
     };

     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     ```

3. **Launch the App:**
   - Since the app is a static web application, you can open `index.html` directly in your browser.

### Firebase Security Rules

Ensure that your Firestore database is secured with appropriate security rules. For example:

```json
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## GitHub Pages Deployment

Book Log App is deployed on GitHub Pages. To deploy your version:

1. Push your changes to GitHub.
2. Navigate to your repository’s **Settings**.
3. Scroll down to the **GitHub Pages** section.
4. Under **Source**, select the `main` branch (or `gh-pages` if using a separate deployment branch).
5. Your app will be published on GitHub Pages shortly thereafter.

> **Upcoming:** A GitHub Actions workflow to automate linting, testing, and deployment will be implemented in future updates.

## Technologies Used

- **HTML & CSS:** For the app's structure and styling.
- **Vanilla JavaScript:** Core functionality and dynamic interactions.
- **Firebase Authentication:** Secure user login with Google accounts.
- **Firebase Firestore:** Persistent, real-time data storage.
- **Google Bard API:** Powers the AI chatbot for book information and summarization.
- **Responsive Design:** Ensures an optimal experience across all devices.

## Project Structure

```
book-log-app/
├── index.html         # Main HTML file
├── css/               # CSS styles
     └── style.css     # styling for the entire app
├── js/                # JavaScript functionality
     ├── auth.js       # Firebase auth js codes
     ├── chatbot.js    # Google Bard API chatbot code
     └── script.js     # Functional code for the app
└── README.md          # Project documentation
```

## Contributing

Since it is a school project, unfortunately the author is in no position to allow contributions to the app.
Fanshawe College retains all rights to the app.
Copying the code and plagiarizing on it is prohibited.
However, the author welcomes any suggestion made.

## Author

**Rakib Khan**

- GitHub: [Rakib-khn](https://github.com/Rakib-khn)

## Acknowledgments

- Special thanks to the course instructor and classmates for their feedback and support.
- Appreciation to the Firebase team and developers of the Google Bard API for their excellent tools.
