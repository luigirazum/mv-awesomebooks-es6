// -- This is the Library module for Library class    -- //
// - the Library has Books, so we need the Book module - //
// - in order to create valid Book objects.            - //
import Book from './book.js';

// -- (c) Library - class to store valid Books -- //
// -   it also insert, delete to localStorage   - //

class Library {
  constructor() {
    let readBooks = JSON.parse(localStorage.getItem('abData'));
    readBooks ??= [];
    this.books = readBooks.map((book) => new Book(book));
  }

  // -- save - writes the library to the localStorage -- //
  save = () => {
    localStorage.setItem('abData', JSON.stringify(this.books));
  }

  // -- has - verifies if a book is already in the library -- //
  has = ({ title: nBook }) => {
    this.books.some(({ title: b }) => b.toLowerCase() === nBook.toLowerCase());
  }

  // -- insert - inserts a newBook into the library -- //
  insert = (newBook) => {
    this.books.push(newBook);
    this.save();
    return newBook;
  }

  // -- delete - deletes the sBook from the library -- //
  delete = ({ title: sBook }) => {
    const previousBooks = this.books.length;

    this.books = this.books.filter(({ title: b }) => b.toLowerCase() !== sBook.toLowerCase());

    return (previousBooks !== this.books.length);
  }
}

export { Library as default };