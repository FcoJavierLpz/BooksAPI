import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Author } from './author.model';
import { AuthorsService } from '../services/authors.service';

/**
 * Author Component
 * Component used to representate a book's author
 * @export
 */
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  /**
   * Indicates that author's data is provided and
   * that must satisfy with the "author" interface type
   *
   */
  @Input() author: Author;

  /**
   * An event emitted when the author is edit.
   */
  @Output() outAuthor: EventEmitter<any> = new EventEmitter();
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
  }

  /**
   * Allows the user to delete an author by id
   */
  deleteAuthor() {
    if (confirm(`Seguro que desea borrar el autor: ${this.author.name}`)) {
      this.authorsService.deleteAuthor(this.author.id.toString()).then(() => {
      }, (error) => {
        console.error(error);
      });
    }
  }

  /**
   * Allows the user to modify an author
   */
  editAuthor() {
    this.outAuthor.emit(this.author);
  }

}
