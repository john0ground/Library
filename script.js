const myLibrary = [];

function Book(title, author, pages, details, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.details = details;
  this.completed = completed;
}

Book.prototype.currentPage = '0 / ';

Book.prototype.isRead = function () {
  if (this.completed === 'Completed') {
    this.completed = 'Re-read';
  } else {
    this.completed = 'Completed';
  }
  return this.completed;
};

Book.prototype.changeCurrentPage = function () {
  if (this.completed === 'Re-read') {
    this.currentPage = `${this.pages} / `;
  } return this.currentPage;
};

Book.prototype.bookFinalState = function () {
  if (this.completed === 'Completed') {
    return 'Ongoing';
  } return 'Completed';
};

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
    containerCard.setAttribute('data-index', `${currentIndex}`);

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
    currentPage.textContent = currentBook.changeCurrentPage();

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
    finalStatePara.textContent = currentBook.bookFinalState();

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

    //  icons
    const rewriteIcons = `
    <div class="icon-container">
        <button class="edit-btn">
          <svg class="edit" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path    fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="var(--text-sub)"/></svg>
        </button>
        <button class="delete-btn">
          <svg class="delete" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12V17" stroke="var(--text-sub)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 12V17" stroke="var(--text-sub)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="var(--text-sub)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="var(--text-sub)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--text-sub)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>    
      </div>
  `;

    containerCard.innerHTML += rewriteIcons;
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

// close form
const closeForm = document.querySelector('.close');
closeForm.addEventListener('click', () => {
  formModal.style.display = 'none';
});

// TO DO

// Create data attribute for every card for editing
// edit a specific card and re-display / re - loop
// Store 2 initial cards in Library Array
