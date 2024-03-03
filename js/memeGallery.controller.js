'use strict'

function renderGallery() {
    var imgCount = 18
    var HTMLstr = ''

    for (var i = 1; i <= imgCount; i++) {
        HTMLstr += `<img src="img/${i}.jpg" alt="image" onclick="onChosenImg(${i})" class="img img${i}"/>`
    }

    const elGallery = document.querySelector('.imgs-container')
    elGallery.innerHTML = HTMLstr
}

function renderSaved() {
    const savedMemes = onLoad()
    var HTMLstr = ''

    savedMemes.forEach((meme, idx) => {    
    HTMLstr += `
    <div class="img-container">
        <img src="${meme.imgURL}" alt="image" onclick="onChosenMeme(${idx})" class="img"/>
        <button onclick="onDeleteSavedMeme(${idx})" class="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
    </div>
`
    })

    const elGallery = document.querySelector('.imgs-container')
    elGallery.innerHTML = HTMLstr
}

function onDeleteSavedMeme(idx) {
    const savedMemes = onLoad()
    savedMemes.splice(idx, 1)
    saveToStorage('canvas', savedMemes)
    renderSaved()
}

function onSave() {
    const savedMemes = loadFromStorage('canvas') || []
    savedMemes.push(gMeme)
    saveToStorage('canvas', savedMemes)
}

function onLoad() {
    const savedMemes = loadFromStorage('canvas')
    return savedMemes || []
}