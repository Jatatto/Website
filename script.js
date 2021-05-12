(function(){

    const canvas = document.getElementById("webCanvas");
    const ctx = canvas.getContext("2d");

    init();

    function init(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        this.webEffect = new WebEffect(canvas);

        ctx.imageSmoothingEnabled = true;

        ctx.fillStyle = "rgb(128,128,128)"
        ctx.fillRect(0,0,canvas.width, canvas.height);

        registerListeners();
        render();

    }

    function render(){


        setTimeout(function(){

            this.webEffect.render(canvas, ctx);
            requestAnimationFrame(render);

        }, 1000/30)

    }

    function registerListeners(){

        window.onmousemove = (function(e){

            this.webEffect.mouse =  new Point(e.pageX, e.pageY);

        });

        window.onkeypress = (function(e){

            if(e.code.toString() === "KeyO"){


                var message = "Options";


                this.webEffect.options.forEach((value, key) => {

                    message += "\n" + key + " = " + value;

                });


                var toChange = prompt(message, "lineColor");

                if(this.webEffect.options.get(toChange) != null)
                    this.webEffect.options.set(toChange, prompt("New value:", webEffect.options.get(toChange)));

            }

        });

        window.onmousedown = (function(e){

            if(e.pageX >= canvas.width / 2 - 150 && e.pageX <= canvas.width / 2 + 150 && e.pageY >= canvas.height / 2 - 40 && e.pageY <= canvas.height / 2 + 40)
                window.location.replace("https://github.com/Jatatto");
            else{
            
                this.webEffect.holding = true;
                this.webEffect.mouse =  new Point(e.pageX, e.pageY);
        
            }
            
        });

        window.onmouseup = (function(e){

            this.webEffect.holding = false;

        });

        window.onresize = (function(e){

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        });

    }

})();