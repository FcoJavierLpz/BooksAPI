import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../book/book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../author/author.model';

/**
 * Books Component
 * Component used to representate a books series
 * @export
 */
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {
  title = 'Libros';
  add = 'Agregar Libros';
  hide = false;

  /**
   * Representation of the input data for the book form
   */
  bookForm: FormGroup;

  /**
   * Regular expression that validates an image url
   */
  urlPattern = '(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)';

  /**
   * Accepts an array of book
   */
  books: Book[] = [];

  /**
   * Accepts an array of author
   */
  authors: Author[] = [];

  /**
   * Text string to perform a search by book
   */
  @Input() searchBook = '';

  constructor(private booksService: BooksService, private authorsService: AuthorsService, private builder: FormBuilder) {
    this.bookForm = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      url: ['', Validators.compose([Validators.required, Validators.pattern(this.urlPattern)])],
      author: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe((bookSnapshot) => {
      this.books = [];
      bookSnapshot.forEach((bookData: any) => {
        this.books.push({
          id: bookData.payload.doc.ref.id,
          name: bookData.payload.doc.data().name,
          url: bookData.payload.doc.data().url,
          author: bookData.payload.doc.data().author,
          desc: bookData.payload.doc.data().desc
        });
      });
    });
    this.authorsService.getAuthors().subscribe((authorSnapshot) => {
      this.authors = [];
      authorSnapshot.forEach((authorData: any) => {
        this.authors.push({
          id: authorData.payload.doc.ref.id,
          name: authorData.payload.doc.data().name,
          url: authorData.payload.doc.data().url,
          nationality: authorData.payload.doc.data().nationality,
          birth: authorData.payload.doc.data().birth
        });
      });
    });
  }

  /**
   * Show and hide form to add books
   * @param boolean flag to reset the form
   */
  showForm(flag: boolean) {
    if (!flag) {
      this.bookForm.reset();
    }
    this.hide = !this.hide;
    if (this.hide) {
      this.add = 'Ocultar Formulario';
    } else {
      this.add = 'Agregar Autores';
    }
  }

  /**
   * Save or update information related to a book
   * @param Book book
   */
  saveBook(book: Book) {
    if (!book.id) {
      book.id = Date.now();
      this.booksService.createBook(book).then(() => {
        book = null;
        this.showForm(true);
      });
    } else {
      this.booksService.editBook(book).then(() => {
        book = null;
        this.showForm(true);
      });
    }
  }

  /**
   * Bring to the form the information related to the book you want to modify
   * @param Book book
   */
  modifBook(book: Book) {
    this.showForm(false);
    this.bookForm.setValue({
      id: book.id,
      name: book.name,
      url: book.url,
      author: book.author,
      desc: book.desc
    });
  }

}
