import { useEffect } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe";
import { Background } from "./components/Background";
import { Processed } from "./components/Processed";
import { Blcoked } from "./components/Blocked";
import { Whitelist } from "./components/Whitelist";
import { Bot } from "./components/Bot";

function App() {
  useEffect(() => {
    if (!document.getElementById("globe-canvas")) {
      const container = document.querySelector("#scene-container");
      const world = new World(container as Element, undefined, globeConfig);
      world.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Background />
      <div className="globe-container"
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 999,
        }}
      >
        <h1
          style={{
            color: "#cccccc",
            fontSize: "2rem",
            textAlign: "center",
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Bot Traffic Analysis
        </h1>
        <div
          id="scene-container"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 999,
          }}
        ></div></div>
      <div className="info-container"
        style={{
          width: "60%",
          height: "100%",
          padding: "50px",
          display: "flex",
          alignItems: "flex-start", // Align items to the top
          justifyContent: "center",
          zIndex: 999,
        }}
      >    <div className="info-container">
          <div
            className="stats-container">
            <Blcoked /> <Processed /> <Whitelist />
          </div>
          <div className="bots-container"
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Bot /><Bot /><Bot /><Bot /><Bot /><Bot />
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
