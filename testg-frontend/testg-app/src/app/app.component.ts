import { Component } from '@angular/core';
import { Location } from '@angular/common';

export interface Link {
  readonly title: string;
  readonly route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private _location: Location) {}

  readonly title = 'testg-app';
  activeLink: string;
  links: Link[] = [
    {
      title:"My Projects", route:"/projects"
    },
    {
      title:"My Tests", route:"/tests"
    }
  ]

  activateLink(linkTitle: string) {
    this.activeLink = linkTitle;
  }

  ngOnInit(): void {
    if(this._location.path().toString() === this.links[0].route || this._location.path().toString() === "") {
      this.activateLink(this.links[0].title);
    } else {
      this.activateLink(this.links[1].title);
    }
  }
}
