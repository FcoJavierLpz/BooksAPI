import { Component, Input, Output, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../author/author.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  title = 'Autores';
  add = 'Agregar Autores';
  hide = false;
  authorForm: FormGroup;
  urlPattern = '(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)';

  authors: Author[] = [];
  constructor(private authorsService: AuthorsService, private builder: FormBuilder) {
    this.authorForm = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      url: ['', Validators.compose([Validators.required, Validators.pattern(this.urlPattern)])],
      nationality: ['', Validators.required],
      birth: ['', Validators.required]
    });
  }

  ngOnInit() {
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

  showForm(flag: boolean) {
    if (!flag) {
      this.authorForm.reset();
    }
    this.hide = !this.hide;
    if (this.hide) {
      this.add = 'Ocultar Formulario';
    } else {
      this.add = 'Agregar Autores';
    }
  }

  saveAuthor(author: Author) {
    if (!author.id) {
      this.authorsService.createAuthor(author).then(() => {
        author = null;
        this.showForm(true);
      });
    } else {
      this.authorsService.editAuthor(author).then(() => {
        author = null;
        this.showForm(true);
      });
    }
  }

  modifAuthor(author: Author) {
    this.showForm(false);
    this.authorForm.setValue({
      id: author.id,
      name: author.name,
      url: author.url,
      nationality: author.nationality,
      birth: author.birth
    });
  }

}
