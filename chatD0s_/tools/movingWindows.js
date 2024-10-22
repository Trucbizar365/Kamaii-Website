var offsetX, offsetY;
var movingElement;
var stylesMain = window.getComputedStyle(main);
var stylesMovingElement;

function setupDrag(name) {
    dragElement = document.getElementById(`${name.id}`);
    return dragElement;
}

function startDrag(event, name) {
    setupDrag(name);
    movingElement = name.parentNode.parentNode;
    offsetX = event.clientX - movingElement.offsetLeft;
    offsetY = event.clientY - movingElement.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    displayBefore(movingElement);
    stylesMovingElement = window.getComputedStyle(movingElement);
}

function drag(event) {
    var newLeft = event.clientX - offsetX;
    var newTop = event.clientY - offsetY;

    movingElement.style.width = (parseFloat(stylesMain.getPropertyValue("width")) / 1.6) + "px";
    movingElement.style.height = (parseFloat(stylesMain.getPropertyValue("height")) / 1.6) + "px";

    if (newLeft < main.offsetLeft) {
        newLeft = main.offsetLeft;
    }
    if (newTop < main.offsetTop) {
        newTop = main.offsetTop;
    }
    if (newLeft > (main.offsetLeft + parseFloat(stylesMain.getPropertyValue("width"))) - parseFloat(stylesMovingElement.getPropertyValue("width"))) {
        newLeft = main.offsetLeft + parseFloat(stylesMain.getPropertyValue("width")) - parseFloat(stylesMovingElement.getPropertyValue("width"));
    }
    if (newTop > (main.offsetTop + parseFloat(stylesMain.getPropertyValue("height"))) - parseFloat(stylesMovingElement.getPropertyValue("height"))) {
        newTop = main.offsetTop + parseFloat(stylesMain.getPropertyValue("height")) - parseFloat(stylesMovingElement.getPropertyValue("height"));
    }
    console.log( stylesMovingElement.getPropertyValue("width") );
    movingElement.style.left = newLeft + 'px';
    movingElement.style.top = newTop + 'px';
}

function stopDrag(event) {
    var newLeft = event.clientX - offsetX;
    var newTop = event.clientY - offsetY;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    if (newLeft < main.offsetLeft) {
        movingElement.style.width = (parseFloat(stylesMain.getPropertyValue("width")) / 2) + "px";
        movingElement.style.height = parseFloat(stylesMain.getPropertyValue("height")) + "px";
        movingElement.style.left = main.offsetLeft + 'px';
        movingElement.style.top = main.offsetTop + 'px';
    } else if (newTop < main.offsetTop) {
        fullWindow();
    } else if (newLeft > (main.offsetLeft + parseFloat(stylesMain.getPropertyValue("width"))) - parseFloat(stylesMovingElement.getPropertyValue("width"))) {
        movingElement.style.width = parseFloat(stylesMain.getPropertyValue("width")) / 2 + "px";
        movingElement.style.height = parseFloat(stylesMain.getPropertyValue("height")) + "px";
        movingElement.style.left = main.offsetLeft + parseFloat(stylesMain.getPropertyValue("width")) - parseFloat(stylesMovingElement.getPropertyValue("width")) + "px";
        movingElement.style.top = main.offsetTop + 'px';
    }
}

function fullWindow(){
    movingElement.style.width = parseFloat(stylesMain.getPropertyValue("width")) + "px";
    movingElement.style.height = parseFloat(stylesMain.getPropertyValue("height")) + "px";
    movingElement.style.left = main.offsetLeft + 'px';
    movingElement.style.top = main.offsetTop + 'px';
}