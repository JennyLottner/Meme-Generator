'use strict'
var gMeme = {
    imgURL: '',
    selectedLineIdx: 0,
    lines: [_createLine()]
}
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'animal'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'animal', 'baby'] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'baby'] },
{ id: 5, url: 'img/5.jpg', keywords: ['movie', 'cheers'] },
{ id: 6, url: 'img/6.jpg', keywords: [] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
{ id: 8, url: 'img/8.jpg', keywords: ['chocolate', 'waiting'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
{ id: 10, url: 'img/10.jpg', keywords: ['politician', 'smile'] },
{ id: 11, url: 'img/11.jpg', keywords: ['kiss'] },
{ id: 12, url: 'img/12.jpg', keywords: ['you'] },
{ id: 13, url: 'img/13.jpg', keywords: ['movie', 'toys'] },
{ id: 14, url: 'img/14.jpg', keywords: [] },
{ id: 15, url: 'img/15.jpg', keywords: ['ok', 'movie'] },
{ id: 16, url: 'img/16.jpg', keywords: ['star trek'] },
{ id: 17, url: 'img/17.jpg', keywords: ['politician'] },
{ id: 18, url: 'img/18.jpg', keywords: ['politician'] }
]
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function clearGMeme() {
    gMeme = {
        imgURL: '',
        selectedLineIdx: 0,
        lines: [_createLine()]
    }
}

function setImg(imgId) {
    gMeme.imgURL = `img/${imgId}.jpg`
}

function setUploadedImg(URL) {
    gMeme.imgURL = URL
}

function setMeme(meme) {
    gMeme = meme
}

function changeLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val
}

function switchLines() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function moveLine(eventKeyboard) {
    switch (eventKeyboard) {
        case 'ArrowUp':
            gMeme.lines[gMeme.selectedLineIdx].pos.y--
            break;
        case 'ArrowDown':
            gMeme.lines[gMeme.selectedLineIdx].pos.y++
            break;
        case 'ArrowRight':
            gMeme.lines[gMeme.selectedLineIdx].pos.x++
            break;
        case 'ArrowLeft':
            gMeme.lines[gMeme.selectedLineIdx].pos.x--
            break;
    }
}

function setNewLine() {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push(_createLine())
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx + 1 >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    if (gMeme.lines.length === 0) gMeme.lines = [{
        txt: '',
        size: 20,
        alignment: 'center',
        font: 'Arial',
        underline: false,
        color: '#000000',
        pos: { x: 175, y: 100 },
        isDrag: false
    }]
}

function setFontSize(val) {
    if (val === '-') gMeme.lines[gMeme.selectedLineIdx].size--
    if (val === '+') gMeme.lines[gMeme.selectedLineIdx].size++
}

function setAlignment(val) {
    const lineWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width

    if (val === 'left') gMeme.lines[gMeme.selectedLineIdx].pos.x = 0
    if (val === 'right') gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - lineWidth
    if (val === 'center') gMeme.lines[gMeme.selectedLineIdx].pos.x = (gElCanvas.width / 2) - (lineWidth / 2)
}

function setFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val


}

function setUnderline() {
    gMeme.lines[gMeme.selectedLineIdx].underline = !gMeme.lines[gMeme.selectedLineIdx].underline
}

function setStrokeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = val
}

function setFillColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = val
}

function _createLine() {
    return {
        txt: '',
        size: 20,
        font: 'Arial',
        underline: false,
        strokeColor: '#000000',
        fillColor: '#000000',
        pos: { x: 175, y: 100 },
        isDrag: false
    }
}

/////////////////////////////////////////////
function getMeme() {
    return gMeme
}

function getMemeLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getImg() {
    return gMeme.imgURL
}

function loadFonts() {
    new FontFace('Poppins', 'url(/fonts/Poppins/Poppins-Regular.ttf)').load()
    new FontFace('Bubble', 'url(/fonts/Bubble/Bubble.ttf)').load()
    new FontFace('SmallTop', 'url(/fonts/SmallTop/SmallTop.ttf)').load()
    new FontFace('HandWriting', 'url(/fonts/HandWriting/HandWriting.ttf)').load()
    new FontFace('BubbleOutline', 'url(/fonts/BubbleDemo/BubbleDemoOutline.ttf)').load()
    new FontFace('BubbleRegular', 'url(/fonts/BubbleDemo/BubbleDemoRegular.ttf)').load()
}
////////////////////////////////////////////////////
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function moveItem(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function isItemClicked(clickedPos) {
    var lineClicked = false
    gMeme.lines.forEach((line, idx) => {
        const measuredLine = gCtx.measureText(line.txt)
        const lineHeight = measuredLine.actualBoundingBoxAscent + measuredLine.actualBoundingBoxDescent

        const distanceX = clickedPos.x >= line.pos.x && clickedPos.x <= (measuredLine.width + line.pos.x)
        const distanceY = clickedPos.y <= line.pos.y && clickedPos.y >= (line.pos.y - lineHeight)

        if (distanceX && distanceY) {
            gMeme.selectedLineIdx = idx
            lineClicked = true
            return
        }
    })
    return lineClicked
}

function itemDragSetOrGet(val) {
    if (val === undefined) return gMeme.lines[gMeme.selectedLineIdx].isDrag
    gMeme.lines[gMeme.selectedLineIdx].isDrag = val
}