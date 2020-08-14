console.log("Loading script...");

const canvas = document.getElementById("webCanvas");

console.log(canvas);

canvas.width = screen.availWidth;
canvas.height = screen.availHeight;

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

var webPoints = [];


for(var i = 0; i < canvas.width/12; i++){

    var webPoint = new WebPoint();

    webPoint.render(ctx);

    webPoints.push(webPoint);


}

console.log(webPoints);
this.holding = false;

ctx.fillStyle = "rgb(128,128,128)"
ctx.fillRect(0,0,screen.availWidth, screen.availHeight);

render();

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1);
    };
})();

function render(){

    setTimeout(function(){

        requestAnimFrame(render);

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "rgb(53,53,53)";
        ctx.fillRect(0,0,screen.availWidth, screen.availHeight);

        ctx.globalAlpha = 1;

        for(var i = 0; i < webPoints.length; i++){

            webPoints[i].move();
            webPoints[i].render(ctx);

        }

        ctx.globalAlpha = .2;
        ctx.strokeStyle = "rgb(235,235,235)";

        for(var i = 0; i < webPoints.length; i++)
            for(var j = 0; j < webPoints.length; j++)
                if(i != j && webPoints[i].getDistance(webPoints[j]) < 150){

                    ctx.beginPath();

                    webPoints[i].lineTo(ctx, webPoints[j]);

                    ctx.stroke();

                }



    }, 1);


}

window.addEventListener('mousedown', e => {

    this.holding = true;

});

window.addEventListener('mousemove', e => {

    if(holding){

        var mouse = new Point(e.pageX, e.pageY);

        for(var i = 0; i < webPoints.length; i++){

            var distance = webPoints[i].getDistance(mouse);

            if(distance < 75){

                var velocityPoint = webPoints[i].clonePoint().subtract(mouse);
                
                webPoints[i].vector = new Vector(velocityPoint.x, velocityPoint.y, distance).normalize().multiply(webPoints[i].speed);

            }   


        }


    }



});

window.addEventListener('mouseup', e => {

    this.holding = false;

});