import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSection = 'recipes';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAi4D0f_i1hDiuHfT-ztRM81aD-1mhHlJ8',
      authDomain: 'ng-recipe-book-b919c.firebaseapp.com'
    });
  }

  onSectionChange(section: string) {
    this.showSection = section;
  }
}
