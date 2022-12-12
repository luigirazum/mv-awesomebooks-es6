// -- This is the App module for App class    -- //
// - the App has a Library, so we need the Libray module - //
// - in order to create a valid Library object.            - //
import Book from './book.js';
import Library from './library.js';

// -- (c) App - class to user interface -- //
// -   it also inserts and deletes to localStorage   - //
class App {
  constructor() {
    this.library = new Library();
    this.addForm = document.forms.addbook;
    this.formInputs = this.addForm.querySelectorAll('input');
    this.booksUl = document.getElementById('bookslist');
    this.menu = document.getElementById('nav-menu');
    this.link = document.getElementsByClassName('selected');
    this.screen = document.getElementsByClassName('active');
  }

  // -- getLiteralBook - returns a book object in literal notation -- //
  getLiteralBook() {
    const literalBook = { };
    const arrFormInputs = Array.from(this.formInputs);

    arrFormInputs.forEach((formInput) => {
      literalBook[formInput.id] = formInput.value;
    });

    return literalBook;
  }

  // -- displayBook - inserts a book in the DOM -- //
  displayBook(book) {
    const bookLi = book.createLi();
    this.booksUl.appendChild(bookLi);
  }

  // -- listBooks - list all the books from the library -- //
  listBooks() {
    if (this.library.books.length > 0) {
      this.library.books.forEach((book) => {
        this.displayBook(book);
      });
    }
  }

  // -- popError - shows a custom error if title/author are invalid -- //
  popError() {
    if (!this.invalidInput.validity.customError) {
      if (this.invalidInput.validity.valueMissing) {
        this.invalidInput.setCustomValidity(`Book ${this.invalidInput.placeholder} is required and can't be empty.`);
      } else if (this.invalidInput.validity.tooShort) {
        this.invalidInput.setCustomValidity(`Book ${this.invalidInput.placeholder} length must be 6 chars at least.`);
      } else if (this.invalidInput.validity.patternMismatch) {
        this.invalidInput.setCustomValidity(`Book ${this.invalidInput.placeholder} can't start or end with spaces.`);
      } else {
        this.invalidInput.setCustomValidity('');
      }
    }
    this.invalidInput.focus();
    this.invalidInput.reportValidity();
  }

  // -- removeBook - it deletes a Book from the DOM -- //
  removeBook(event) {
    const { target: t, target: { parentElement: pe } } = event;
    if (t.type === 'button') {
      const delBook = new Book({ title: pe.firstElementChild.textContent });
      if (this.library.delete(delBook)) {
        this.library.save();
        pe.parentNode.removeChild(pe);
      }
    }
  }

  // -- addBook - inserts a book into the library & display the book in the DOM -- //
  addBook(event) {
    const { target: t, target: { elements: e } } = event;
    event.preventDefault();

    // -- with customError and not empty value we have to check again if the book exists -- //
    if (e.title.value && e.title.validity.customError) {
      e.title.setCustomValidity('');
    }
    if (e.author.value && e.author.validity.customError) {
      e.author.setCustomValidity('');
    }

    if (t.checkValidity()) {
      const checkBook = new Book({ title: e.title.value });
      if (this.library.has(checkBook)) {
        this.invalidInput = e.title;
        this.invalidInput.setCustomValidity(`The Book ${this.invalidInput.value} already exists. No duplicates allowed.`);
        this.popError();
      } else {
        const newBook = new Book(this.getLiteralBook());
        this.displayBook(newBook);
        this.library.insert(newBook);
        t.reset();
        e.title.focus();
        this.menu.children[1].children[0].click();
      }
    } else {
      this.invalidInput = t.querySelector(':invalid');
      this.popError();
    }
  }

  showMenu(event) {
    const { target: t } = event;
    event.preventDefault();

    if (t.tagName === 'A' && t.className !== 'logo' && t.className !== 'selected') {
      this.link[0].classList.toggle('selected');
      t.classList.toggle('selected');
      this.link = document.getElementsByClassName('selected');

      const currentScreen = document.getElementsByClassName('active');
      currentScreen[0].classList.toggle('active');

      const nextScreen = document.querySelector(t.dataset.target);
      nextScreen.classList.toggle('active');
    } else {
      const listLink = document.querySelector('nav ul [data-target="#list"]');
      if (listLink.className !== 'selected') {
        listLink.click();
      }
    }
  }
}

export default { App };