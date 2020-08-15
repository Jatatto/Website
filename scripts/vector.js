class Vector extends Point {

    constructor(changeOfX, changeOfY, length){

        super(changeOfX, changeOfY);
        this.length = length == undefined ? 1 : length;

    }

    multiply(length){

        this.length *= length;
        this.x *= this.length;
        this.y *= this.length;

        return this;
        
    }

    divide(length){

        this.length *= length;
        this.x /= this.length;
        this.y /= this.length;

        return this;
        
    }

    normalize(){

        this.x /= this.length;
        this.y /= this.length;
        this.length = 1;

        return this;
        
    }
    
    cloneVector(){
        
        return new Vector(this.x, this.y, this.length);
        
    }

}