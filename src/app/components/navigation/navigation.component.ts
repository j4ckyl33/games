import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHidden: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void{
    this.isHidden = !this.isHidden;
  }
}
