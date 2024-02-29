const booksContainerEl = document.querySelector(".books-container");

const myLibrary = [];

function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBookInfo(book) {
    const bookRowElement = document.createElement("tr");
    bookRowElement.classList.add("single-book")
    for(const prop in book) {
        const cell  = document.createElement("td");
        cell.textContent = book[prop];
        bookRowElement.appendChild(cell);
    }
    booksContainerEl.appendChild(bookRowElement);
}

function logBooks() {
    for (const book of myLibrary) {
        displayBookInfo(book);
    }
}

const harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 331, "read");
const witcher = new Book("The Witcher: The Last Wish", "Andrzej Sapkowski", 304, "unread");
const lotr = new Book("The Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 448, "read");

addBookToLibrary(harryPotter);
addBookToLibrary(witcher);
addBookToLibrary(lotr);

logBooks();

const newBookBtnEl = document.querySelector(".new-book-btn");
const submitFormEl = document.forms["new-book-form"];


function logNewBook() {
    displayBookInfo(myLibrary[myLibrary.length-1]);
}

newBookBtnEl.addEventListener("click", function() {
    console.log("dupa");
});

submitFormEl.addEventListener("submit", function(e) {  
    e.preventDefault();
    const newTitle = document.forms["new-book-form"].book_title.value;
    const newAuthor = document.forms["new-book-form"].book_author.value;
    const newPages = document.forms["new-book-form"].book_num_of_pages.value;
    const newStatus = document.forms["new-book-form"].status.value;

    const submittedBook = new Book(newTitle, newAuthor, newPages, newStatus);
    myLibrary.push(submittedBook);
    logNewBook();
});