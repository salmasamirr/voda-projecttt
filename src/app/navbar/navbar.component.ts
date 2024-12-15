import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone:false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() citySearch = new EventEmitter<string>(); // Emit search query
  searchQuery: string = '';

  onSearch(): void {
    this.citySearch.emit(this.searchQuery.trim());
  }
}
