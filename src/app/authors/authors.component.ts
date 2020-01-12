import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  title = 'Autores';
  add = 'Agregar Autores';
  hide = false;
  constructor() { }

  ngOnInit() {
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
