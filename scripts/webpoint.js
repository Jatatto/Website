class WebPoint extends Point {

    constructor(webEffect, canvas) {

        super(Math.random() * canvas.width, Math.random() * canvas.height);

        this.webEffect = webEffect;
        this.canvas = canvas;

        this.speed = Math.random() * webEffect.getOption("randomSpeed") + webEffect.getOption("baseSpeed");
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
        this.checkStuck();

    }

    checkBounds(){

        var next = this.clonePoint().add(this.vector);

        if(next.x <= 0)
            this.vector.x = -this.vector.x;
        else if(next.x >= this.canvas.width)
            this.vector.x = -this.vector.x;
        else if(next.y <= 0)
            this.vector.y = -this.vector.y;
        else if(next.y >= this.canvas.height)
            this.vector.y = -this.vector.y;

    }

    checkStuck(){

        var next = this.clonePoint().add(this.vector);

        if(next.x <= 0)
            this.x = Math.random() * this.canvas.width;
        else if(next.x >= this.canvas.width)
            this.x = Math.random() * this.canvas.width;
        else if(next.y <= 0)
            this.y = Math.random() * this.canvas.height;
        else if(next.y >= this.canvas.height)
            this.y = Math.random() * this.canvas.height;

    }

    render(ctx){

        ctx.globaAlpha = 1;
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

        ctx.globaAlpha = .1;
        ctx.moveTo(this.x - this.radius / 2, this.y - this.radius / 2);
        ctx.lineTo(point.x - this.radius / 2, point.y - this.radius / 2);

    }

    setSpeed(speed){

        this.speed = speed;
        this.vector = this.vector.normalize().multiply(speed);

    }

    pastMaxSpeed(){

        return this.speed > this.webEffect.getOption("randomSpeed") + this.webEffect.getOption("baseSpeed");

    }

}