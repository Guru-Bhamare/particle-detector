const r = require('raylib');

const WIDTH = 701;
const HEIGHT = 400;

let ScannerX = 0;
const ScannerWidth = 40;

let isEdgeReached = false;

const FPS = 60;

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanner() {
    const scannerSpeed = 3;
    isEdgeReached === false ? ScannerX += scannerSpeed : ScannerX -= scannerSpeed;

    const isEndOfWindow = (ScannerX + ScannerWidth >= WIDTH);
    const isStartOfWindow = (ScannerX <= 0);

    console.log(isEdgeReached);
    if ((isEndOfWindow || isStartOfWindow)) isEdgeReached = !(isEdgeReached);
}

function drawParticleField(start, width) {
    const particleFieldY = 0;
    r.DrawRectangle(start, particleFieldY, width, HEIGHT, r.SKYBLUE)
}

function draw() {
    const ScannerY = 0;

    r.BeginDrawing();

    drawParticleField(100, 50);

    r.ClearBackground(r.BLACK)
    r.DrawRectangle(ScannerX, ScannerY, ScannerWidth, HEIGHT, r.WHITE);

    r.EndDrawing();
}

function update() {
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