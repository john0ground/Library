const myLibrary = [];

function Book(title, author, pages, details, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.details = details;
  this.completed = completed;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// loop myLibrary to display books.
function displayBooks() {
  const main = document.querySelector('main');
  console.log(main.innerHTML);
  main.innerHTML = ''; // prevent previous elements in library to duplicate.

  myLibrary.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');

    bookContainer.textContent = book.author;
    main.appendChild(bookContainer);
  });
}

// form submission
const form = document.getElementById('form');
const formModal = document.querySelector('#form-modal');

function addNewBook(e) {
  e.preventDefault(e); // prevent form from submitting

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const details = document.getElementById('details').value;
  const completed = document.getElementById('read').checked;

  // add validated book
  const book = new Book(title, author, pages, details, completed);
  addBookToLibrary(book);

  displayBooks();
  formModal.style.display = 'none';
  form.reset();
}

form.addEventListener('submit', addNewBook);

// open form
const openForm = document.querySelector('#add-book-btn');

openForm.addEventListener('click', () => {
  formModal.style.display = 'flex';
});
