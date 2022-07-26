const submitButton = document.querySelector("[data-submit-button]");
const bookshelf = document.getElementById("bookshelf");
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

let myLibrary = [];
myLibrary.push(theHobbit);
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

//set protype info function for Book objects
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.haveRead}.`;
};

Book.prototype.changeStatus = function () {
  this.haveRead = !this.haveRead;
  displayBooks();
};

//create function to add a book to the myLibrary array
function addBook() {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

//create function to display books on screen
function displayBooks() {
  resetDisplayedBooks();
  for (let i = 0; i < myLibrary.length; i++) {
    createBookCard(myLibrary[i]);
  }
}

//create function to keep div.form-card HTML but remove all books
function resetDisplayedBooks() {
  let currentBooks = document.querySelectorAll(".book");
  for (i = 0; i < currentBooks.length; i++) {
    bookshelf.removeChild(currentBooks[i]);
  }
}

//create funtion to display book cards
function createBookCard(book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book");

  let title = document.createElement("h2");
  title.innerHTML = book.title;
  bookCard.appendChild(title);

  let author = document.createElement("p");
  author.innerHTML = `Author: ${book.author}`;
  bookCard.appendChild(author);

  let pages = document.createElement("p");
  pages.innerHTML = `${book.numberOfPages} pages long.`;
  bookCard.appendChild(pages);

  let read = document.createElement("p");
  if (book.haveRead) {
    read.innerHTML = "You have read this book";
  } else {
    read.innerHTML = "You have not read this book";
  }
  bookCard.appendChild(read);

  let changeStatusButton = document.createElement("button");
  changeStatusButton.innerHTML = "Change read status";
  changeStatusButton.addEventListener("click", () => {
    book.haveRead = !book.haveRead;
    displayBooks();
  });
  bookCard.appendChild(changeStatusButton);

  let removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  removeButton.addEventListener("click", removeBook);
  bookCard.appendChild(removeButton);

  bookshelf.appendChild(bookCard);
}

//create function to handle form submition
function handleForm() {
  title = titleInput.value;
  author = authorInput.value;
  pages = pagesInput.value;
  read = readInput.value === "yes" ? true : false;

  if (checkInputs()) {
    addBook();
    displayBooks();
  }
}

//check that inputs are valid
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

//locates book within array by id and removes that single object
function removeBook(book) {
  myLibrary.splice(book.target.dataset.ID, 1);
  displayBooks();
}

//setup button listeners
submitButton.addEventListener("click", () => {
  handleForm();
});
