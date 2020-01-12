import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../author/author.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  title = 'Autores';
  add = 'Agregar Autores';
  hide = false;
  authors: Author[] = [];
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe((authorSnapshot) => {
      this.authors = [];
      authorSnapshot.forEach((authorData: any) => {
        console.log('subscribe author', authorData.payload.doc.data());
        this.authors.push({
          name: authorData.payload.doc.data().name,
          url: authorData.payload.doc.data().url,
          nationality: authorData.payload.doc.data().nationality,
          birthYear: authorData.payload.doc.data().birthYear
        });
      });
    });
  }

  showForm() {
    this.hide = !this.hide;
    if (this.hide) {
      this.add = 'Ocultar Formulario';
    } else {
      this.add = 'Agregar Autores';
    }
  }
}
