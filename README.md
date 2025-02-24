# book-log-app

Book Log App

Description

The Book Log App is a personal book tracking web application built using Vanilla JavaScript.
It allows users to ->

Track books: Add, rate, edit, delete, and organize books by genre or author.
View personal library: After logging in, users can view their own book collection, which is stored on Firebase.
Interactive chatbot: Users can ask questions or get help through a chatbot integrated into the app.
Biometric authentication: Users can authenticate via biometric data for added security.
Firebase integration: The app uses Firebase Authentication for user login and Firestore for saving book data.
Responsive Design: The app is fully responsive and works seamlessly on both desktop and mobile devices.
GitHub Actions Workflow: A CI/CD pipeline is set up to automatically deploy the app to GitHub Pages on code changes.
The app is built using HTML, CSS, Vanilla JavaScript, and Firebase for backend functionality. It's deployed on GitHub Pages.

Features

User Authentication: Secure login and registration using Firebase Authentication.
Book Management: Users can add, edit, rate, and delete books in their personal library.
Library Organization: Users can filter their books by genre or author.
Chatbot: The chatbot can answer questions or provide assistance.
Biometric Authentication: Option for biometric login for additional security.
Firebase Integration: User data and books are stored securely using Firebase Firestore.
Responsive Design: The app adjusts its layout for an optimal experience on both mobile and desktop screens.

Setup Instructions
To run this app locally, follow the steps below:

Prerequisites
Firebase account: You need to set up Firebase for user authentication and database.
GitHub account: Required for hosting the repository and deployment via GitHub Pages.
Steps to Run Locally:

1. Clone the Repository to your local machine using Git
2. Set Up Firebase:
   Create a Firebase project by visiting Firebase Console.
   Enable Authentication and Firestore Database in the Firebase Console.
   Obtain your Firebase project’s configuration details from the Firebase Console.
   In the project folder, create a firebase-config.js file and insert your Firebase config.
3. Open the Project in Your Browser:
   The app is a simple static web application, so you can open it directly in a browser without the need for a local server. Just open the index.html file in your browser.

Firebase Security Rules:
Make sure your Firebase Firestore database has the appropriate security rules to protect user data.

GitHub Pages Deployment

The app is deployed using GitHub Pages. To deploy, follow these steps:

Push your changes to GitHub.
Navigate to your repository’s Settings.
Scroll down to the GitHub Pages section.
Under Source, select the main branch or gh-pages if you are using a separate deployment branch.
Your app will be live on GitHub Pages shortly after.

Repository for this app

GitHub Repository: https://github.com/Rakib-khn/book-log-app
