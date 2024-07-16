import { useEffect, useState } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe/index";
import { pointOfView } from "./utils/globe/systems/utils";
import ThreeGlobe from "three-globe";

function App() {
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    const sceneContainer = document.querySelector("#scene-container");
    if (sceneContainer) {
      const initializedWorld = new World(sceneContainer, undefined, globeConfig);
      initializedWorld.start();
      setWorld(initializedWorld);
    }
  }, []);

  const moveToCountry = (country: string) => {
    const positions: { [key: string]: { lat: number; lng: number; altitude: number } } = {
      'usa': { lat: 38.9072, lng: -77.0369, altitude: 300 },
      'australia': { lat: -25.2744, lng: 133.7751, altitude: 300 },
      'china': { lat: 35.8617, lng: 104.1954, altitude: 300 },
    };

    const position = positions[country];
    if (world && position) {
      const threeGlobe = world.globe as unknown as ThreeGlobe;
      pointOfView(world.camera, world.controls, threeGlobe, position, 1000);
    } else {
      console.log(`Country code ${country} not recognized or world not initialized.`);
    }
  };

  return (
    <>
      <div id="scene-container" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}></div>
      <div style={{ position: "absolute", top: "20px", left: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => moveToCountry('usa')} style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>USA</button>
        <button onClick={() => moveToCountry('australia')} style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>Australia</button>
        <button onClick={() => moveToCountry('china')} style={{ backgroundColor: "lightblue", padding: "10px", fontSize: "16px" }}>China</button>
      </div>
    </>
  );
}

export default App;