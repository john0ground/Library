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

Book.prototype.bookCoverTemplate = 'images/4.jpg';

//  store 2 initial books in Array
const initial1 = new Book('Game of Thrones', 'George R.R. Martin', '694', 'This book tells the tale of various clashing households and their quest to conquer control over the seven kingdoms. Set in a distant, but vaguely familiar medieval-Europe, the story bears parallels to England’s “War of the Roses,” while also introducing its share of unique fantasy elements. As the reader progresses through the book, they follow the politics of the Iron Throne- a metaphor representing the complete and utter control a King possesses in a feudal government system.', 'Re-read');
const initial2 = new Book('Fifty Shades of #808080', 'Anonymous', '514', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos necessitatibus vitae tenetur sapiente, minus impedit ipsam deleniti at cum cupiditate iste temporibus.', 'Completed');
initial1.bookCoverTemplate = 'images/1.jpg';
initial2.bookCoverTemplate = 'images/5.jpg';

const myLibrary = [initial1, initial2];

let selectedIndex; // set to global for access to functions in editing selected books.
let formMode; // set to global for access whether form is for adding book or editing.

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function modifiedBookToLibrary(book) {
  myLibrary.splice(selectedIndex, 1, book);
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
    containerCard.classList.add('card-minimize');

    if (currentBook.completed === 'Re-read') {
      containerCard.classList.toggle('card-complete');
    }

    //  read-state and book section
    const readStateSection = document.createElement('section');
    const bookSection = document.createElement('section');
    readStateSection.setAttribute('class', 'read-state');
    readStateSection.classList.add('read-state-minimize');
    bookSection.setAttribute('class', 'book');

    //  --------read-state section children-----------
    const pagePara = document.createElement('p');
    pagePara.textContent = 'Page';

    const numContainer = document.createElement('div');
    numContainer.setAttribute('class', 'num-container');
    numContainer.setAttribute('data-index', `${currentIndex}`);

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
    readBtn.setAttribute('data-index', `${currentIndex}`);
    readBtn.textContent = currentBook.completed;
    readBtn.classList.add('completed-btn-minimize');

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
    bookImage.setAttribute('src', `${currentBook.bookCoverTemplate}`);
    bookImage.setAttribute('alt', 'book-template-cover');
    bookImage.setAttribute('data-index', `${currentIndex}`);

    bookImageContainer.appendChild(finalStatePara);
    bookImageContainer.appendChild(bookImage);

    //  book details
    const bookDetails = document.createElement('div');
    bookDetails.setAttribute('class', 'book-details');
    bookDetails.classList.add('book-details-minimize');

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
    detailsPara.classList.add('details-card-minimize');
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
        <button class="edit-btn edit-minimize" id="edit-btn" data-index="${currentIndex}">
          <svg class="edit" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path    fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="var(--text-sub)"/></svg>
        </button>
        <button class="delete-btn delete-minimize" id="delete-btn" data-index="${currentIndex}">
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

    // assign eventListener to buttons after every newly created book
    const editBtn = document.querySelectorAll('#edit-btn');
    editBtn.forEach((btn) => {
      formMode = 'edit';
      btn.addEventListener('click', openFormEdit);
    });

    const deleteBtn = document.querySelectorAll('#delete-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', deleteBook);
    });

    const pageNum = document.querySelectorAll('.num-container');
    pageNum.forEach((btn) => {
      btn.addEventListener('click', editCurrentPage);
    });

    const completedBtn = document.querySelectorAll('.completed-btn');
    completedBtn.forEach((btn) => {
      btn.addEventListener('click', changeBookState);
    });

    const bookTemplate = document.querySelectorAll('.book-img-container');
    bookTemplate.forEach((template) => {
      template.addEventListener('click', openBookTemplates);
    });

    containerCard.addEventListener('click', toggleCard);
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

  // add new book or edit
  if (formMode === 'add') {
    addBookToLibrary(book);
  } else { modifiedBookToLibrary(book); }

  displayBooks();
  formModal.style.display = 'none';
}

form.addEventListener('submit', addNewBook);

// open form
const openForm = document.querySelector('#add-book-btn');
openForm.addEventListener('click', () => {
  formMode = 'add';
  formModal.style.display = 'flex';
  form.reset();
});

// close form
const closeForm = document.querySelector('.close');
closeForm.addEventListener('click', () => {
  formModal.style.display = 'none';
});

//  open form with values, edit book
function openFormEdit(e) {
  e.stopPropagation();
  selectedIndex = e.target.dataset.index;

  const titleInput = document.getElementById('title');
  titleInput.value = myLibrary[selectedIndex].title;

  const authorInput = document.getElementById('author');
  authorInput.value = myLibrary[selectedIndex].author;

  const pagesInput = document.getElementById('pages');
  pagesInput.value = myLibrary[selectedIndex].pages;

  const completedInput = document.getElementById('read');
  if (myLibrary[selectedIndex].completed === 'Completed') {
    completedInput.checked = false;
  } else { completedInput.checked = true; }

  const detailsTextArea = document.getElementById('details');
  detailsTextArea.textContent = myLibrary[selectedIndex].details;

  formModal.style.display = 'flex';
}

//  delete book
function deleteBook(e) {
  e.stopPropagation();
  selectedIndex = e.target.dataset.index;

  myLibrary.splice(selectedIndex, 1);
  displayBooks();
}

