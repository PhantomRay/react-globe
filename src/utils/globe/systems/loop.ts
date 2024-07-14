import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Globe as threeGlobe } from "./Globe";
import { Orbit } from "./Orbit";

// src/utils/globe/systems/loop.ts

class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: [Orbit, threeGlobe];

  clock: Clock;
  shouldRotate: boolean;
  inactivityTimer: ReturnType<typeof setTimeout> | null;

  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [] as unknown as [Orbit, threeGlobe];

    this.clock = new Clock();
    this.shouldRotate = true; // Add this line
    this.inactivityTimer = null; // Add this line

    // Initialize event listeners for mouse movement
    this.initMouseListeners();
  }

  initMouseListeners() {
    window.addEventListener('mousemove', () => {
      this.shouldRotate = false;
      this.resetInactivityTimer();
    });
  }

  resetInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.inactivityTimer = setTimeout(() => {
      this.shouldRotate = true;
    }, 5000); // Change from 10000 to 5000
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Only rotate if shouldRotate is true
      if (this.shouldRotate) {
        this.tick();
      }

      // Render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  // Ensure to clear the timer when stopping the loop
  stop() {
    this.renderer.setAnimationLoop(null);
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }

  tick() {
    const delta = this.clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
