import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() outBook: EventEmitter<any> = new EventEmitter();

  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }

  deleteBook() {
    if (confirm(`Seguro que desea borrar el libro: ${this.book.name}`)) {
      this.booksService.deleteBook(this.book.id).then(() => {
      }, (error) => {
        console.error(error);
      });
    }
  }

  editBook() {
    this.outBook.emit(this.book);
  }

}
