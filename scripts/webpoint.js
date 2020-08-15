class WebPoint extends Point {

    constructor() {

        super(Math.random() * window.innerWidth, Math.random() * window.innerHeight);

              this.speed = Math.random() * 5 + 5;
        this.radius = 5;

        this.vector = new Vector(
            (Math.random() * 1) - .5,
            (Math.random() * 1) - .5
        );

        this.vector.multiply(this.speed);

    }

    move(){

        this.add(this.vector);
        this.checkBounds();

    }

    checkBounds(){

        if(this.x <= 0)
            this.vector.x = -this.vector.x;
        else if(this.x >= window.innerWidth)
            this.vector.x = -this.vector.x;
        else if(this.y <= 0)
            this.vector.y = -this.vector.y;
        else if(this.y >= window.innerHeight)
            this.vector.y = -this.vector.y;

    }

    render(ctx){

        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();

        ctx.arc(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

    }

    hasPoint(point){

        return this.connected.includes(point);

    }

    getDistance(point){

        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));

    }

    lineTo(ctx, point){

        ctx.moveTo(this.x - this.radius / 2, this.y - this.radius / 2);
        ctx.lineTo(point.x - this.radius / 2, point.y - this.radius / 2);

    }

    setSpeed(speed){

        this.speed = speed;
        this.vector = this.vector.normalize().multiply(speed);

    }

    pastMaxSpeed(){

        return this.speed > 10;

    }

}