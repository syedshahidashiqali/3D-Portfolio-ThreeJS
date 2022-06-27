import "./style.css"

import * as THREE from "three"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight) // full screen

camera.position.setZ(30)

renderer.render(scene, camera) // draw

const geometry = new THREE.TorusGeometry(10, 3, 16, 100) // just like a big 3d ring
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// renderer.render(scene, camera)

// we dont wnna call render method over and over again
// better approach will be to setup a recursive func that gives us an infine loop
// that calls the render method automatically

function animate() {
  requestAnimationFrame(animate) // to tell the browser that we wanna perform animation
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  // whenever browser repants the screen it will call render method to update the UI,Game loop
  renderer.render(scene, camera)

}

animate()