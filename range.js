
function isParticleOverlapping(rangeOneStart, rangeOneEnd, rangeTwoStart, rangeTwoEnd) {
    const isOverlapInRangeOne = rangeOneStart <= rangeTwoEnd;
    const isOverlapInRangeTwo = rangeTwoStart <= rangeOneEnd;

    return isOverlapInRangeOne && isOverlapInRangeTwo;
}

function isRangeOverlappingDetector(particle, detector) {
    const particleEnd = particle.particleStart + particle.particleWidth;
    const detectorEnd = detector.detectorX + detector.detectorWidth;
    return isParticleOverlapping(particle.particleStart, particleEnd, detector.detectorX, detectorEnd);
}


module.exports = {
    isRangeOverlappingDetector,
}