var length_of_session = {"work": 25, "break": 5, "rebreak": 10};

$(document).ready(function()
{
	$("#sessions").find("button").click(function()
	{
		var type = $(this).attr("id");
		var length = length_of_session[type] * 60;
		
		Timer.set(length);
		Timer.start();
	});
	
	$("button#stop.operation").click(function()
	{
		Timer.stop();
		Timer.set(0);
	});
	
	$("button#pause.operation").click(function()
	{
		Timer.stop();
	});
	
	$("button#play.operation").click(function()
	{
		Timer.start();
	});
});

var Timer = new function()
{
	this.currentTime = 0;
	this.originalTime = 0;
	
	this.set = function(time)
	{
		this.currentTime = time;
		this.originalTime = time;
		
		this._render();
	}
	
	this.start = function()
	{
		var tick = this._tick.bind(this);
		this._interval.initiate(tick);
	}
	
	this.stop = function()
	{
		this._interval.terminate();
	}
	
	this.isActive = function()
	{
		return this._interval.instance;
	}
	
	this._tick = function()
	{
		this.currentTime -= 1;
		
		if(this.currentTime <= 0)
		{
			this._interval.terminate();
			new Audio("bell.wav").play();
		}
		
		this._render();
	}
	
	this._interval = new function()
	{
		this.initiate = function(func)
		{
			clearInterval(this.instance);
			this.instance = setInterval(func, 1000);
		}
		
		this.terminate = function()
		{
			clearInterval(this.instance);
			this.instance = undefined;
		}
	}
	
	this._render = function()
	{
		var minutes = Math.floor(this.currentTime / 60);
		var seconds = String.pad(this.currentTime % 60);
		
		var time = minutes + ":" + seconds;
		
		$("#countdown").find("time").text(time);
		$("title").text(time + ", Romodoro");
		
		$("#countdown").find("meter").attr("value", this.currentTime);
		$("#countdown").find("meter").attr("max", this.originalTime);
	}
}

String.pad = function(value, length, padding)
{
	value += "";
	length = length || 2;
	padding = padding || "0";
	
	while(value.length < length)
	{
		value = padding + value;
	}
	
	return value;
}