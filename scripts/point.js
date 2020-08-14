class Point{

    constructor(x, y){

        this.x = x;
        this.y = y;

    }


    add(x, y){

        if(y != undefined){

            this.x += x;
            this.y += y;

        }else{

            this.x += x.x;
            this.y += x.y;

        }

        return new Point(this.x,this.y);

    }


    subtract(x, y){

        if(y != undefined){


            this.x -= x;
            this.y -= y;

        }else{

            this.x -= x.x;
            this.y -= x.y;

        }

        return new Point(this.x,this.y);

    }

    clonePoint(){

        return new Point(this.x, this.y);

    }

}