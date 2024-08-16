import { useEffect } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe";
import { Background } from "./components/Background";
import { Processed } from "./components/Processed";
import { Blcoked } from "./components/Blocked";
import { Whitelist } from "./components/Whitelist";
import { Bot } from "./components/Bot";
import { Requests } from "./components/Requests";

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
      <div className="left-panel">
        <h1>
          Bot Traffic Analysis
        </h1>
        <div
          id="scene-container"
        ></div>
        <div className="console-container">
          <Requests />
        </div>
      </div>
      <div className="info-container">
        <div
          className="stats-container">
          <Blcoked /> <Processed /> <Whitelist />
        </div>
        <div className="bots-container">
          <Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot /><Bot />

        </div>
      </div>
    </div >
  );
}

export default App;
