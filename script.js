(function(){


    const navBar = document.getElementById("navbar");
    const canvas = document.getElementById("webCanvas");
    const ctx = canvas.getContext("2d");

    init();

    function init(){

        document.getContact = function(){  

            alert("Discord: Jake#1477\nPage coming soon...");

        };

        canvas.width = window.innerWidth;

        console.log(navBar);

        canvas.height = window.innerHeight - navBar.scrollHeight;

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

            this.webEffect.mouse =  new Point(e.pageX, e.pageY - navBar.scrollHeight);

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

            this.webEffect.holding = true;
            this.webEffect.mouse =  new Point(e.pageX, e.pageY - navBar.scrollHeight);

        });

        window.onmouseup = (function(e){

            this.webEffect.holding = false;

        });

        window.onresize = (function(e){

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - navBar.scrollHeight;

        });

    }

})();