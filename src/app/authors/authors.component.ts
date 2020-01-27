import { Component, OnInit, Input } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../author/author.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Authors Component
 * Component used to representate a authors series
 * @export
 */
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {
  title = 'Autores';
  add = 'Agregar Autores';
  hide = false;

  /**
   * Representation of the input data for the author form
   */
  authorForm: FormGroup;

  /**
   * Regular expression that validates an image url
   */
  urlPattern = '(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)';

  /**
   * Accepts an array of author
   */
  authors: Author[] = [];

  /**
   * Text string to perform a search by author
   */
  @Input() searchAuthor = '';

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

  /**
   * Show and hide form to add authors
   * @param boolean flag to reset the form
   */
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
  /**
   * Save or update information related to an author
   * @param Author author
   */
  saveAuthor(author: Author) {
    if (!author.id) {
      author.id = Date.now();
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

  /**
   * Bring to the form the information related to the author you want to modify
   * @param Author author
   */
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
