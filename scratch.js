var canvas = document.getElementById('scratch-layer');
var ctx = canvas.getContext('2d');
var ticket = document.getElementById('ticket');


const base_image = new Image();
base_image.src = 'front.jpg';
base_image.onload = () => {
    ctx.drawImage(base_image, 0, 0);
    ticket.classList.remove('hidden');
};

// Variables for drawing
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var scratchWidth = 15;

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    var pos = getMousePos(canvas, e);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    var pos = getMousePos(canvas, e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = scratchWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;

    particleSpray(
        e.clientX,
        e.clientY
    );
});

canvas.addEventListener('mouseup', (_) => isDrawing = false);

// For touch devices
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    isDrawing = true;
    var pos = getMousePos(canvas, e.touches[0]);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    var pos = getMousePos(canvas, e.touches[0]);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = scratchWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;

    particleSpray(
        e.touches[0].clientX,
        e.touches[0].clientY
    );
});

canvas.addEventListener('touchend', (_) => isDrawing = false);

const relSize = 10;

const particleSpray = (x,y) => {
    var elem = document.createElement('div');
    var size = Math.ceil(Math.random() * relSize) + 'px';
    elem.style.position = 'fixed';
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
    elem.style.width = size;
    elem.style.height = size;
    elem.style.borderRadius = size;
    elem.style.animation = "fallingsparkles 1s";
    elem.style.background = `hsla(250, 100%, ${Math.round(Math.random()*100)}%, 0.5)`;
    elem.style.pointerEvents = 'none';
    document.body.appendChild(elem);
    
    window.setTimeout(function () {
        document.body.removeChild(elem);
    }, Math.round(Math.random() * 1000));
}