//  edit current page
const pageModal = document.querySelector('#page-modal');
function editCurrentPage(e) {
  e.stopPropagation();
  selectedIndex = e.target.dataset.index;
  const modalTotalPage = document.querySelector('.modal-page-total');

  if (myLibrary[selectedIndex].completed === 'Re-read') {
    return false;
  }

  pageModal.style.display = 'flex';
  modalTotalPage.textContent = ` / ${myLibrary[selectedIndex].pages}`;
}

//  close currentPage modal
const closePageModal = document.querySelector('.edit-page-close');
closePageModal.addEventListener('click', () => {
  pageModal.style.display = 'none';
});

//  current page validation
const currentPageEdit = document.querySelector('.edit-current-page');
currentPageEdit.addEventListener('input', () => {
  const current = parseInt(currentPageEdit.value, 10);
  const total = parseInt(myLibrary[selectedIndex].pages, 10);

  if (current > total) {
    currentPageEdit.value = total;
  } else if (current < 0) {
    currentPageEdit.value = 0;
  }
});

//  current page save
const editPageSave = document.querySelector('#edit-page-save');
editPageSave.addEventListener('click', () => {
  myLibrary[selectedIndex].currentPage = `${currentPageEdit.value} / `;

  if (currentPageEdit.value === '') {
    myLibrary[selectedIndex].currentPage = '0 / ';
  }

  displayBooks();
  pageModal.style.display = 'none';
});

//  change book state, complete/ongoing
function changeBookState(e) {
  e.stopPropagation();

  selectedIndex = e.target.dataset.index;
  if (myLibrary[selectedIndex].completed === 'Completed') {
    myLibrary[selectedIndex].completed = 'Re-read';
  } else {
    myLibrary[selectedIndex].completed = 'Completed';
    myLibrary[selectedIndex].currentPage = '0 / ';
  }

  displayBooks();
}

//  change theme
function changeTheme(color) {
  const root = document.documentElement;

  if (color === 'grayish-blue') {
    root.style.setProperty('--text-main', 'white');
    root.style.setProperty('--text-sub', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--background', '#263238');
    root.style.setProperty('--num-container', '#37474F');
    root.style.setProperty('--card-container', '#546E7A');
    root.style.setProperty('--button-read', '#AB9085');
  } else if (color === 'brown') {
    root.style.setProperty('--text-main', 'white');
    root.style.setProperty('--text-sub', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--background', '#352420');
    root.style.setProperty('--num-container', '#4E342E');
    root.style.setProperty('--card-container', '#6D4C41');
    root.style.setProperty('--button-read', '#76AD84');
  } else if (color === 'light-blue') {
    root.style.setProperty('--text-main', 'black');
    root.style.setProperty('--text-sub', 'rgba(0, 0, 0, 0.7)');
    root.style.setProperty('--background', '#8eb6b9');
    root.style.setProperty('--num-container', '#9abfc3');
    root.style.setProperty('--card-container', '#E0F7FA');
    root.style.setProperty('--button-read', '#365C4F');
  }
}

const themes = document.querySelectorAll('.theme');

themes.forEach((theme) => {
  theme.addEventListener('click', () => {
    if (theme.id === 'brown') {
      changeTheme('brown');
    } else if (theme.id === 'grayish-blue') {
      changeTheme('grayish-blue');
    } else if (theme.id === 'light-blue') {
      changeTheme('light-blue');
    }
  });
});

//  open book images modal
const imagesModal = document.getElementById('images-modal');
function openBookTemplates(e) {
  e.stopPropagation();
  imagesModal.style.display = 'flex';
  selectedIndex = e.target.dataset.index;
}

//  close book images modal
const closeImagesModal = document.getElementById('images-modal-close');
closeImagesModal.addEventListener('click', () => {
  imagesModal.style.display = 'none';
});

//  replace book template img
function replaceBookTemplate(e) {
  const selectedTemplate = e.target.dataset.imageTemplate;
  myLibrary[selectedIndex].bookCoverTemplate = `images/${selectedTemplate}.jpg`;
  displayBooks();
  imagesModal.style.display = 'none';
  console.log(selectedTemplate);
}

const bookTemplates = document.querySelectorAll('.img-modal-container');
bookTemplates.forEach((template) => {
  template.addEventListener('click', replaceBookTemplate);
});

//  toggle resize card
function toggleCard(e) {
  e.stopPropagation();

  const minimizeCard = this;
  const minimizeDetails = this.querySelector('.details-card');
  const minimizeBook = this.querySelector('.book-details');
  const minimizeCompleteBtn = this.querySelector('.completed-btn');
  const minimizeReadState = this.querySelector('.read-state');
  const minimizeEdit = this.querySelector('.edit-btn');
  const minimizeDelete = this.querySelector('.delete-btn');

  minimizeCard.classList.toggle('card-minimize');
  minimizeDetails.classList.toggle('details-card-minimize');
  minimizeBook.classList.toggle('.book-details-minimize');
  minimizeCompleteBtn.classList.toggle('completed-btn-minimize');
  minimizeReadState.classList.toggle('read-state-minimize');
  minimizeEdit.classList.toggle('edit-minimize');
  minimizeDelete.classList.toggle('delete-minimize');
}

displayBooks();
