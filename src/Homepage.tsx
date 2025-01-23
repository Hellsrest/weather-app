import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function WeatherMap() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch weather data based on lat and lng
  const fetchWeather = async (lat: string, lng: string) => {
    try {
      const response = await fetch(`http://localhost:5000/?lat=${lat}&lng=${lng}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setWeatherData(data); // Store fetched weather data
        setIsVisible(true); // Show the sliding division
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle map click event
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    fetchWeather(lat.toString(), lng.toString());
  };

  // Initialize the map on component load
  useEffect(() => {
    // Default map view
    const defaultView = [51.505, -0.09];
    const map = L.map("map").setView(defaultView as L.LatLngExpression, 13);
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.on("click", handleMapClick);

    // Get the user's current location and update map if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update map view to user's location
          map.setView([latitude, longitude], 13);
          
          // Fetch weather data for user's location
          fetchWeather(latitude.toString(), longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Map Container */}
      <div id="map" style={{ height: "100vh", width: "75%" }}></div>

      {/* Sliding Division */}
      <div
        className={`sliding-div ${isVisible ? "visible" : ""}`}
        onClick={() => setIsVisible(false)} // Close the division on click
      >
        {weatherData ? (
          <div>
            <h2>Weather Information</h2>
            <b>Location: {weatherData.name}</b>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherMap;