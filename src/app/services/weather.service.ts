import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //I import this module for making HTTP requests to APIs.
import { Observable } from 'rxjs'; //handling asynchronous operations

@Injectable({  //A decorator that makes a class injectable via Angular's Dependency Injection system, allowing services to be shared across components.
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:4454'; 

  constructor(private http: HttpClient) {}

  // Fetch all cities weather data
  getAllCities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast`);
  }

  // Fetch weather data for a specific city by its ID
  getCityWeather(cityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cityForecast/${cityId}`);
  }
}
