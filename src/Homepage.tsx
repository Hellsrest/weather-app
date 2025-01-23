import { useEffect } from "react";
import L from "leaflet";

function Homepage() {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Add the tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    //to get latitude and longitud
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      console.log("latitude:" + lat + "Longitude" + lng);
      fetchweather(lat.toString(), lng.toString());
    });

    const fetchweather = async (lat: string, lng: string) => {
      const response = await fetch(
        `http://localhost:5000/?lat=${lat}&lng=${lng}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Data not fetched");
      }
    };

    return () => {
      // Cleanup: Remove the map instance when the component unmounts
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100vw" }}></div>;
}

export default Homepage;
