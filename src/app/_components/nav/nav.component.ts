import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  // Manage the collapsed state of the navbar
  isNavbarCollapsed = true;

  /**
   * Toggle the navbar to the opposite state (collapsed or not collapsed)
   */
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  constructor() { }

  ngOnInit() {
  }

}
