const r = require('raylib');

function moveDetector(detector) {
    detector.detectorVelocity = calculateVelocity(detector);
    detector.detectorX += detector.detectorVelocity;
    return detector;
}

function calculateVelocity(d) {
    const detectorEnd = d.detectorX + d.detectorWidth;
    const isEndOfWindow = detectorEnd > d.end;
    const isStartOfWindow = d.detectorX < d.start;

    if ((isEndOfWindow || isStartOfWindow)) return -d.detectorVelocity;
    return d.detectorVelocity;
}

function changeColor(isParticleDetected) {
    return isParticleDetected ? r.RED : r.WHITE;
}

function drawHorizontalParticle(particle) {
    const particleFieldY = 0;
    r.DrawRectangle(particle.particleStart, particleFieldY, particle.particleWidth, particle.particleHeight, r.SKYBLUE)
    return particle;
}

function drawVerticalParticle(d) {
    const particleFieldX = 0;
    r.DrawRectangle(particleFieldX, d.particleStart, d.particleHeight, d.particleWidth, r.SKYBLUE)
}

function drawHorizontalDetector(d) {
    r.DrawRectangle(d.detectorX, d.detectorY, d.detectorWidth, d.detectorHeight, changeColor(d.isdetectorOverlapped));
}

function drawVerticalDetector(d) {
    r.DrawRectangle(d.detectorY, d.detectorX, d.detectorHeight, d.detectorWidth, changeColor(d.isdetectorOverlapped))
}

module.exports = {
    calculateVelocity, moveDetector, drawHorizontalParticle, drawVerticalParticle, changeColor, drawHorizontalDetector, drawVerticalDetector,
}