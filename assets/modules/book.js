// -- This is the Book module for Book class -- //

// -- (c) Book - class to create valid Books -- //
class Book {
  constructor({ title, author = null }) {
    this.title = title;
    this.author = author;
  }

  // -- createLi - returns an <li> with the book info -- //
  createLi = () => {
    const templateBook = `
    <span class="book-title">${this.toTitleCase()}</span>
    <span>by</span>
    <span class="book-author">${this.author}</span>
    <button type="button">Remove</button>`;
    const liBook = document.createElement('li');
    liBook.innerHTML = templateBook;
    const bookFragment = document.createDocumentFragment();
    bookFragment.appendChild(liBook);
    return bookFragment;
  }

  /* To Title Case © 2018 David Gouch | https://github.com/gouch/to-title-case */
  toTitleCase = () => {
    const smallWords = /^(a|an|and|as|is|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
    const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
    const wordSeparators = /([ :–—-])/;

    return this.title.toLowerCase().split(wordSeparators)
      .map((current, index, array) => {
        if (
          current.search(smallWords) > -1 // <-- Check for small words
          && index !== 0 // <-- Skip the first word
          && index !== array.length - 1 // <-- Skip the last word
          && array[index - 3] !== ':' // <-- Ignore title end
          && array[index + 1] !== ':' // <-- Ignore subtitle start
          && (array[index + 1] !== '-' // <-- Ignore small words that start a hyphenated phrase
          || (array[index - 1] === '-' && array[index + 1] === '-'))
        ) {
          return current.toLowerCase();
        }

        /* Ignore intentional capitalization */
        if (current.substr(1).search(/[A-Z]|\../) > -1) {
          return current;
        }

        /* Ignore URLs */
        if (array[index + 1] === ':' && array[index + 2] !== '') {
          return current;
        }

        /* Capitalize the first letter */
        return current.replace(alphanumericPattern,
          (match) => match.toUpperCase());
      })
      .join('');
  }
}

export default { Book };