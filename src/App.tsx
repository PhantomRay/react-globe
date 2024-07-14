import { useEffect } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe/index";

function App() {

  useEffect(() => {
    const container = document.querySelector("#scene-container");
    let idleTimer: ReturnType<typeof setTimeout>; // Correctly type the idleTimer
    if (container) {
      const world = new World(container, undefined, globeConfig);
      world.start(); // Start the globe to initialize it, then stop it to make it not spin initially.
      world.stop(); // Stop the globe from spinning initially.
  
      const resetIdleTimer = () => {
        clearTimeout(idleTimer); // Clear the existing timer without casting
        world.stop(); // Stop the globe from spinning when user activity is detected
        idleTimer = setTimeout(() => world.start(), 10000); // Start spinning after 10 seconds of idle time
      };
  
      // Initialize the idle timer
      resetIdleTimer();
  
      // Event listeners to detect user activity
      document.addEventListener("mousemove", resetIdleTimer);
      document.addEventListener("keypress", resetIdleTimer);
  
      // Clean up
      return () => {
        clearTimeout(idleTimer);
        document.removeEventListener("mousemove", resetIdleTimer);
        document.removeEventListener("keypress", resetIdleTimer);
      };
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector("#scene-container");
    if (container) {
      const world = new World(container, undefined, globeConfig);
      world.start();
  
      // Function to move the camera to the specified country
      const moveToCountry = (country: string) => {
        // Convert country codes to the expected country names
        let countryName;
        switch (country) {
          case 'usa':
            countryName = 'USA';
            break;
          case 'australia':
            countryName = 'Australia';
            break;
          case 'china':
            countryName = 'China';
            break;
          default:
            console.log(`Country code ${country} not recognized.`);
            return;
        }
  
        world.navigateToCountry(countryName);
      };
  
      // Define the positions for each country
      // const positions = {
      //   'usa': { lat: 38.9072, lng: -77.0369, altitude: 300 },
      //   'australia': { lat: -25.2744, lng: 133.7751, altitude: 300 },
      //   'china': { lat: 35.8617, lng: 104.1954, altitude: 300 },
      // };
  
      // Event handlers for buttons
      const handleUsaClick = () => moveToCountry('usa');
      const handleAustraliaClick = () => moveToCountry('australia');
      const handleChinaClick = () => moveToCountry('china');
  
      // Add event listeners to buttons
      const usaBtn = document.getElementById('usa-btn');
      const australiaBtn = document.getElementById('australia-btn');
      const chinaBtn = document.getElementById('china-btn');
  
      if (usaBtn) usaBtn.addEventListener('click', handleUsaClick);
      if (australiaBtn) australiaBtn.addEventListener('click', handleAustraliaClick);
      if (chinaBtn) chinaBtn.addEventListener('click', handleChinaClick);
  
      // Clean up
      return () => {
        if (usaBtn) usaBtn.removeEventListener('click', handleUsaClick);
        if (australiaBtn) australiaBtn.removeEventListener('click', handleAustraliaClick);
        if (chinaBtn) chinaBtn.removeEventListener('click', handleChinaClick);
      };
    }
  }, []);

  return (
    <>
      <div
        id="scene-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button id="usa-btn" style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>USA</button>
        <button id="australia-btn" style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>Australia</button>
        <button id="china-btn" style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>China</button>
      </div>
    </>
  );
}

export default App;