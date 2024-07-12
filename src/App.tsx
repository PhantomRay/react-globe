import { useEffect } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe/index";

function App() {

  // useEffect(() => {
  //   const container = document.querySelector("#scene-container");
  //   let idleTimer;

  //   if (container) {
  //     const world = new World(container, undefined, globeConfig);
  //     world.start();

  //     const resetIdleTimer = () => {
  //       clearTimeout(idleTimer);
  //       world.stopSpinning(); // Stop spinning when the user is active
  //       idleTimer = setTimeout(() => world.startSpinning(), 10000); // Start spinning after 10 seconds of idle time
  //     };

  //     // Initialize the idle timer
  //     resetIdleTimer();

  //     // Event listeners to detect user activity
  //     document.addEventListener("mousemove", resetIdleTimer);
  //     document.addEventListener("keypress", resetIdleTimer);

  //     // Clean up
  //     return () => {
  //       clearTimeout(idleTimer);
  //       document.removeEventListener("mousemove", resetIdleTimer);
  //       document.removeEventListener("keypress", resetIdleTimer);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    const container = document.querySelector("#scene-container");
    if (container) {
      const world = new World(container, undefined, globeConfig);
      world.start();
  
      // Safely add event listeners for buttons
      const usaBtn = document.getElementById("usa-btn");
      const australiaBtn = document.getElementById("australia-btn");
      const chinaBtn = document.getElementById("china-btn");
  
      usaBtn?.addEventListener("click", () => world.navigateToCountry("USA"));
      australiaBtn?.addEventListener("click", () => world.navigateToCountry("Australia"));
      chinaBtn?.addEventListener("click", () => world.navigateToCountry("China"));
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