import { PerspectiveCamera } from "three";
// eslint-disable-next-line
import { cameraZ } from "./config";
import { Orbit } from "./Orbit";
// eslint-disable-next-line
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Corrected import for OrbitControls


interface CreateControlsProps {
  camera: PerspectiveCamera;
  canvas: HTMLCanvasElement;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

function createControls({
  camera,
  canvas,
  autoRotate = true,
  autoRotateSpeed = 0.5,
}: CreateControlsProps) {
  const controls = new Orbit(camera, canvas);

  controls.enablePan = false;
  controls.enableZoom = true; // Enable zoom
  controls.minDistance = 285; // Set minimum zoom distance
  controls.maxDistance = 400; // Set maximum zoom distance
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.autoRotate = autoRotate;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;

  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  // Set the camera to the max distance
  // Assuming the target is at the origin (0, 0, 0)
  camera.position.set(0, 0, controls.maxDistance);

  return controls;
}

export { createControls };
