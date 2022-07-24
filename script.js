const submitButton = document.querySelector("[data-submit-button]");
const bookshelf = document.getElementById("bookshelf");
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

let myLibrary = [];
myLibrary.push(theHobbit);
displayBooks();

let title;
let author;
let pages;
let read;

//Book object constructor
function Book(title, author, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  if (haveRead) {
    this.haveRead = "Have read.";
  } else {
    this.haveRead = "Have not read.";
  }
}

//set protype info function for Book objects
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.haveRead}.`;
};

//create function to add a book to the myLibrary array
function addBook() {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

//create function to display books on screen
function displayBooks() {
  resetDisplayedBooks();
  for (i = 0; i < myLibrary.length; i++) {
    createBookCard(myLibrary[i]);
  }
}

//create function to handle div.form-card HTML
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

  let title = document.createElement("p");
  title.innerHTML = book.title;
  bookCard.appendChild(title);

  let author = document.createElement("p");
  author.innerHTML = book.author;
  bookCard.appendChild(author);

  let pages = document.createElement("p");
  pages.innerHTML = `${book.numberOfPages} pages long.`;
  bookCard.appendChild(pages);

  let read = document.createElement("p");
  read.innerHTML = book.haveRead;
  bookCard.appendChild(read);

  bookshelf.appendChild(bookCard);
}

//create function to handle form submition
function handleForm() {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = parseInt(document.getElementById("pages").value);
  read = document.getElementById("read").value === "yes" ? true : false;

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

//setup button listeners
submitButton.addEventListener("click", () => {
  handleForm();
});
