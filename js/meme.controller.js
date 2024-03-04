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
    addListeners()
}
///////////////////////////////////////////////////////
function onChosenImg(imgId) {
    toggleGalleryEditorAbout('E')
    setImg(imgId)
    renderEditorBtns()
    renderMeme()
}

function onChosenMeme(idx) {
    const meme = onLoad()[idx]
    toggleGalleryEditorAbout('E')
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
            toggleGalleryEditorAbout('E')
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
    toggleGalleryEditorAbout('G')
    renderGallery()
    clearGMeme()

    const elBurger = document.querySelector('.hamburger')
    if (elBurger.classList.contains('active')) toggleMenu()
}

function toggleGalleryEditorAbout(to) {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.editor')
    const elAbout = document.querySelector('.about')

    switch (to) {
    case 'E':
        document.addEventListener('keydown', onMoveLine)

        elGallery.style.display = 'none'
        elEditor.style.display = 'block'
        elAbout.style.display = 'none'
        break
    case 'G':
        document.removeEventListener('keydown', onMoveLine)

        elGallery.style.display = 'block'
        elEditor.style.display = 'none'
        elAbout.style.display = 'none'
        break

    case 'A':
        document.removeEventListener('keydown', onMoveLine)

        elGallery.style.display = 'none'
        elEditor.style.display = 'none'
        elAbout.style.display = 'block'
        break
    }
}

function onAbout() {
    toggleGalleryEditorAbout('A')
}