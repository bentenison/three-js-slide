import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
//Loaders

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap-4.png");
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.7, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.7;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 3);
// pointLight2.position.x = 2;
// pointLight2.position.y = 3;
// pointLight2.position.z = 4;
pointLight2.position.set(-2.24, 1.33, -1.58);
scene.add(pointLight2);
const lightOne = gui.addFolder("Light 1")
lightOne.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
lightOne.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
lightOne.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
lightOne.add(pointLight2, "intensity").min(0).max(10).step(0.01);
const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
//scene.add(pointLightHelper);


const pointLight3 = new THREE.PointLight(0x1eff, 4);
// pointLight3.position.x = 2;
// pointLight3.position.y = 3;
// pointLight3.position.z = 4;
pointLight3.position.set(2.79, 1.39, -0.99);
scene.add(pointLight3);
const lightTwo = gui.addFolder("Light 2")

lightTwo.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
lightTwo.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
lightTwo.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
lightTwo.add(pointLight3, "intensity").min(0).max(10).step(0.01);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
const light2Color = {
    color:0xff0000
}
lightTwo.addColor(light2Color,"color").onChange(()=>{
    pointLight3.color.set(light2Color.color)
})
//scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
