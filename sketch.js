const r = require('raylib');

const WIDTH = 700;
const HEIGHT = 400;

let scannerOneX = 0;
let scannerOneColor = r.WHITE;
const scannerWidth = 80;

let scannerTwoX = WIDTH - scannerWidth;
let scannerTwoColor = r.WHITE;

const particleOneStart = 30;
const particleOneWidth = 70;

const particleTwoStart = 300;
const particleTwoWidth = 50;

let isEdgeOneReached = false;
let isEdgeTwoReached = true;

function setup() {
    const FPS = 60;
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}


function addSpeedInScanner(scannerX, scannerSpeed, endReached) {
    scannerX += (!endReached) ? scannerSpeed : -scannerSpeed;
    return scannerX;
}

function moveScanner(scannerX, endReached, endOfWindow, startOfWindow, scannerEnd) {
    const isEndOfWindow = scannerEnd >= endOfWindow;
    const isStartOfWindow = scannerX <= startOfWindow;

    if ((isEndOfWindow || isStartOfWindow)) endReached = !endReached;
    return endReached;
}

function drawParticleField(start, width) {
    const particleFieldY = 0;
    r.DrawRectangle(start, particleFieldY, width, HEIGHT, r.SKYBLUE)
}

function changeColor(scannerOne, scannerTwo) {
    scannerOneColor = scannerOne ? r.RED : r.WHITE;
    scannerTwoColor = scannerTwo ? r.RED : r.WHITE;
}

function isOverlapping(rangeOneStart, rangeOneEnd, rangeTwoStart, rangeTwoEnd) {
    const isOverlapInRangeOne = rangeOneStart <= rangeTwoEnd;
    const isOverlapInRangeTwo = rangeTwoStart <= rangeOneEnd;

    const isOverlappingParticle = isOverlapInRangeOne && isOverlapInRangeTwo;
    return isOverlappingParticle;
}

function update() {

    const scannerOneSpeed = 2;
    const scannerTwoSpeed = 5;

    const particleTwoEnd = particleTwoStart + particleTwoWidth;
    const particleOneEnd = particleOneStart + particleOneWidth;

    const scannerOne = isOverlapping(particleOneStart, particleOneEnd, scannerOneX, scannerOneX + scannerWidth) || isOverlapping(particleTwoStart, particleTwoEnd, scannerOneX, scannerOneX + scannerWidth)
    const scannerTwo = isOverlapping(particleOneStart, particleOneEnd, scannerTwoX, scannerTwoX + scannerWidth) || isOverlapping(particleTwoStart, particleTwoEnd, scannerTwoX, scannerTwoX + scannerWidth)

    changeColor(scannerOne, scannerTwo);

    scannerOneX = addSpeedInScanner(scannerOneX, scannerOneSpeed, isEdgeOneReached);
    scannerTwoX = addSpeedInScanner(scannerTwoX, scannerTwoSpeed, isEdgeTwoReached);

    isEdgeOneReached = moveScanner(scannerOneX, isEdgeOneReached, WIDTH / 2, 0, scannerOneX + scannerWidth);
    isEdgeTwoReached = moveScanner(scannerTwoX, isEdgeTwoReached, WIDTH, WIDTH / 2, scannerTwoX + scannerWidth);
}

function draw() {
    const scannerOneY = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleField(particleOneStart, particleOneWidth);
    drawParticleField(particleTwoStart, particleTwoWidth);

    r.DrawRectangle(scannerOneX, scannerOneY, scannerWidth, HEIGHT, scannerOneColor);
    r.DrawRectangle(scannerTwoX, scannerOneY, scannerWidth, HEIGHT, scannerTwoColor);

    r.EndDrawing();
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