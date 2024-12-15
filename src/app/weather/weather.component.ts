import { Component, OnInit} from '@angular/core';
import { WeatherService } from '../services/weather.service';
@Component({
  selector: 'app-weather',
  standalone: false, //to make app module
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  cities: any[] = []; // All cities weather data
  searchedCity: any = null; // Currently searched city
  availableCityDates: string[] = []; // Dates available for the searched city
  selectedCityDate: string = ''; // Selected date for the searched city
  filteredForecast: any = null; // Filtered forecast for the searched city and selected date
  isCelsius: boolean = true; // Default to Celsius

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getAllCitiesWeather();
  }

  // Fetch all cities' weather data
  getAllCitiesWeather(): void {
    this.weatherService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => console.error('Error fetching cities:', err),
    });
  }

  // Handle search for a city by name
  searchCity(cityName: string): void {
    this.searchedCity = this.cities.find(
      (city) => city.city.toLowerCase() === cityName.toLowerCase()
    );

    if (this.searchedCity) {
      this.availableCityDates = this.searchedCity.forecast.map((f: any) => f.date); // Extract dates
      this.selectedCityDate = this.availableCityDates[this.availableCityDates.length - 1]; // Default to the last date
      this.filterSearchedCityForecast(); // Show forecast for the last date by default
    } else {
      this.resetSearch();
    }
  }

  // Reset the search
  resetSearch(): void {
    this.searchedCity = null;
    this.filteredForecast = null;
    this.selectedCityDate = '';
  }

  // Filter forecast based on selected date
  filterSearchedCityForecast(): void {
    if (this.searchedCity && this.selectedCityDate) {
      this.filteredForecast = this.searchedCity.forecast.find(
        (f: any) => f.date === this.selectedCityDate
      );
    }
  }
  // Navigate back to the all cities weather list
  backToAllCities(): void {
    this.resetSearch(); // Reset the search state
  }
  // Get the temperature for the filtered forecast
  getTemperatureFromForecast(forecast: any): string {
    return this.isCelsius
      ? `${forecast.temperatureCelsius}°C`
      : `${forecast.temperatureFahrenheit}°F`;
  }

  // Get the temperature for cities in the all-cities table
  getTemperature(city: any): string {
    const lastDay = city.forecast[city.forecast.length - 1]; // Get the last day's forecast
    return this.isCelsius
      ? `${lastDay.temperatureCelsius}°C`
      : `${lastDay.temperatureFahrenheit}°F`;
  }

  
  selectCity(city: any): void {
    this.searchCity(city.city);
  }
}
