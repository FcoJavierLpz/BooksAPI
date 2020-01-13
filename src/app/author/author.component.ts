import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Author } from './author.model';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;
  @Output() outAuthor: EventEmitter<any> = new EventEmitter();
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
  }

  deleteAuthor() {
    if (confirm(`Seguro que desea borrar el autor: ${this.author.name}`)) {
      this.authorsService.deleteAuthor(this.author.id).then(() => {
      }, (error) => {
        console.error(error);
      });
    }
  }

  editAuthor() {
    this.outAuthor.emit(this.author);
  }

}
