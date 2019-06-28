import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectmanager';
  links: any[];
  activeLink = -1;
  constructor(private router: Router) {
    this.links = [
      {
        label: 'Add Project',
        link:'./projects',
        index: 0
      },
      {
        label: 'Add Task',
        link: './tasks',
        index: 1
      },
      {
        label: 'Add User',
        link: './users',
        index: 2
      },
      {
        label: 'View Task',
        link: './viewTask',
        index: 3
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLink = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
