// This is the JS source entry point for the project.
// where we link the different modules required for
// the project to work.

// -- (I)mport module App - it provides the App class to create valid App object -- //
import App from '../modules/app.js';

// -- app - is the interface with the user -- //
const app = new App();

// - When the DOM is ready, the books from the localStorage are shown - //
window.addEventListener('DOMContentLoaded', app.listBooks());

// -- Listen to the submit event on the form -- //
app.addForm.addEventListener('submit', (e) => app.addBook(e));

// -- Listen to the click event on the list of books -- //
app.booksUl.addEventListener('click', (e) => app.removeBook(e));

// -- Listen to the click event on the navbar options -- //
app.menu.addEventListener('click', (e) => app.showMenu(e));
