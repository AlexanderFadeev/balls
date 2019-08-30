import Vector from "/common/Vector.mjs";
import PIDController from "./PIDController.mjs";

export default class Ball {
    constructor(params) {
        this.mouse = params.mouse;
        this.position = params.position;
        this.radius = params.radius;
        this.airResistance = params.airResistance;
        this.hitSpeedCoef = params.hitSpeedCoef;
        this.hitSpeedCoefSecondary = params.hitSpeedCoefSecondary;
        this.speed = new Vector(0, 0);
        let PIDParams = params.PIDParams;
        this.controller = {
            x: new PIDController(PIDParams),
            y: new PIDController(PIDParams),
            both: new PIDController(PIDParams),
        };
        this.controller.both.kI = 0; // FIXME
    }

    update(deltaTime) {
        let dt = deltaTime / 1000;
        let shift = this.speed.clone.multiply(dt);
        let acceleration = this.speed.clone.multiply(this.airResistance);
        shift.add(acceleration.clone.multiply(Math.pow(dt, 2) / 2));
        this.position.add(shift);
        this.speed.add(acceleration.clone.multiply(dt));

        const g = 1;
        acceleration = new Vector(0, g);
        shift.add(acceleration.clone.multiply(Math.pow(dt, 2) / 2));
        this.position.add(shift);
        this.speed.add(acceleration.clone.multiply(dt));

        if (this.mouse.isPressed) {
            let acceleration = new Vector(
                this.controller.x.controlVariable(this.mouse.position.x - this.position.x),
                this.controller.y.controlVariable(this.mouse.position.y - this.position.y)
            );
            this.speed.add(acceleration.clone.multiply(dt));
            this.position.add(acceleration.clone.multiply(Math.pow(dt, 2) / 2));

            let deltaPosition = this.mouse.position.clone.add(this.position.clone.negate());
            let accelerationBoth = this.controller.both.controlVariable(deltaPosition.length);
            deltaPosition.normalize();
            let accelerationBothVec = deltaPosition.clone.multiply(accelerationBoth);
            this.speed.add(accelerationBothVec.clone.multiply(dt));
            this.position.add(accelerationBothVec.clone.multiply(Math.pow(dt, 2) / 2));
        } else {
            this.controller.x.reset();
            this.controller.y.reset();
        }

        let h = 1;
        let w = 16 / 9;
        if (this.position.x < this.radius) {
            this.position.x = 2 * this.radius - this.position.x;
            this.speed.x *= -this.hitSpeedCoef;
            this.speed.y *= this.hitSpeedCoefSecondary;
        }
        if (this.position.x > w - this.radius) {
            this.position.x = 2 * (w - this.radius) - this.position.x;
            this.speed.x *= -this.hitSpeedCoef;
            this.speed.y *= this.hitSpeedCoefSecondary;
        }
        if (this.position.y < this.radius) {
            this.position.y = 2 * this.radius - this.position.y;
            this.speed.y *= -this.hitSpeedCoef;
            this.speed.x *= this.hitSpeedCoefSecondary;
        }
        if (this.position.y > h - this.radius) {
            this.position.y = 2 * (h - this.radius) - this.position.y;
            this.speed.y *= -this.hitSpeedCoef;
            this.speed.x *= this.hitSpeedCoefSecondary;
        }
    }
}