'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function loadImg(callback) {
    const img = new Image()
    img.src = getImg()
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        
        callback()
    }
}

function resizeCanvasContainer() {
    const elContainer = document.querySelector('.canvas-inner-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

// // EVENTS
// function addListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)

//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)

//     window.addEventListener('resize', () => {  //for resizing
//         resizeCanvasContainer()
//         renderMeme()
//     })
// }

// function getEvPos(ev) {
//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }
//     if (TOUCH_EVENTS.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
// }

// // DRAG & DROP
// function onDown(ev) {
//     gStartPos = getEvPos(ev)
//     if (!isItemClicked(gStartPos)) return

//     itemDragSetOrGet(true)
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     if (!itemDragSetOrGet()) return

//     const pos = getEvPos(ev)
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     gStartPos = pos

//     moveItem(dx, dy)
//     renderMeme()
// }

// function onUp() {
//     itemDragSetOrGet(false)
//     document.body.style.cursor = 'grab'
// }


// // Down&Up-Load
function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onFacebookShare() {
    renderMeme(false)
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}