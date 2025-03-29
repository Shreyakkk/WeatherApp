# Weather App (React Native)

## Overview
This is a React Native application that fetches and displays weather data based on user input. It follows the MVVM architecture for better maintainability and separation of concerns. The app also supports offline caching and pull-to-refresh functionality.

## Features
- Search for weather details of any city.
- Display temperature, humidity, wind speed, and weather conditions.
- Offline caching of last searched weather data.
- Pull-to-refresh functionality to update weather data.
- Clean and maintainable MVVM architecture.

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add your OpenWeatherMap API Key in `WeatherScreen.js`:
   ```js
   const API_KEY = "YOUR_API_KEY";
   ```
4. Run the application:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS (Mac only)
   ```

## Technologies Used
- React Native
- Axios (for API calls)
- AsyncStorage (for offline caching)

## File Structure
```
/weather-app
│── src
│   ├── components
│   ├── viewmodels
│   ├── views
│   ├── models
│   ├── App.js
│── package.json
│── README.md
```

## License
This project is licensed under the MIT License.

## Author
Developed by [Shreyak](https://github.com/Shreyakkk).

