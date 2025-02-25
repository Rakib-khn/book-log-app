import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvf5VRJNRE7lp3G1sFhjvzbDa4MENZyE0',
  authDomain: 'book-log-app-94c0f.firebaseapp.com',
  projectId: 'book-log-app-94c0f',
  storageBucket: 'book-log-app-94c0f.firebasestorage.app',
  messagingSenderId: '133009916216',
  appId: '1:133009916216:web:1dbf510dcf8f249e8bc1cd',
  measurementId: 'G-C03T71LP5N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign In Function
document
  .getElementById('googleSignInBtn')
  .addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in as:', user.displayName);
      document.getElementById(
        'authContainer'
      ).style.display = 'none';
      document.getElementById('addBookBtn').style.display =
        'block';
    } catch (error) {
      console.error(
        'Error signing in with Google:',
        error.message
      );
      alert('Failed to sign in. Please try again.');
    }
  });

// Sign Out Function
document
  .getElementById('signOutBtn')
  .addEventListener('click', async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      document.getElementById(
        'authContainer'
      ).style.display = 'block';
      document.getElementById('addBookBtn').style.display =
        'none';
      document.getElementById('bookList').innerHTML = '';
    } catch (error) {
      console.error('Error signing out:', error.message);
      alert('Failed to sign out. Please try again.');
    }
  });
