// Import the functions you need from the Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js';

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Add Book functionality
document
  .getElementById('addBookBtn')
  .addEventListener('click', () => {
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'block';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookGenre').value = '';
    document.getElementById('bookRating').value = '';
    document.getElementById('submitBookBtn').textContent =
      'Submit'; // Reset button text
    delete document.getElementById('submitBookBtn').dataset
      .bookId; // Clear the bookId
  });

document
  .getElementById('cancelBookBtn')
  .addEventListener('click', () => {
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'none'; // Correct ID
  });

document
  .getElementById('submitBookBtn')
  .addEventListener('click', async () => {
    const title =
      document.getElementById('bookTitle').value;
    const author =
      document.getElementById('bookAuthor').value;
    const genre =
      document.getElementById('bookGenre').value;
    const rating =
      document.getElementById('bookRating').value;

    const bookId =
      document.getElementById('submitBookBtn').dataset
        .bookId;

    if (bookId) {
      // Edit Book
      try {
        await updateDoc(doc(db, 'books', bookId), {
          title,
          author,
          genre,
          rating,
        });
        alert('Book updated!');
        document.getElementById(
          'addBookFormContainer'
        ).style.display = 'none'; // Correct ID
        loadBooks();
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      // Add Book
      try {
        await addDoc(collection(db, 'books'), {
          title,
          author,
          genre,
          rating,
        });
        alert('Book added!');
        document.getElementById(
          'addBookFormContainer'
        ).style.display = 'none'; // Correct ID
        loadBooks();
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  });

// Load Books from Firestore
async function loadBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = ''; // Clear existing books

  const querySnapshot = await getDocs(
    collection(db, 'books')
  );
  querySnapshot.forEach((doc) => {
    const book = doc.data();
    const bookCard = document.createElement('div');
    bookCard.className = 'bookCard';
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>By ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Rating: ${book.rating}</p>
      <button class="deleteBtn">Delete</button>
      <button class="editBtn">Edit</button>
    `;

    // Add event listener for delete button
    const deleteBtn = bookCard.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      deleteBook(doc.id);
    });

    // Add event listener for edit button
    const editBtn = bookCard.querySelector('.editBtn');
    editBtn.addEventListener('click', () => {
      editBook(doc.id, book);
    });

    bookList.appendChild(bookCard);
  });
}

// Delete Book
async function deleteBook(id) {
  try {
    await deleteDoc(doc(db, 'books', id));
    alert('Book deleted!');
    loadBooks();
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
}

// Edit Book
function editBook(id, book) {
  // Set form values with the book data
  document.getElementById('bookTitle').value = book.title;
  document.getElementById('bookAuthor').value = book.author;
  document.getElementById('bookGenre').value = book.genre;
  document.getElementById('bookRating').value = book.rating;

  // Store bookId for editing
  document.getElementById('submitBookBtn').dataset.bookId =
    id;

  // Show the add/edit form
  document.getElementById(
    'addBookFormContainer'
  ).style.display = 'block';
}

window.onload = loadBooks;
