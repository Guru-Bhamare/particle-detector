const r = require('raylib');
const s = require('./detector.js')
const p = require('./particle.js')
const s1 = require('./s1.js')
const s2 = require('./s2.js')
const s3 = require('./s3.js')

const WIDTH = 700;
const HEIGHT = 400;
const detectorWidth = 40;

function setup() {
    const FPS = 60;
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
    s2.detectorTwoX = WIDTH / 2;
}

function running() {
    return !r.WindowShouldClose();
}

function isParticleOverlapping(rangeOneStart, rangeOneEnd, rangeTwoStart, rangeTwoEnd) {
    const isOverlapInRangeOne = rangeOneStart <= rangeTwoEnd;
    const isOverlapInRangeTwo = rangeTwoStart <= rangeOneEnd;

    return isOverlapInRangeOne && isOverlapInRangeTwo;
}

function isRangeOverlappingDetectorOne(particleStart, particleEnd) {
    return isParticleOverlapping(particleStart, particleEnd, s1.detectorOneX, s1.detectorOneX + detectorWidth)
}

function isRangeOverlappingDetectorTwo(particleStart, particleEnd) {
    return isParticleOverlapping(particleStart, particleEnd, s2.detectorTwoX, s2.detectorTwoX + detectorWidth)
}

function update() {


    s1.isdetectorOneOverlapped =
        isRangeOverlappingDetectorOne(p.particleOneStart, p.particleOneEnd) ||
        isRangeOverlappingDetectorOne(p.particleTwoStart, p.particleTwoEnd);

    s2.isdetectorTwoOverlapped =
        isRangeOverlappingDetectorTwo(p.particleOneStart, p.particleOneEnd) ||
        isRangeOverlappingDetectorTwo(p.particleOneEnd, p.particleTwoEnd);

    s3.isdetectorThreeOverlapped = isParticleOverlapping(p.particleThreeStart, p.particleThreeEnd, s3.detectorThreeY, s3.detectorThreeY + detectorWidth)

    s1.detectorOneX = s.moveDetector(s1.detectorOneX, s1.detectorOneVelocity);
    s2.detectorTwoX = s.moveDetector(s2.detectorTwoX, s2.detectorTwoVelocity);
    s3.detectorThreeY = s.moveDetector(s3.detectorThreeY, s3.detectorThreeVelocity);


    const detectorOneEnd = s1.detectorOneX + detectorWidth;
    const detectorTwoEnd = s2.detectorTwoX + detectorWidth;
    const detectorThreeEnd = s3.detectorThreeY + detectorWidth;

    s1.detectorOneVelocity = s.calculateVelocity(s1.detectorOneX, WIDTH / 2, 0, detectorOneEnd, s1.detectorOneVelocity);
    s2.detectorTwoVelocity = s.calculateVelocity(s2.detectorTwoX, WIDTH, WIDTH / 2, detectorTwoEnd, s2.detectorTwoVelocity);
    s3.detectorThreeVelocity = s.calculateVelocity(s3.detectorThreeY, HEIGHT, 0, detectorThreeEnd, s3.detectorThreeVelocity);

}

function draw() {
    const detectorOneY = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    s.drawHorizontalParticle(p.particleOneStart, p.particleOneWidth, HEIGHT);
    s.drawHorizontalParticle(p.particleTwoStart, p.particleTwoWidth, HEIGHT);
    s.drawVerticalParticle(p.particleThreeStart, p.particleThreeWidth, WIDTH);

    s.drawDetector(s1.detectorOneX, detectorOneY, detectorWidth, HEIGHT, s.changeColor(s1.isdetectorOneOverlapped));
    s.drawDetector(s2.detectorTwoX, detectorOneY, detectorWidth, HEIGHT, s.changeColor(s2.isdetectorTwoOverlapped));
    s.drawDetector(0, s3.detectorThreeY, WIDTH, detectorWidth, s.changeColor(s3.isdetectorThreeOverlapped));

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