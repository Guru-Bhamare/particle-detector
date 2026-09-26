const r = require('raylib');

const WIDTH = 701;
const HEIGHT = 400;

let scannerX = 0;
let scannerColor = r.WHITE;
const scannerWidth = 80;

let isEdgeReached = false;

const particleOneStart = 150;
const particleOneWidth = 70;

const particleTwoStart = 400;
const particleTwoWidth = 70;


function setup() {
    const FPS = 60;
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function moveScanner() {
    const scannerSpeed = 1;

    scannerX += (!isEdgeReached) ? scannerSpeed : -scannerSpeed;

    const isEndOfWindow = ((scannerX + scannerWidth) >= WIDTH);
    const isStartOfWindow = (scannerX <= 0);

    if ((isEndOfWindow || isStartOfWindow)) isEdgeReached = !isEdgeReached;
}

function drawParticleField(start, width) {
    const particleFieldY = 0;
    r.DrawRectangle(start, particleFieldY, width, HEIGHT, r.SKYBLUE)
}

function handleOverlap(rangeOneX, rangeOneY, rangeTwoX, rangeTwoY) {
    const isOverlappingParticle = ((rangeOneX <= rangeTwoY) && (rangeTwoX <= rangeOneY))
    scannerColor = isOverlappingParticle ? r.RED : r.WHITE;
}

function draw() {
    const scannerY = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleField(particleOneStart, particleOneWidth);
    drawParticleField(particleTwoStart, particleTwoWidth);

    r.DrawRectangle(scannerX, scannerY, scannerWidth, HEIGHT, scannerColor);

    r.EndDrawing();
}

function update() {

    const scannerEnd = scannerX + scannerWidth;
    const particleTwoEnd = particleTwoStart + particleTwoWidth;
    const parcticleOneEnd = particleOneStart + particleOneWidth;

    let particleStart = particleOneStart;
    let particleEnd = parcticleOneEnd;

    if ((scannerEnd >= particleOneStart) && (scannerEnd >= particleTwoStart)) {
        particleStart = particleTwoStart;
        particleEnd = particleTwoEnd;
    }

    handleOverlap(particleStart, particleEnd, scannerX, scannerEnd);

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