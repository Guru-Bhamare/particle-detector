function getData(WIDTH, HEIGHT) {

    const d1 = {
        detectorX: 0,
        detectorY: 0,
        start: 0,
        end: WIDTH / 2,
        detectorWidth: 40,
        detectorHeight: HEIGHT,
        detectorVelocity: 2,
        isdetectorOverlapped: false,
    }

    const d2 = {
        detectorX: WIDTH / 2,
        detectorY: 0,
        start: WIDTH / 2,
        end: WIDTH,
        detectorWidth: 40,
        detectorHeight: HEIGHT,
        detectorVelocity: 5,
        isdetectorOverlapped: false,
    }

    const d3 = {
        detectorX: 0,
        detectorY: 0,
        start: 0,
        end: HEIGHT,
        detectorWidth: 30,
        detectorHeight: WIDTH,
        detectorVelocity: 3,
        isdetectorOverlapped: false,
    }

    const p1 = {
        particleWidth: 70,
        particleStart: 30,
        particleHeight: HEIGHT,
    }

    const p2 = {
        particleStart: 450,
        particleWidth: 50,
        particleHeight: HEIGHT,
    }

    const p3 = {
        particleStart: 100,
        particleWidth: 30,
        particleHeight: WIDTH,
    }

    return { d1, d2, d3, p1, p2, p3 }
}
module.exports = { getData }