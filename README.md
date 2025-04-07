_**Weather App Documentation**_

**Project Overview**

This Weather App allows users to search for weather details by city or by using their current geolocation. 
It fetches weather data from OpenWeather API and displays various weather details, including temperature, 
humidity, wind speed, and weather icons. The frontend is built using React with TypeScript and Tailwind CSS, 
while the backend is a Node.js Express server handling API calls and other business logic.

**Tech Stack**

**Frontend:**

_React (TypeScript)_: A JavaScript library for building user interfaces.

_Vite_: A fast development build tool for modern web apps.

_Tailwind CSS_: A utility-first CSS framework to style components.

**Backend:**

_Node.js_: JavaScript runtime for server-side development.

_Express_: A web framework for building APIs and handling routing.

**API:**

_OpenWeather API_: Used for fetching weather data.

**Folder Structure (Frontend)**

        src/
        ├── assets/                  # Static files like images
        ├── components/              # Reusable UI components
        │   ├── images.tsx/          # Component for image
        │   ├── loaders.tsx/         # Component for loaders
        │   └── WeatherCard.tsx      # Weather card component that shows the weather data
        ├── pages/                   # Page components like Home, About, etc.
        ├── services/                # API calls for each components
        ├── types/                   # TypeScript type definitions
        │   └── WeatherCardTypes.tsx # Types for weather data, location suggestions, etc.
        └── App.tsx                  # Main component that initializes app

**Folder Structure (Backend)**

        server/
        ├── config/                  # Contains configuration files
        │   └── corsConfiguration.js # CORS settings for API requests        
        ├── controllers/             # Business logic for handling requests      
        │   └── weatherController.js # Logic for handling weather-related API calls
        ├── routes/                  # API routes definition
        │   └── weatherRoutes.js     # Routes for weather-related data
        ├── server.js                # Main Express server entry point
        └── package.json             # Backend dependencies (e.g., Express, Nodemon)


**Frontend Details**

**Components**

_WeatherCard.tsx_: Displays the weather information, including temperature, humidity, wind speed, and weather icons.
            	The search bar allows the user to type in the city name. It fetches suggestions from the 
            	OpenWeather API and displays them in a dropdown list.
             
              Focus-Recall Search: If the user clicks outside the dropdown or selects a suggestion, the input field 
              loses focus and suggestions are hidden.
                
              Debounce: A debounce mechanism ensures that the API is not called on every keystroke, improving 
              performance.
                
              Suggestions: A list of suggested locations is shown when the user types at least 3 characters. It also
              includes a feature that re-shows previous suggestions when the user focuses on the input again.
              
_Images_: Displays the static images

_loaders_: Displays the loaders

**Services**

_WeatherCardAPI_: Contains the API calls to get weather data and search suggestions.

_FetchInitialWeatherAPI_.tsx: Fetches weather data based on the user's location (latitude and longitude).
      
  _SearchedWeatherAPI_.tsx: Fetches weather data based on the city name entered by the user.
      
  _SuggestionOfSearchbarAPI_.tsx: Fetches location suggestions as the user types in the search bar.

**Types**

_WeatherCardTypes_.tsx: Contains TypeScript type definitions for various entities used in the app such as weather 
	                    data, location suggestions, and weather details.


**Backend Details**

**Controllers**

_weatherController.js_: Contains the logic for interacting with the OpenWeather API. This controller handles request
                    	for weather data based on either geolocation or city name and also the search suggestions
                    
The backend does not directly interact with the frontend; it simply provides an API endpoint that the frontend calls.

**Routes**

_weatherRoutes.js_: Contains the API routes for fetching weather data. It sets up the /weather and
	                /suggestions endpoints.

**Config**

_corsConfiguration.js_: Configures CORS to allow the frontend to make requests to the backend without any security 
	                    restrictions, especially when running in development.

**Server**

_server.ts_: The entry point for the Node.js server that uses Express to handle HTTP requests. The server listens
	         for incoming requests and forwards them to the correct controller for processing.


**Search Engine Features**

_Search Bar_: The search bar allows users to search for weather data based on city names. It uses the OpenWeather
	          API to fetch location suggestions and display them in a dropdown.

_Focus-Recall Suggestions_: If the user clicks outside the suggestions dropdown, the suggestions are hidden. If the
	                        input field is focused again, the previous suggestions are shown (without calling the API 
                          again unless the search term has changed).

_Debounced Suggestions_: When typing in the search bar, suggestions are fetched after a short delay (500ms) to avoid
	                    calling the API too frequently. This improves the app's performance.

**Running the Application**

**Frontend (React + Vite)**

Install dependencies:

	npm install
 
Start the development server:

	npm run dev
 
Open the app in your browser at http://localhost:5173.


**Backend (Node.js + Express)**

Install backend dependencies:

	npm install
 
Run the backend server with nodemon:

	npm run dev
 
This will start the server at http://localhost:5174.

**Environment Variables**

**Frontend**
  
    VITE_NODE_ENV         # local/development/production
    
    VITE_BE_URL           # server/backend URL

**Backend**

    PORT = 5174
    
    CLIENT_URL             # Frontend URL
    
    NODE_ENV               # local/development/production
    
    OPENWEATHER_API_KEY    # your openweather API key

**Important Considerations**

_API Limitations_: The OpenWeather API has a rate limit (e.g., 60 requests per minute for the free tier). Make sure
	                to manage your requests to avoid hitting this limit.

_CORS Configuration_: The backend should properly handle CORS to allow requests from the frontend (Vite dev server).

**Conclusion**

This is a full-stack Weather App that integrates React, TypeScript, Tailwind CSS, Node.js, Express, and the
OpenWeather API. It provides a responsive search feature, fetching weather data based on user input and
geolocation, while optimizing performance with debounced suggestions and a clean UX.

Feel free to extend the app with additional features like weather forecasts, more detailed information, or user
authentication for saving favorite locations!
