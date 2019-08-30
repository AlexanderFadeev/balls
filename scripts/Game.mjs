import Vector from "/common/Vector.mjs";
import Mouse from "/common/Mouse.mjs";
import Ball from "./Ball.mjs";
import Graphics from "./Graphics.mjs";

class BallFactory {
    constructor(canvas, ballParams) {
        this.mouse = new Mouse(canvas);
        this.ballParams = ballParams;
    }

    getBall() {
        return new Ball(this.ballParams);
    }
}

export default class Game {
    constructor(canvas) {
        this.graphics = new Graphics(canvas);
        this.factory = new BallFactory(canvas, {
            mouse: new Mouse(canvas, new Vector(16 / 9, 1)),
            position: new Vector(16 / 9 / 2, 1 / 2),
            radius: 1 / 20,
            airResistance: -0.25,
            hitSpeedCoef: 0.75,
            hitSpeedCoefSecondary: 0.95,
            PIDParams: {
                kP: 50,
                kI: 1,
                kD: 10,
            }
        });
        this.ball = this.factory.getBall();
        this.prevTime = new Date();
    }

    update(deltaTime) {
        this.ball.update(deltaTime);
    }

    tick() {
        let time = new Date();
        let deltaTime = time - this.prevTime;
        this.update(deltaTime);
        this.graphics.clear();
        this.graphics.drawBall(this.ball);
        this.prevTime = time;
        window.requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.tick();
    }
}