import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { weatherData } from '../models/weather.model';
import { forecastData } from '../models/forecast.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(location: string): Observable<weatherData> {
    return this.http.get<weatherData>(environment.weatherApiBaseUrl, {
      params: new HttpParams()
        .set('q', location)
        .set('units', 'metric')
        .set('mode', 'json')
        .set('appid', environment.ApiKey),
    });
  }

  getForecastData(location: string): Observable<forecastData> {
    return this.http.get<forecastData>(environment.forecastApiBaseUrl, {
      params: new HttpParams()
        .set('q', location)
        .set('units', 'metric')
        .set('mode', 'json')
        .set('appid', environment.ApiKey),
    });
  }
}
