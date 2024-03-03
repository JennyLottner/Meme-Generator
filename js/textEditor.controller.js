'use strict'
let gPrintable

function renderText() {
    const { lines , selectedLineIdx } = getMeme()
    lines.forEach((line, idx ) => {
        gCtx.font = `${line.size}px ${line.font}, sans-serif`
        gCtx.textBaseline = 'bottom'
        
        gCtx.fillStyle = line.fillColor
        gCtx.strokeStyle = line.strokeColor
        const x = line.pos.x
        const y = line.pos.y

        gCtx.strokeText(line.txt, x, y)
        gCtx.fillText(line.txt, x, y)

        if (line.underline) {
            drawUnderline(line)
        }

        if (idx === selectedLineIdx) {
        const measuredLine = gCtx.measureText(line.txt);
        const lineHeight = measuredLine.actualBoundingBoxAscent + measuredLine.actualBoundingBoxDescent
        gCtx.beginPath()
        gCtx.strokeStyle = "black"
        gCtx.setLineDash([5, 5])
        gCtx.strokeRect(x - 2, y + 2, measuredLine.width + 4 , -lineHeight - 4)
        gCtx.closePath()
        }
    })
}

function onMoveLine(ev) {
    moveLine(ev.key)
    renderMeme()
}

function onChangeLine(elInput) {
    changeLine(elInput.value)
    renderMeme()
}

function onSwitchLines() {
    switchLines()
    renderEditorBtns()
    renderMeme()
}

function onAddLineTxt() {
    setNewLine()
    renderEditorBtns()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderEditorBtns()
    renderMeme()
}

function onFontSize(val) {
    setFontSize(val)
    renderMeme()
}

function onAlignment(val) {
    setAlignment(val)
    renderMeme()
}

function onFont(elInput) {
    setFont(elInput.value)
    renderMeme()
}

function onUnderline() {
    setUnderline()
    renderMeme()
}

function drawUnderline(line) {
    const x = line.pos.x
    const y = line.pos.y
    const lineWidth = gCtx.measureText(line.txt).width

    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + lineWidth, y)
    gCtx.strokeStyle = line.color
    gCtx.stroke()
    gCtx.closePath()
}

function onStrokeColor(elInput) {
    setStrokeColor(elInput.value)

    const elBtn = document.querySelector('.stroke-color-btn')
    elBtn.style.color = getMemeLine().strokeColor

    renderMeme()
}

function onFillColor(elInput) {
    setFillColor(elInput.value)

    const elFillBtn = document.querySelector('.fill-color-btn')
    elFillBtn.style.color = getMemeLine().fillColor

    renderMeme()
}

function renderEditorBtns() {
    const elEditor = document.querySelector('.actions-container')
    const elLine = elEditor.querySelector('.text-input')
    const elFont = elEditor.querySelector('.font-btn')

    const elColor = elEditor.querySelector('.stroke-color-input')
    const elColorBtn = elEditor.querySelector('.stroke-color-btn')
    const elFill = elEditor.querySelector('.fill-color-input')
    const elFillBtn = elEditor.querySelector('.fill-color-btn')

    const line = getMemeLine()

    elLine.placeholder = line.txt || 'Type here'
    elLine.value = line.txt
    elColor.value = line.strokeColor
    elColorBtn.style.color = line.strokeColor
    elFill.value = line.fillColor
    elFillBtn.style.color = line.fillColor

    const fontOptions = elFont.querySelectorAll('option');
    fontOptions.forEach(option => {
        if (option.value === line.font) {
            option.selected = true;
        } else {
            option.selected = false
        }
    })
}