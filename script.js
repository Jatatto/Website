const canvas = document.getElementById("webCanvas");

console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

var webPoints = [];
var mouse = new Point(0,0);
var offset = 0;

for(var i = 0; i < canvas.width/10; i++){

    var webPoint = new WebPoint();

    webPoint.render(ctx);

    webPoints.push(webPoint);


}

console.log(webPoints);
this.holding = false;

ctx.fillStyle = "rgb(128,128,128)"
ctx.fillRect(0,0,canvas.width, canvas.height);

render();

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000/30);
    };
})();

function render(){

    setTimeout(function(){

        requestAnimFrame(render);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgb(53,53,53)";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        ctx.globalAlpha = 1;

        for(var i = 0; i < webPoints.length; i++)
            webPoints[i].move();

        ctx.globalAlpha = .2;
        ctx.strokeStyle = "rgb(235,235,235)";

        for(var i = 0; i < webPoints.length; i++){    
            for(var j = 0; j < webPoints.length; j++)
                if(i != j && webPoints[i].getDistance(webPoints[j]) < 150){

                    ctx.beginPath();

                    webPoints[i].lineTo(ctx, webPoints[j]);

                    ctx.stroke();

                }

            if(holding){

                var distance = webPoints[i].getDistance(mouse);

                if(distance < 100){

                    var velocityPoint = webPoints[i].clonePoint().subtract(mouse);

                    webPoints[i].vector = new Vector(velocityPoint.x, velocityPoint.y, distance).normalize().multiply(webPoints[i].speed);

                    webPoints[i].setSpeed(webPoints[i].speed * 1.25);

                } else if(webPoints[i].pastMaxSpeed())
                    webPoints[i].setSpeed(Math.random() * 5 + 5);

            }


        }

        if(holding){

            ctx.globalAlpha = .5;
            ctx.strokeStyle = "rgb(245, 245, 245)";

            ctx.beginPath();

            for(var angle = 0; angle <= (Math.PI * 2) ; angle += Math.PI / 4){

                if(angle == 0)
                    ctx.moveTo(
                        mouse.x + (100 * Math.cos(angle + offset)),
                        mouse.y + (100 * Math.sin(angle + offset))
                    );
                else
                    ctx.lineTo(
                        mouse.x + (100 * Math.cos(angle + offset)),
                        mouse.y + (100 * Math.sin(angle + offset))
                    );

            }

            ctx.stroke();


            offset += Math.PI / 32;

        }

    }, 1000/30);


}

window.addEventListener('mousedown', e => {

    this.holding = true;
    this.mouse = new Point(e.pageX, e.pageY);

});

window.addEventListener('mousemove', e => {

    if(holding)
        this.mouse =  new Point(e.pageX, e.pageY);

});

window.addEventListener('mouseup', e => {

    this.holding = false;
    offset = 0;

});