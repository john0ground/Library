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

// loop myLibrary
function displayBooks() {
  const container = document.querySelector('.book-container');
  container.innerHTML = ''; // prevent previous elements in library to duplicate.

  myLibrary.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.setAttribute('class', 'book');

    bookElement.textContent = book.author;
    container.appendChild(bookElement);
  });
}

const form = document.getElementById('form');

function addNewBook(e) {
  e.preventDefault(e); // prevent form from submitting

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const details = document.getElementById('details').value;
  const completed = false;

  const book = new Book(title, author, pages, details, completed);
  addBookToLibrary(book);

  displayBooks();
  form.style.display = 'none';
  form.reset();
  console.log(myLibrary);
}

form.addEventListener('submit', addNewBook);

const newBook = document.getElementById('new-book');
newBook.addEventListener('click', () => {
  form.style.display = 'block';
});
