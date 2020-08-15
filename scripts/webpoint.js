class WebPoint extends Point {

    constructor(webEffect) {

        super(Math.random() * window.innerWidth, Math.random() * window.innerHeight);

        this.webEffect = webEffect;

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
        else if(next.x >= window.innerWidth)
            this.vector.x = -this.vector.x;
        else if(next.y <= 0)
            this.vector.y = -this.vector.y;
        else if(next.y >= window.innerHeight)
            this.vector.y = -this.vector.y;

    }

    checkStuck(){

        var next = this.clonePoint().add(this.vector);

        if(next.x <= 0)
            this.x = Math.random() * window.innerWidth;
        else if(next.x >= window.innerWidth)
            this.x = Math.random() * window.innerWidth;
        else if(next.y <= 0)
            this.y = Math.random() * window.innerHeight;
        else if(next.y >= window.innerHeight)
            this.y = Math.random() * window.innerHeight;

    }

    render(){

        this.webEffect.ctx.globalAlpha = 1;
        this.webEffect.ctx.fillStyle = "rgb(255,255,255)";
        this.webEffect.ctx.beginPath();

        this.webEffect.ctx.arc(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, 0, Math.PI * 2);
        this.webEffect.ctx.fill();
        this.webEffect.ctx.closePath();

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

        return this.speed > this.webEffect.getOption("randomSpeed") + this.webEffect.getOption("baseSpeed");

    }

}