import { Component, Input, Output, OnInit } from '@angular/core';
import { Author } from './author.model';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
  }

  deleteAuthor(author: Author) {
    if (confirm(`Seguro que desea borrar el autor: ' ${author.name}`)) {
      this.authorsService.deleteAuthor(author.id).then(() => {
      }, (error) => {
        console.error(error);
      });
    }
  }

}
