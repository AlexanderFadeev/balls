export default class PIDController {
    constructor(params) {
        this.kP = params.kP;
        this.kI = params.kI;
        this.kD = params.kD;

        this.prevTime = null;
        this.prevError = null;
        this.integral = 0;
    }

    reset() {
        this.prevTime = null;
        this.prevError = null;
        this.integral = 0;
    }

    controlVariable(error) {
        let time = new Date();

        let result = error * this.kP;
        if (this.prevTime) {
            let deltaError = error - this.prevError;
            let deltaTime = (time - this.prevTime) / 1000;

            this.integral += error * deltaTime;
            this.integral += deltaError * deltaTime / 2;
            result += this.integral * this.kI;

            let derivative = deltaError / deltaTime;
            result += derivative * this.kD;
        }

        this.prevTime = time;
        this.prevError = error;
        return result;
    }
}