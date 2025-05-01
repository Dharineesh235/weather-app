export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
  }
  
  interface WeatherDay {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_f: number;
    condition: WeatherCondition;
    [key: string]: unknown;
  }
  
  export interface WeatherForecastDay {
    date: string;
    day: WeatherDay;
    [key: string]: unknown;
  }
  
  interface WeatherForecast {
    forecastday: WeatherForecastDay[];
  }
  
  export interface WeatherData {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    forecast: WeatherForecast;
    [key: string]: unknown;
  }

  export interface HourData {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  }

  export interface LanguageTexts {
    search: string;
    city: string;
    date: string;
    temperature: string;
    condition: string;
    humidity: string;
    wind: string;
    chanceOfRain: string;
    precipitation: string;
    snow: string;
    chanceOfSnow: string;
    celcius: string;
    fahrenheit: string;
    error: string;
  }
  
  export interface Language {
    label: string;
    code: string;
    texts: LanguageTexts;
  }