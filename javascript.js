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