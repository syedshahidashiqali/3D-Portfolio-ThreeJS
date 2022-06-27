import "./style.css"

import * as THREE from "three"

const scene = new THREE.scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000)

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

renderer.render(scene, camera)