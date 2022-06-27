import "./style.css"

import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper  = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
// renderer.render(scene, camera)

// we dont wnna call render method over and over again
// better approach will be to setup a recursive func that gives us an infine loop
// that calls the render method automatically


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}


Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load("space.jpg")
scene.background = spaceTexture

const shahidTexture = new THREE.TextureLoader().load("mypic.jpg")

const shahid = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: shahidTexture })
)


scene.add(shahid)

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg")
const normalTexture = new THREE.TextureLoader().load("normal.jpg")
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: moonTexture ,
    normalMap: normalTexture
  })
)


scene.add(moon)



function animate() {
  requestAnimationFrame(animate) // to tell the browser that we wanna perform animation
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()
  // whenever browser repants the screen it will call render method to update the UI,Game loop
  renderer.render(scene, camera)

}

animate()