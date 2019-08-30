export default class Graphics {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.canvas.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.canvas.style.width = "100%";
        let w = this.canvas.clientWidth;
        let h = w * 9 / 16;
        const offset = 80;
        if (h > window.innerHeight - offset) {
            h = window.innerHeight - offset;
            this.canvas.style.height = `${h}px`;
            w = h * 16 / 9;
            this.canvas.style.width = `${w}px`;
        } else {
            this.canvas.style.height = `${h}px`;
        }
        this.canvas.width = w;
        this.canvas.height = h;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBall(ball) {
        this.context.beginPath();
        const x = ball.position.x * this.canvas.height;
        const y = ball.position.y * this.canvas.height; // Because y goes up to 16/9
        const r = ball.radius * this.canvas.height;
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = "#01BACE";
        this.context.fill();
    }
}