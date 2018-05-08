var canvas = document.getElementById("modalAnimation");
canvas.width = 640;
canvas.height = 480;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var ctx = canvas.getContext("2d");
var frame = 0;
var status = null;
var numberOfFrames = 200;
var slider = document.getElementById("slider");
slider.max = numberOfFrames;

var stop = document.getElementById("stop");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var start, ms;

clearCanvas();
renderTime(frame, 0);

slider.addEventListener("change", function() {
	frame = slider.value;
	clearCanvas();
	renderTime(frame, 0);
}, true);

stop.addEventListener("click", function() {
	clearInterval(status);
	frame = 0;
	slider.value = frame;
	status = null;
	clearCanvas();
	renderTime(frame, 0);
	bollYellow.reset();
	bollBlue.reset();
	outLine.reset();
	play.textContent = "Play";
}, true);

/**

**/
play.addEventListener("click", function() {
	if (status === "null") {
		start = Date.now();
		status = setInterval(timeline, 33.333333333333336);
		play.textContent = "Pause";
	} else {
		clearInterval(status);
		status = null;
		play.textContent = "Play";
	}
}, true);


/**
Håller koll på tiden.
Först sätts ett slider value som är frame(vilken frame den är på)
ms är milisekunder som håller koll på tiden i millisekunder
sen anropas funktionen clearcannvas för att renska canvas innan nästa bild ritas ut
Sen ökar alla värden (x,y) för just den framen och ritas ut.
Sen skriver den ut tiden och framen för just den framen så att man kan se.
Sen är det en if sats som tittar om framsen är lika stor som maxframes, det vill säga om animationen är slut, då slutar animationen(sätter status till null)
Sist ökar framen för att kunna fortsätta med animationen
**/ 
function timeline() {

	slider.value = frame;
	ms = Date.now() - start;
	clearCanvas();
	bollYellow.animate(frame);
	bollBlue.animate(frame);
	outLine.animate(frame);
	renderTime(frame, ms);

	if (frame == numberOfFrames) {
		clearInterval(status);
		status = null;
	}
	frame++;
}

/**
Ränsar Canvas från objekt 
Används så att alla frames inte ritas ut för då blir det bara ett sträck efter objekten
**/
function clearCanvas() {
	ctx.fillStyle = "rgb(250,250,230)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

/**
Skriver ut tiden och bildruter det tar för att uförna animationen
Updateras över tid
Den finns för att se hur lång animationen tar och hur många frames
**/
function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}

/**
Ritar ut en gul boll som ska reprecentera centrum.
Bollen är fast ritad och rör inte på sig.
När animationen börjar om ritas bollen ut på samma ställe genom att sätta x,y till samma värde.
**/
var bollYellow = {
	color: "rgb(222,175,72)",
	x: 315,
	y: 235,
	size: 30,
	animate: function(f) {
		ctx.beginPath();
	    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	    ctx.fillStyle = this.color;
	    ctx.fill();	
	},
	reset: function() {
		this.x = 315;
		this.y = 235;
	}
}

/**
Ritar ut en blå boll som roterar i en cirkulär rörelse runt den gula bollen
För varje frame ändras vinkeln med 0.05 radianer som är hastigheten.
Den tar reda på positionen (x,y) där bollen ska ritas ut beroende på vinkel från mitten.
Första if satsen tittar så att den inte har gått ett varv.
Om den inte gått ett varv roterar den runt den gula bollen.
När den har åkt ett var går den till nästa if sats som bara flytta bollen till vänster (-x).
När animationen börjar om sätter den x,t till samma värde som när den starta och vinkeln så att den roterar åt rätt håll.
**/
var bollBlue = {
	color: "rgb(99,105,175)",
	xstart: 315,
	ystart: 235,
	x: 0,
	y: 0,
	radius: 200,
	angle: -(Math.PI/2),
	start: 0,
	end: 200,
	speed: -0.05,
	size: 40,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
			if(this.angle > -(5*Math.PI/2)){
				this.x = this.xstart + Math.cos(this.angle) * this.radius;
				this.y = this.ystart + Math.sin(this.angle) * this.radius;
				this.angle += this.speed;

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			}
			if (this.angle <= -(5*Math.PI/2)) {
				this.x -= 10;

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
				ctx.fillStyle = this.color;
				ctx.fill();
			}
		}
	},
	reset: function(){
		this.x = 315;
		this.y = 35;
		this.angle = -(Math.PI/2);
	}
}

/**
Ritar ut en cirkel som inte är fylld
Cirkeln är tänkt att vara rotationsbanan
Om animationen startas om ritas den ut på samma ställe
Den rör inte på sig
**/
var outLine = {
	color: "rgb(157,76,110)",
	x: 315,
	y: 235,
	size: 200,
	animate: function(f) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 5;
		ctx.stroke();
	},
	reset: function(){
		this.x = 315;
		this.y = 235;
	}
}