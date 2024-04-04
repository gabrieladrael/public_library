document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('book-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var title = document.getElementById('title').value;
      var author = document.getElementById('author').value;
      addBookToList(title, author);
      saveBook(title, author);
      document.getElementById('book-form').reset();
    });
  
    document.getElementById('book-list').addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        var bookItem = e.target.parentElement;
        var title = bookItem.querySelector('h3').textContent;
        var author = bookItem.querySelector('p').textContent.substring(7);
        if (e.target.classList.contains('remove-btn')) {
          removeBook(bookItem);
          removeBookFromStorage(title, author);
        } else if (e.target.classList.contains('toggle-read-btn')) {
          toggleBookReadStatus(bookItem);
          toggleBookReadStatusInStorage(title, author);
        }
      }
    });
  
    // Carregar livros do armazenamento local quando a página é carregada
    loadBooksFromStorage();
  });
  
  function addBookToList(title, author) {
    var bookList = document.getElementById('book-list');
    var bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = '<h3>' + title + '</h3><p>Autor: ' + author + '</p><button class="remove-btn">Remover</button><button class="toggle-read-btn">Lido/Não Lido</button>';
    bookList.appendChild(bookItem);
  }
  
  function removeBook(bookItem) {
    var bookList = document.getElementById('book-list');
    bookList.removeChild(bookItem);
  }
  
  function toggleBookReadStatus(bookItem) {
    bookItem.classList.toggle('read');
  }
  
  function saveBook(title, author) {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ title: title, author: author, read: false });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function removeBookFromStorage(title, author) {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(function(book) {
      return book.title !== title || book.author !== author;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function toggleBookReadStatusInStorage(title, author) {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(function(book) {
      if (book.title === title && book.author === author) {
        book.read = !book.read;
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function loadBooksFromStorage() {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(function(book) {
      addBookToList(book.title, book.author);
      if (book.read) {
        var bookItem = document.querySelector('h3:contains("' + book.title + '")').parentElement;
        toggleBookReadStatus(bookItem);
      }
    });
  }