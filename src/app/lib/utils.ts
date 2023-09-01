import { dayscastData } from '../models/dayscast.model';
import { forecastData } from '../models/forecast.model';

export const weatherImageMap: Record<string, string> = {
  Clear: '../assets/clear.png',
  ClearNight: '../assets/clear_night.png',
  Rain: '../assets/rain.png',
  Snow: '../assets/snow.png',
  Clouds: '../assets/cloud.png',
  CloudsNight: '../assets/cloud_night.png',
  Thunderstorm: '../assets/thunderstorm.png',
  Drizzle: '../assets/drizzle.png',
  Haze: '../assets/haze.png',
  Mist: '../assets/mist.png',
};

const weatherIconMap: Record<string, string> = {
  '01d': 'sun',
  '01n': 'sun',
  '02d': 'cloud-sun',
  '02n': 'cloud-sun',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'cloud-rain',
  '09n': 'cloud-rain',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'cloud-lightning',
  '11n': 'cloud-lightning',
  '13d': 'snowflake',
  '13n': 'snowflake',
  '50d': 'cloud-fog',
  '50n': 'cloud-fog',
};

export const formatTimestamp = (date: Date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var formatTime = hours + ':' + minutes.toString().padStart(2, '0');
  return formatTime;
};

export const getLocalTime = (dt: number, timezone: number) => {
  const localTime = new Date(dt * 1000);
  const localOffset = localTime.getTimezoneOffset() * 60000;
  const currentUtcTime = localOffset + localTime.getTime();
  const cityOffset = currentUtcTime + 1000 * timezone;
  const cityTime = new Date(cityOffset);
  return cityTime;
};

export const getDaysData = (
  data: forecastData,
  today: Date,
  timezone: number
) => {
  const dayscastData: dayscastData[] = [];
  const nextDaysData = data.list.slice(1);
  const uniqueDays = new Set();
  let count = 0;
  for (const dayData of nextDaysData) {
    const forecastDate = getLocalTime(dayData.dt, timezone);
    const dayAbbreviation = forecastDate.toLocaleDateString('en', {
      weekday: 'short',
    });
    const dayTemp = `${Math.round(dayData.main.temp)}°C`;
    const iconCode = dayData.weather[0].icon;

    // Ensure the day isn't duplicate and today
    if (
      !uniqueDays.has(dayAbbreviation) &&
      forecastDate.getDate() !== today.getDate()
    ) {
      uniqueDays.add(dayAbbreviation);
      dayscastData.push({
        icon: weatherIconMap[iconCode],
        day: dayAbbreviation,
        temp: dayTemp,
      });
      count++;
    }

    // Stop after getting 5 distinct days
    if (count === 5) break;
  }
  return dayscastData;
};
