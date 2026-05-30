import { useState, useEffect } from 'react';

export type LiveData = {
  temperature: number;
  humidity: number;
  weatherCode: number;
  isDay: number;
  aqi: number;
  hour: number;
  status: 'loading' | 'success' | 'error';
  feelsLike: number;
  windSpeed: number;
  sunset: string;
};

export function useAhmedabadLive() {
  const [data, setData] = useState<LiveData>({
    temperature: 30, // Default fallbacks
    humidity: 50,
    weatherCode: 0,
    isDay: 1,
    aqi: 50,
    hour: 12,
    status: 'loading',
    feelsLike: 32,
    windSpeed: 10,
    sunset: '19:00',
  });

  useEffect(() => {
    async function fetchLive() {
      try {
        const [weatherRes, aqiRes] = await Promise.all([
          fetch('https://api.open-meteo.com/v1/forecast?latitude=23.0225&longitude=72.5714&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,is_day&daily=sunset&timezone=Asia%2FKolkata'),
          fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=23.0225&longitude=72.5714&current=us_aqi&timezone=Asia%2FKolkata')
        ]);

        const weatherData = await weatherRes.json();
        const aqiData = await aqiRes.json();

        const ahmedabadTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const currentHour = new Date(ahmedabadTime).getHours();

        let parsedSunset = "19:00";
        if (weatherData.daily && weatherData.daily.sunset && weatherData.daily.sunset.length > 0) {
           const timePart = weatherData.daily.sunset[0].split('T')[1]; // '19:15'
           // Convert 24h to 12h format
           const [sHour, sMin] = timePart.split(':');
           const h = parseInt(sHour);
           parsedSunset = `${h % 12 || 12}:${sMin} ${h >= 12 ? 'PM' : 'AM'}`;
        }

        setData({
          temperature: weatherData.current.temperature_2m,
          humidity: weatherData.current.relative_humidity_2m,
          weatherCode: weatherData.current.weather_code,
          isDay: weatherData.current.is_day,
          feelsLike: weatherData.current.apparent_temperature,
          windSpeed: weatherData.current.wind_speed_10m,
          sunset: parsedSunset,
          aqi: aqiData.current.us_aqi,
          hour: currentHour,
          status: 'success'
        });
      } catch (error) {
        setData(prev => ({ ...prev, status: 'error' }));
      }
    }
    
    fetchLive();
    const interval = setInterval(fetchLive, 5 * 60 * 1000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  return data;
}
