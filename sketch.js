const r = require('raylib');

const WIDTH = 701;
const HEIGHT = 400;

let scannerX = 0;
let scannerColor = r.WHITE;
const scannerWidth = 80;

let isEdgeReached = false;

const particleStart = 150;
const particleWidth = 50;

const FPS = 60;

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanner() {
    const scannerSpeed = 1;

    scannerX += (!isEdgeReached) ? scannerSpeed : -scannerSpeed;

    const isEndOfWindow = (scannerX + scannerWidth >= WIDTH);
    const isStartOfWindow = (scannerX <= 0);

    if ((isEndOfWindow || isStartOfWindow)) isEdgeReached = !isEdgeReached;
}

function drawParticleField(start, width) {
    const particleFieldY = 0;
    r.DrawRectangle(start, particleFieldY, width, HEIGHT, r.SKYBLUE)
}

function handleOverlap(RangeOneX, RangeOneY, RangeTwoX, RangeTwoY) {
    const isOverlappingParticle = ((RangeOneX <= RangeTwoY) && (RangeTwoX <= RangeOneY))
    scannerColor = isOverlappingParticle ? r.RED : r.WHITE;

}

function draw() {
    const scannerY = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleField(particleStart, particleWidth);

    r.DrawRectangle(scannerX, scannerY, scannerWidth, HEIGHT, scannerColor);

    r.EndDrawing();
}

function update() {
    handleOverlap(particleStart, (particleStart + particleWidth), scannerX, (scannerX + scannerWidth));
    moveScanner();
}

function tearDown() {
    return r.CloseWindow();
}

module.exports = {
    setup,
    running,
    draw,
    update,
    tearDown,
}           