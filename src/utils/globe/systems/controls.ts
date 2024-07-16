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
  autoRotate = false, // Changed to false to disable auto-rotate initially
  autoRotateSpeed = 0.5,
}: CreateControlsProps) {
  const controls = new Orbit(camera, canvas);

  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 285;
  controls.maxDistance = 400;
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.autoRotate = autoRotate;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;

  controls.tick = () => controls.update();

  camera.position.set(0, 0, controls.maxDistance);

  return controls;
}

export { createControls };
