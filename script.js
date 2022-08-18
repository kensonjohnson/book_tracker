const submitButton = document.querySelector("[data-submit-button]");
const bookshelf = document.getElementById("bookshelf");

let myLibrary = [];
displayBooks();

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
let title;
let author;
let pages;
let read;

//Book object constructor
function Book(title, author, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
}

Book.prototype.changeStatus = function () {
  this.haveRead = !this.haveRead;
  saveToLocalStorage();
  displayBooks();
};

//add a book to the myLibrary array and then save locally as JSON
function addBook() {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  saveToLocalStorage();
}

//update array with JSON information and update display
function displayBooks() {
  resetDisplayedBooks();
  grabFromLocalStorage();
  for (let i = 0; i < myLibrary.length; i++) {
    createBookCard(myLibrary[i], i);
  }
}

//keep div.form-card HTML but remove all books
function resetDisplayedBooks() {
  let currentBooks = document.querySelectorAll(".book");
  for (i = 0; i < currentBooks.length; i++) {
    bookshelf.removeChild(currentBooks[i]);
  }
}

function createBookCard(book, index) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.dataset.index = index;

  //add title header
  let title = document.createElement("h2");
  title.innerHTML = book.title;
  bookCard.appendChild(title);

  //add author
  let author = document.createElement("p");
  author.innerHTML = `Author: ${book.author}`;
  bookCard.appendChild(author);

  //add number of pages
  let pages = document.createElement("p");
  pages.innerHTML = `${book.numberOfPages} pages long.`;
  bookCard.appendChild(pages);

  //show whether book has been read or not.
  let read = document.createElement("p");
  if (book.haveRead) {
    read.innerHTML = "You have read this book";
  } else {
    read.innerHTML = "You have not read this book";
  }
  bookCard.appendChild(read);

  //set button to change read status
  let changeStatusButton = document.createElement("button");
  changeStatusButton.innerHTML = "Change read status";
  changeStatusButton.addEventListener("click", () => {
    book.haveRead = !book.haveRead;
    displayBooks();
  });
  bookCard.appendChild(changeStatusButton);

  //set button to remove book from array and refresh display
  let removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  removeButton.addEventListener("click", () => {
    console.log(index);
    myLibrary.splice(index, 1);
    saveToLocalStorage();
    displayBooks();
  });
  bookCard.appendChild(removeButton);

  //attach bookCard to the display
  bookshelf.appendChild(bookCard);
}

function handleForm() {
  title = titleInput.value;
  author = authorInput.value;
  pages = pagesInput.value;
  read = readInput.value === "yes" ? true : false;

  if (checkInputs()) {
    addBook();
    clearForm();
    displayBooks();
  }
}

function checkInputs() {
  let form = document.querySelector(".form-card");
  let inputs = form.elements;

  for (let i = 0; i < 3; i++) {
    let value = inputs.item(i).value;
    if (value == null || value == undefined || value == "") {
      alert("All fields must be filled out!");
      return false;
    }
  }
  return true;
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.value = "";
}

function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  console.log("inside of save");
}

function grabFromLocalStorage() {
  const books = JSON.parse(localStorage.getItem("myLibrary"));
  console.log("inside of restore local");
  if (books) {
    myLibrary = books.map((book) => convertJSONtoBook(book));
  } else {
    myLibrary = [];
  }
}

function convertJSONtoBook(book) {
  console.log("inside of convert");
  return new Book(book.title, book.author, book.numberOfPages, book.haveRead);
}

//setup button listeners
submitButton.addEventListener("click", () => {
  handleForm();
});
