const myLibrary = [];

function Book(title, author, pages, details, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.details = details;
  this.completed = completed;
}

Book.prototype.isRead = function () {
  if (this.completed === 'Completed') {
    this.completed = 'Re - read';
  } else {
    this.completed = 'Completed';
  }
  return this.completed;
};

Book.prototype.currentPage = '0 / ';

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// loop myLibrary to display books.
function displayBooks() {
  const main = document.querySelector('main');
  main.innerHTML = ''; // prevent previous elements in library to duplicate.
  let currentIndex = -1;

  myLibrary.forEach(() => {
    currentIndex += 1;
    const currentBook = myLibrary[currentIndex];

    //  card
    const containerCard = document.createElement('div');
    containerCard.setAttribute('class', 'card');

    //  read-state and book section
    const readStateSection = document.createElement('section');
    const bookSection = document.createElement('section');
    readStateSection.setAttribute('class', 'read-state');
    bookSection.setAttribute('class', 'book');

    //  --------read-state section children-----------
    const pagePara = document.createElement('p');
    pagePara.textContent = 'Page';

    const numContainer = document.createElement('div');
    numContainer.setAttribute('class', 'num-container');

    // currentPage
    const currentPagePara = document.createElement('p');

    const currentPage = document.createElement('span');
    currentPage.setAttribute('class', 'current-page');
    currentPage.setAttribute('id', 'current-page');
    currentPage.textContent = currentBook.currentPage;

    const totalPage = document.createElement('span');
    totalPage.setAttribute('id', 'pages-card');
    totalPage.textContent = currentBook.pages;

    currentPagePara.appendChild(currentPage);
    currentPagePara.appendChild(totalPage);
    numContainer.appendChild(currentPagePara);

    // read-complete button
    const readBtn = document.createElement('button');
    readBtn.setAttribute('id', 'completed-btn');
    readBtn.setAttribute('class', 'completed-btn');
    readBtn.textContent = currentBook.completed;

    //  append read-state children
    readStateSection.appendChild(pagePara);
    readStateSection.appendChild(numContainer);
    readStateSection.appendChild(readBtn);

    // ------------book section children--------------
    const bookImageContainer = document.createElement('div');
    bookImageContainer.setAttribute('class', 'book-img-container');

    const finalStatePara = document.createElement('p');
    finalStatePara.setAttribute('id', 'book-final-state');
    finalStatePara.setAttribute('class', 'book-final-state');
    finalStatePara.textContent = 'Ongoing';

    const bookImage = document.createElement('img');
    bookImage.setAttribute('src', 'images/1.jpg');
    bookImage.setAttribute('alt', 'book-template-cover');

    bookImageContainer.appendChild(finalStatePara);
    bookImageContainer.appendChild(bookImage);

    //  book details
    const bookDetails = document.createElement('div');
    bookDetails.setAttribute('class', 'book-details');

    const titlePara = document.createElement('p');
    titlePara.setAttribute('id', 'title-card');
    titlePara.setAttribute('class', 'title-card');
    titlePara.textContent = currentBook.title;

    const authorPara = document.createElement('p');
    authorPara.setAttribute('id', 'author-card');
    authorPara.setAttribute('class', 'author-card');
    authorPara.textContent = currentBook.author;

    const detailsPara = document.createElement('p');
    detailsPara.setAttribute('id', 'details-card');
    detailsPara.setAttribute('class', 'details-card');
    detailsPara.textContent = currentBook.details;

    bookDetails.appendChild(titlePara);
    bookDetails.appendChild(authorPara);
    bookDetails.appendChild(detailsPara);

    // append book section children
    bookSection.appendChild(bookImageContainer);
    bookSection.appendChild(bookDetails);

    //  append card children
    containerCard.appendChild(readStateSection);
    containerCard.appendChild(bookSection);
    main.appendChild(containerCard);
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
  let details = document.getElementById('details').value;
  let completed = document.getElementById('read').checked;

  // validate form
  if (pages <= 0) {
    const pageInput = document.querySelector('input[type="number"]');
    const pageError = document.querySelector('.page-error');

    pageInput.classList.add('input-error');
    pageError.style.display = 'block';
    return;
  }
  if (details === '') {
    details = 'details: N/A';
  }
  if (completed) {
    completed = 'Re-read';
  } else {
    completed = 'Completed';
  }

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

// TO DO

// Create data attribute for every card for editing
// Store 2 initial cards in Library Array
