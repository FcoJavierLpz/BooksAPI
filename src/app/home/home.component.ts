import { Component, OnInit, Input } from '@angular/core';

/**
 * Home Component
 * Must be used to wrap content to be displayed in the layout
 * @export
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search = '';
  constructor() { }

  ngOnInit() {
  }

}
