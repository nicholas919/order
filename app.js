// book class: represents a book

class Book {
  constructor(namaCustomer, produk, noHpCustomer, transaksi, pengiriman) {
    this.namaCustomer = namaCustomer;
    this.produk = produk;
    this.noHpCustomer = noHpCustomer;
    this.transaksi = transaksi;
    this.pengiriman = pengiriman;

  }
}

// UI class: handles UI tasks

class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${book.namaCustomer}</td>
      <td>${book.produk}</td>
      <td>${book.noHpCustomer}</td>
      <td>${book.transaksi}</td>
      <td>${book.pengiriman}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete tombol1">X</a></td>
    `;
    
    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // NOT VALIDATED alert
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const table = document.querySelector('.table');
    container.insertBefore(div, table);
    // remove alert after 5 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
  }

  static clearFields() {
    document.querySelector("#namaCustomer").value = "";
    document.querySelector("#produk").value = "";
    document.querySelector("#noHpCustomer").value = "";
    document.querySelector("#transaksi").value = "";
    document.querySelector("#pengiriman").value = "";
  };
}

// Store class: handles (local) storage - within the browser

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(pengiriman) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.pengiriman === pengiriman) {
        books.splice(index, 1)
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// event: display books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// event: add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const namaCustomer = document.querySelector("#namaCustomer").value;
  const produk = document.querySelector("#produk").value.replace(/\n\r?/g, '<br/>');
  const noHpCustomer = document.querySelector("#noHpCustomer").value;
  const transaksi = document.querySelector("#transaksi").value;
  const pengiriman = document.querySelector("#pengiriman").value;

  // validation
  if(namaCustomer === '' || produk === '' || noHpCustomer === '' || transaksi === '' || pengiriman === '') {
    // show NOT VALIDATED alert
    UI.showAlert('Isi Data dengan Lengkap!', 'danger');
  } else {
  // instantiate book
    const book = new Book(namaCustomer, produk, noHpCustomer, transaksi, pengiriman);

  // add book to UI
    UI.addBookToList(book);

    // add book to Store
    Store.addBook(book);

    // show VALIDATED alert
    UI.showAlert('Data Berhasil Ditambahkan!', 'success');  

    //clear fields
    UI.clearFields();
  }
});

// event: remove a book

document.querySelector("#book-list").addEventListener("click", (e) => {
  //remove book from UI
  UI.deleteBook(e.target);

  // remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show BOOK REMOVED SUCCESS alert
  UI.showAlert('Data Berhasil Dihapus!', 'warning');
});

// time expiry 168 hours
const hours = 168; 
const now = new Date().getTime();
const setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > hours*60*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}

// restrict + , - e . character input type number

document.querySelector(".your_class").addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});

