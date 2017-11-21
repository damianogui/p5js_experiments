let bubble;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bubble = new Bubble(200,200,40);
}

function draw() {
	background(0,0,255);
	//bubble.move();
	bubble.show();
}

class Bubble {
	constructor (x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
	}
	move(){
		this.x = this.x + random(-3,+3);
		this.y = this.y + random(-3,+3);
	}
	show(){
		fill(255,0,0);
		ellipse(this.x,this.y,this.r,this.r);
	}
}
