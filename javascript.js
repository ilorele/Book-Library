const booksContainerEl = document.querySelector(".books-container");

let myLibrary = [];

function Book(title, author, numOfPages, status) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createRmBtn(bookRowElement, bookTitle) {
    const rmBtnContainer = document.createElement("td");

    const rmBtnEl = document.createElement("button");
    rmBtnEl.textContent = "remove";
    rmBtnEl.classList.add("remove-book-btn");

    rmBtnContainer.appendChild(rmBtnEl);
    bookRowElement.appendChild(rmBtnContainer);

    rmBtnEl.addEventListener("click", function() {
        removeBook(bookTitle);
    });
}

function displayBookInfo(book) {
    const bookRowElement = document.createElement("tr");
    bookRowElement.dataset.bookName = book.title;
    for(const prop in book) {
        const cell  = document.createElement("td");
        cell.textContent = book[prop];

        if (prop === "status") {
            cell.classList.add("read-status");
        }

        bookRowElement.appendChild(cell);
    }
    createRmBtn(bookRowElement, book.title);
    booksContainerEl.appendChild(bookRowElement);
}

function createBooksTable() {
    for (const book of myLibrary) {
        displayBookInfo(book);
    }
}

function removeBook(bookTitle) {
    const newLibrary = myLibrary.filter((book) => book.title !== bookTitle);
    myLibrary = newLibrary;

    const elToRemove = document.querySelector(`[data-book-name="${bookTitle}"]`);
    elToRemove.remove();
}

const harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 331, "read");
const witcher = new Book("The Witcher: The Last Wish", "Andrzej Sapkowski", 304, "unread");
const lotr = new Book("The Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 448, "read");

addBookToLibrary(harryPotter);
addBookToLibrary(witcher);
addBookToLibrary(lotr);

createBooksTable();

const newBookBtnEl = document.querySelector(".new-book-btn");
const submitFormEl = document.forms["new-book-form"];


function toggleDisplay(el) {
  el.classList.toggle("hidden")
}

function logNewBook() {
    displayBookInfo(myLibrary[myLibrary.length-1]);
}

newBookBtnEl.addEventListener("click", function() {
    toggleDisplay(newBookBtnEl);
    toggleDisplay(submitFormEl);
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
    toggleDisplay(newBookBtnEl);
    toggleDisplay(submitFormEl);
    submitFormEl.reset();
    getReadStatusELs();
});

function getReadStatusELs() {
    let readStatusEls = document.querySelectorAll(".read-status");

    for (let i = 0; i < readStatusEls.length; i++) {
        removeReadStatusChange(readStatusEls[i]);
        addReadStatusChange(readStatusEls[i]);
    }
}

function removeReadStatusChange(bookStatus) {
    bookStatus.removeEventListener("click", changeReadStatusText);
}

function addReadStatusChange(bookStatus) {
    bookStatus.addEventListener("click", changeReadStatusText);
}

function changeReadStatusText(e) {
    if (e.target.textContent === "read") {
        e.target.textContent = "unread";
    } else if (e.target.textContent === "unread") {
        e.target.textContent = "read";
    }
}

getReadStatusELs();