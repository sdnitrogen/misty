import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { weatherData } from './models/weather.model';
import { forecastData } from './models/forecast.model';
import {
  getLocalTime,
  formatTimestamp,
  weatherImageMap,
  getDaysData,
} from './lib/utils';
import { dayscastData } from './models/dayscast.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Misty';
  headerDay = 'Today';
  darkModeActive = false;
  locationName: string = 'Mountain View';
  weatherData?: weatherData;
  forecastData?: forecastData;
  dayscastData?: dayscastData[];
  sunrise?: string;
  sunset?: string;
  currentWeatherImg = '';
  error404 = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.locationName);
  }

  modeToggleSwitch() {
    this, (this.darkModeActive = !this.darkModeActive);
  }

  onSearch() {
    if (this.locationName === '') return;
    this.getWeatherData(this.locationName);
  }

  private getWeatherData(locationName: string) {
    this.weatherService.getWeatherData(locationName).subscribe({
      next: (response) => {
        this.headerDay = getLocalTime(
          response.dt,
          response.timezone
        ).toLocaleString('en-us', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
        this.weatherData = response;
        this.sunrise = formatTimestamp(
          getLocalTime(response.sys.sunrise, response.timezone)
        );
        this.sunset = formatTimestamp(
          getLocalTime(response.sys.sunset, response.timezone)
        );
        this.error404 = false;
        const partOfDay =
          response.sys.sunrise <= response.dt &&
          response.dt <= response.sys.sunset
            ? ''
            : 'Night';
        let weatherName: keyof typeof weatherImageMap =
          response.weather[0].main;
        if (weatherName === 'Clear' || weatherName === 'Clouds')
          weatherName += partOfDay;
        this.currentWeatherImg = weatherImageMap[weatherName];
        this.weatherService.getForecastData(locationName).subscribe({
          next: (res) => {
            this.forecastData = res;
            this.dayscastData = getDaysData(
              res,
              getLocalTime(response.dt, response.timezone),
              response.timezone
            );
          },
          error: (res) => {
            console.log(res);
          },
        });
      },
      error: (response) => {
        this.error404 = true;
      },
    });
  }
}
