import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from '../services/books.service';

/**
 * Book Component
 * Component used to representate a book
 * @export
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  /**
   * Indicates that book's data is provided and
   * that must satisfy with the "book" interface type
   *
   */
  @Input() book: Book;

  /**
   * An event emitted when the book is edit.
   */
  @Output() outBook: EventEmitter<any> = new EventEmitter();

  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }

  /**
   * Allows the user to delete a book by id
   */
  deleteBook() {
    if (confirm(`Seguro que desea borrar el libro: ${this.book.name}`)) {
      this.booksService.deleteBook(this.book.id.toString()).then(() => {
      }, (error) => {
        console.error(error);
      });
    }
  }

  /**
   * Allows the user to modify a book
   */
  editBook() {
    this.outBook.emit(this.book);
  }

}
