import { Component, ViewChild } from '@angular/core'; // `ViewChild` is used to access and manipulate DOM elements or child components directly in the component class.
import { WeatherComponent } from './weather/weather.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('weather') weatherComponent!: WeatherComponent;

  searchCity(cityName: string): void {
    this.weatherComponent.searchCity(cityName);
  }
}
