const r = require('raylib');

const WIDTH = 700;
const HEIGHT = 400;

let ScannerX = 0;
let isEdgeReached = 0;

const ScannerWidth = 40;

const FPS = 60;

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanner() {
    isEdgeReached === 0 ? ScannerX += 2 : ScannerX -= 2;

    const isEndOfWindow = (WIDTH === ScannerX + ScannerWidth);
    const isStartOfWindow = (ScannerX === 0);

    if ((isEndOfWindow || isStartOfWindow)) isEdgeReached = Number(!isEdgeReached);
}

function draw() {
    const ScannerY = 0;

    r.BeginDrawing();


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