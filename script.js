let myLibrary = [];

//Book object constructor
function Book(title, author, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  if (haveRead) {
    this.haveRead = "already read";
  } else {
    this.haveRead = "have not read";
  }
}

//set protype info function for Book objects
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.haveRead}.`;
};

function addBookToLibrary() {}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());
