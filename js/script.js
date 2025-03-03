// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-in Function
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Signed in as:', result.user.displayName);
    loadBooks();
  } catch (error) {
    console.error(
      'Error signing in with Google:',
      error.message
    );
  }
}

// Sign Out Function
function signOutUser() {
  auth.signOut().then(() => {
    console.log('User signed out');
  });
}

// Authentication State Change
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in:', user.displayName);
    document.getElementById('authContainer').style.display =
      'none';
    document.getElementById('addBookBtn').style.display =
      'block';

    document.getElementById('userProfile').style.display =
      'block';
  } else {
    console.log('User is logged out');
    displayLoginMessage();
    document.getElementById('userProfile').style.display =
      'none';
  }
  loadBooks();
});

// Add Book functionality
document
  .getElementById('addBookBtn')
  .addEventListener('click', () => {
    if (!auth.currentUser) {
      alert(
        'Please sign in with your Google account to add a book.'
      );
      return;
    }
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'block';
    resetForm();
    document
      .getElementById('submitBookBtn')
      .removeEventListener('click', handleUpdate);
    document
      .getElementById('submitBookBtn')
      .addEventListener('click', handleAddBook);
  });

// Cancel Book form
document
  .getElementById('cancelBookBtn')
  .addEventListener('click', () => {
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'none';
    resetForm();
  });

// Reset the form fields
function resetForm() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookGenre').value = '';
  document.getElementById('bookRating').value = '';
  document.getElementById('submitBookBtn').textContent =
    'Submit';
}

// Handle Add Book functionality
async function handleAddBook() {
  const user = auth.currentUser;
  if (!user) {
    alert(
      'Please sign in with your Google account to submit a book.'
    );
    return;
  }

  const title = document.getElementById('bookTitle').value;
  const author =
    document.getElementById('bookAuthor').value;
  const genre = document.getElementById('bookGenre').value;
  const rating =
    document.getElementById('bookRating').value;

  try {
    await addDoc(collection(db, 'books'), {
      title,
      author,
      genre,
      rating,
      userId: user.uid,
    });
    alert('Book added!');
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'none';
    loadBooks();
    resetForm();
  } catch (error) {
    console.error('Error adding document:', error);
  }
}

// Handle Update Book functionality
async function handleUpdate(bookId) {
  const title = document.getElementById('bookTitle').value;
  const author =
    document.getElementById('bookAuthor').value;
  const genre = document.getElementById('bookGenre').value;
  const rating =
    document.getElementById('bookRating').value;

  const bookDocRef = doc(db, 'books', bookId);
  try {
    await updateDoc(bookDocRef, {
      title,
      author,
      genre,
      rating,
    });

    alert('Book updated!');
    document.getElementById(
      'addBookFormContainer'
    ).style.display = 'none';
    loadBooks();
    resetForm();
  } catch (error) {
    console.error('Error updating book:', error);
  }
}

// Load Books from Firestore
async function loadBooks() {
  const bookList = document.getElementById('bookList');

  const user = auth.currentUser;

  if (user) {
    const querySnapshot = await getDocs(
      collection(db, 'books')
    );
    let booksFound = false;

    const books = [];
    querySnapshot.forEach((doc) => {
      const book = doc.data();
      const bookId = doc.id;

      if (book.userId === user.uid) {
        booksFound = true;
        const bookinfo = `
                <h3>${book.title}</h3>
                <p>By ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Rating: ${book.rating}</p>
                <button class="deleteBtn" data-id="${bookId}">Delete</button>
                <button class="editBtn" data-id="${bookId}">Edit</button>
                `;
        const bookCard = document.createElement('div');
        bookCard.innerHTML = bookinfo;
        bookCard.className = 'bookCard';
        books.push(bookCard);
      }
    });
    bookList.innerHTML = '';
    bookList.append(...books);

    if (!booksFound) {
      const noBooksMessage = document.createElement('p');
      noBooksMessage.textContent =
        'You have not added any books yet.';
      bookList.appendChild(noBooksMessage);
    }

    // event listeners to the dynamically created buttons
    document
      .querySelectorAll('.deleteBtn')
      .forEach((button) => {
        button.addEventListener('click', async (event) => {
          const bookId = event.target.dataset.id;
          try {
            await deleteDoc(doc(db, 'books', bookId));
            alert('Book deleted!');
            loadBooks();
          } catch (error) {
            console.error('Error deleting book:', error);
          }
        });
      });

    document
      .querySelectorAll('.editBtn')
      .forEach((button) => {
        button.addEventListener('click', async (event) => {
          const bookId = event.target.dataset.id;
          const bookDocRef = doc(db, 'books', bookId);
          const bookSnap = await getDoc(bookDocRef);

          if (bookSnap.exists()) {
            const bookData = bookSnap.data();
            document.getElementById('bookTitle').value =
              bookData.title;
            document.getElementById('bookAuthor').value =
              bookData.author;
            document.getElementById('bookGenre').value =
              bookData.genre;
            document.getElementById('bookRating').value =
              bookData.rating;

            document.getElementById(
              'addBookFormContainer'
            ).style.display = 'block';

            const updateBtn =
              document.getElementById('submitBookBtn');
            updateBtn.textContent = 'Update';

            updateBtn.removeEventListener(
              'click',
              handleAddBook
            );
            updateBtn.addEventListener('click', () =>
              handleUpdate(bookId)
            );
          }
        });
      });
  } else {
    bookList.innerHTML = '';
    displayLoginMessage();
  }
}

// Display a message if the user is not logged in
function displayLoginMessage() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML =
    '<p>Please log in to see your listed books.</p>';
}

// Load books on window load
window.onload = () => {
  const user = auth.currentUser;
  if (user) {
    loadBooks();
  } else {
    displayLoginMessage();
  }
};
