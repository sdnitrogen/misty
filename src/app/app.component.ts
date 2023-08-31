import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { weatherData } from './models/weather.model';
import { weatherImageMap } from './lib/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Misty';
  darkModeActive = false;
  locationName: string = 'Mountain View';
  weatherData?: weatherData;
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
        this.error404 = false;
        this.weatherData = response;
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
      },
      error: (response) => {
        this.error404 = true;
      },
    });
  }
}
