project:- Multi-Language Weather Forecast App

This is a simple weather forecast application built using Next.js. It allows users to get historical weather information for any city on a selected date. The application supports multiple languages, making it accessible for users around the world.

ABOUT
The purpose of this project is to provide a minimal yet user-friendly interface for checking past weather details. It supports key weather metrics like temperature, humidity, wind speed, chance of rain, snow, and more. The app also includes multi-language support with localized labels and error messages.

FEATURES
View historical weather data for any city and date.

Multi-language support including English, Tamil, French, Spanish, German, Arabic, and Chinese.

Displays key weather information such as:

Temperature (in Celsius or Fahrenheit)

Weather condition

Humidity

Wind speed

Chance of rain

Precipitation

Snow and chance of snow

Caching of responses to reduce API calls and improve performance.

Error messages guide the user to check city and date inputs when something goes wrong.

Tech Stack Used
Next.js

TypeScript

WeatherAPI (https://www.weatherapi.com/)

Tailwind CSS (for optional styling)

In-memory caching

Getting Started
Follow the steps below to run the project locally.

Prerequisites
Before you begin, make sure you have the following installed:

Node.js (version 18 or above recommended)

npm (comes with Node.js)

Step 1: Clone the Repository
Open your terminal and run:
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
Step 2: Install Dependencies
Install all required dependencies using npm:
    npm install
Step 3: Set Up Environment Variables
Create a file named .env in the root directory and add your WeatherAPI key. You can get a free key by signing up at weatherapi.com.

Example .env file:
    NEXT_PUBLIC_WEATHER_API_API_KEY=your_api_key_here
Step 4: Run the Development Server
Start the application in development mode using the command:
    npm run dev
The application will be available at http://localhost:3000.

HOW IT WORKS
When a user enters a city and a date, the app fetches historical weather data from the WeatherAPI and displays it on the screen. The app supports multiple languages through a config file, and all weather terms and error messages are shown in the selected language. Data is cached for two minutes to avoid repeated API calls for the same input.

Languages Supported
The app currently supports the following languages:

English
Français (French)
Español (Spanish)
Deutsch (German)
தமிழ் (Tamil)
中文 (Simplified Chinese)
العربية (Arabic)

You can select the desired language from the dropdown in the app interface.

Assumptions and Design Decisions
This app uses only historical data as the free plan of WeatherAPI supports it.

Localization is done using a static object mapping instead of external libraries to keep things lightweight.

In-memory cache is used for performance. This cache resets on server restart or after a few minutes.

The application defaults to English if no language or an unsupported language is selected.

Metric units are used by default in API requests. Temperature display is labeled appropriately with degree and Fahrenheit symbols for clarity.

Deployment
You can deploy the application easily using platforms like Vercel, Netlify, or your own server. If deploying on Vercel, make sure to add your environment variable NEXT_PUBLIC_WEATHER_API_API_KEY in the Vercel dashboard.

License
This project is open-source and free to use under the MIT license.