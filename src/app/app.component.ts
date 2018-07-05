import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSection = 'recipes';

  onSectionChange(section: string) {
    this.showSection = section;
  }
}
