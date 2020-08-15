const canvas = document.getElementById("webCanvas");
const ctx = canvas.getContext("2d");

const webEffect = new WebEffect(canvas, ctx);

ctx.imageSmoothingEnabled = true;

ctx.fillStyle = "rgb(128,128,128)"
ctx.fillRect(0,0,canvas.width, canvas.height);

render();

function render(){

    setTimeout(function(){

        requestAnimFrame(render);

        webEffect.render(canvas, ctx);

    }, 1000/30);


}

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000/30);
    };
})();

window.addEventListener('mousedown', e => {

    webEffect.holding = true;
    webEffect.mouse = new Point(e.pageX, e.pageY);

});

window.addEventListener('mousemove', e => {

    webEffect.mouse =  new Point(e.pageX, e.pageY);

});

window.addEventListener('mouseup', e => {

    webEffect.holding = false;
    webEffect.offset = 0;

});