import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LucideAngularModule,
  MapPin,
  Waves,
  Wind,
  Search,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  CloudRain,
  Snowflake,
  Cloudy,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Haze,
  ThermometerSun,
  ThermometerSnowflake,
  Umbrella,
  Sunrise,
  Sunset,
} from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({
      MapPin,
      Waves,
      Wind,
      Search,
      Sun,
      Moon,
      CloudSun,
      CloudMoon,
      CloudRain,
      Snowflake,
      Cloudy,
      CloudLightning,
      CloudDrizzle,
      CloudFog,
      Haze,
      ThermometerSun,
      ThermometerSnowflake,
      Umbrella,
      Sunrise,
      Sunset,
    }),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
