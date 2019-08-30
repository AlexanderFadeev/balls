import Vector from "../../common/Vector.mjs";

export default class Motion {
    constructor(position = new Vector.Zero, speed = new Vector.Zero, acceleration = new Vector.Zero) {
        this.position = position;
        this.speed = speed;
        this.acceleration = acceleration;
    }

    update(deltaTime) {
        this.position = this.position
            .add(this.speed.multiply(deltaTime));
        // .add(this.acceleration.multiply(deltaTime * deltaTime / 2));
        this.speed = this.speed
            .add(this.acceleration.multiply(deltaTime));
    }
}