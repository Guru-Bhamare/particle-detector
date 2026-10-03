const r = require('raylib');
const s = require('./detector.js')
const range = require(`./range.js`)
const data = require('./data.js')



function setup() {
    const FPS = 60;
    const WIDTH = 900;
    const HEIGHT = 800;

    const world = data.getData(WIDTH, HEIGHT)

    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS);
    return world;
}

function running() {
    return !r.WindowShouldClose();
}

function update(world) {

    world.d1.isdetectorOverlapped = range.isRangeOverlappingDetector(world.p1, world.d1) || range.isRangeOverlappingDetector(world.p2, world.d1);
    world.d2.isdetectorOverlapped = range.isRangeOverlappingDetector(world.p1, world.d2) || range.isRangeOverlappingDetector(world.p2, world.d2);
    world.d3.isdetectorOverlapped = range.isRangeOverlappingDetector(world.p3, world.d3);

    s.moveDetector(world.d1);
    s.moveDetector(world.d2);
    s.moveDetector(world.d3);

}

function draw(world) {

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    s.drawHorizontalParticle(world.p1);
    s.drawHorizontalParticle(world.p2);
    s.drawVerticalParticle(world.p3);

    s.drawHorizontalDetector(world.d1);
    s.drawHorizontalDetector(world.d2);
    s.drawVerticalDetector(world.d3);

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