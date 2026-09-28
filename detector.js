const r = require('raylib');
const { draw } = require('./sketch');

function moveDetector(detectorX, detectorVelocity) {
    detectorX += detectorVelocity;
    return detectorX;
}

function calculateVelocity(detectorX, endOfWindow, startOfWindow, detectorEnd, detectorVelocity) {

    const isEndOfWindow = detectorEnd > endOfWindow;
    const isStartOfWindow = detectorX < startOfWindow;

    if ((isEndOfWindow || isStartOfWindow)) return -detectorVelocity;
    return detectorVelocity;
}

function drawHorizontalParticle(start, width, HEIGHT) {
    const particleFieldY = 0;
    r.DrawRectangle(start, particleFieldY, width, HEIGHT, r.SKYBLUE)
}

function drawVerticalParticle(start, width, WIDTH) {
    const particleFieldX = 0;
    r.DrawRectangle(particleFieldX, start, WIDTH, width, r.SKYBLUE)
}

function changeColor(isParticleDetected) {
    return isParticleDetected ? r.RED : r.WHITE;
}

function drawDetector(start, end, width, height, color) {
    return r.DrawRectangle(start, end, width, height, color);
}

module.exports = {
    calculateVelocity, moveDetector, drawHorizontalParticle, drawVerticalParticle, changeColor, drawDetector,
}