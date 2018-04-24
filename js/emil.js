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

function timeline() {

	slider.value = frame;
	ms = Date.now() - start;
	//console.log("Seconds elapsed = " + ms/1000);

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

function clearCanvas() {
	ctx.fillStyle = "rgb(250,250,230)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

function renderTime(f, time) {
	ctx.font = "16px Encode Sans";
	ctx.fillStyle = "black";
	ctx.fillText("Frame: " + f + ", Time elapsed: " + time/1000 + "s", 4, 20);
}

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

var bollBlue = {
	color: "rgb(99,105,175)",
	xstart: 315,
	ystart: 235,
	x: 0,
	y: 0,
	radius: 200,
	angle: 0,
	start: 0,
	end: 200,
	speed: 0.05,
	size: 40,
	animate: function(f) {
		if (f >= this.start && f <= this.end) {
		this.x = this.xstart + Math.cos(this.angle) * this.radius;
		this.y = this.ystart + Math.sin(this.angle) * this.radius;
		this.angle += this.speed;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		}
	},
	reset: function(){
		this.x = 315;
		this.y = 35;
		this.angle = 0;
	}
}

var outLine = {
	color: "rgb(157,76,110)",
	x: 315,
	y: 235,
	size: 200,
	animate: function(f) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.lineWidth = 5;
		ctx.stroke();
	},
	reset: function(){
		this.x = 315;
		this.y = 235;
	}
}