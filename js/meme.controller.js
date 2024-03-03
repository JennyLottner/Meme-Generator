'use strict'

function onInit() {
    renderGallery()
    loadFonts()
}

function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    loadImg(renderText)
    resizeCanvasContainer()
    // addListeners()
}
///////////////////////////////////////////////////////
function onChosenImg(imgId) {
    toggleGalleryEditor('E')
    setImg(imgId)
    renderEditorBtns()
    renderMeme()
}

function onChosenMeme(idx) {
    const meme = onLoad()[idx]
    toggleGalleryEditor('E')
    setMeme(meme)
    renderEditorBtns()
    renderMeme()
}

function onImgUpload(ev) {
    const file = ev.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function (event) {
            const imageUrl = event.target.result
            setUploadedImg(imageUrl)
            toggleGalleryEditor('E')
            renderEditorBtns()
            renderMeme()
        }
        reader.readAsDataURL(file)
    } else {
        console.error('No file selected.');
    }
}
//////////////////////////////////////////////////////
function toggleMenu() {
    const elBurger = document.querySelector('.hamburger')
    const elHeaderBtns = document.querySelector('.header_btns')

    elBurger.classList.toggle('active')
    elHeaderBtns.classList.toggle('active')
}

function onGallery() {
    toggleGalleryEditor('G')
    renderGallery()
    clearGMeme()

    const elBurger = document.querySelector('.hamburger')
    if (elBurger.classList.contains('active')) toggleMenu()
}

function toggleGalleryEditor(to) {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.editor')

    if (to === 'E') {
        document.addEventListener('keydown', onMoveLine)

        elGallery.style.display = 'none'
        elEditor.style.display = 'block'
    } else {
        document.removeEventListener('keydown', onMoveLine)

        elGallery.style.display = 'block'
        elEditor.style.display = 'none'
    }
}

function onAbout() {
    console.log(`What's this about?`)
}