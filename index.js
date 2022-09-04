var count = 0
var gizmoPos
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const counter = document.getElementById("counterText")
const meow = new Audio('https://cdn.freesound.org/previews/436/436541_1196472-lq.mp3');

const setCanvasDimToFull = (canvas) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
  
const placeGizmo = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#3B342F"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const img = new Image()
    img.src = "gizmo.png"
    img.onload = function () {
        const w = img.width * 0.5
        const h = img.height * 0.5
        const posX = (canvas.width-w) * Math.random()
        const posY = (canvas.height-img.height) * Math.random()
        ctx.drawImage(img, posX, posY, w, h)
        gizmoPos = { x: posX, y: posY, w, h }
    }
}

const isGizmoFound = (gizmoPos, pointerPos) => {
    const withinX = gizmoPos.x <= pointerPos.x && pointerPos.x <= (gizmoPos.x + gizmoPos.w)
    const withinY = gizmoPos.y <= pointerPos.y && pointerPos.y <= (gizmoPos.y + gizmoPos.h)
    return withinX && withinY
}

window.onload = (event) => {
    setCanvasDimToFull(canvas)
    placeGizmo()
};

// meow.addEventListener("canplaythrough", (event) => {
//     /* the audio is now playable; play it if permissions allow */
//     meow.play();
//   });

document.addEventListener('pointermove', pos => {
    let xPercent = parseInt(pos.clientX / window.innerWidth * 100)
    let yPercent = parseInt(pos.clientY / window.innerHeight * 100)
    mask.style.setProperty('--torch-color', 'transparent')
    mask.style.setProperty('--pointer-x-percent', xPercent + '%')
    mask.style.setProperty('--pointer-y-percent', yPercent + '%')

    // setTimeout(() => {
    //     mask.style.setProperty('--torch-color', 'black')
    // }, 100);
})

document.addEventListener('pointerdown', pos => {
    const x = pos.clientX
    const y = pos.clientY
    let xPercent = parseInt(x / window.innerWidth * 100)
    let yPercent = parseInt(y / window.innerHeight * 100)
    mask.style.setProperty('--torch-color', 'transparent')
    mask.style.setProperty('--pointer-x-percent', xPercent + '%')
    mask.style.setProperty('--pointer-y-percent', yPercent + '%')

    if (isGizmoFound(gizmoPos, {x, y})) {
        count++
        counter.innerText = count
        meow.play()
        placeGizmo()
    }
    // setTimeout(() => {
    //     mask.style.setProperty('--torch-color', 'black')
    // }, 100);
})