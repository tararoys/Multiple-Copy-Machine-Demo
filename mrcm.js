window.onload=function(){
	
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	
	
	var buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    var bufctx = buffer.getContext('2d');
	
	var drawer = {
		isDrawing:false,
		touchstart:function(coords){ 
			this.isDrawing=true;
			ctx.beginPath();
			ctx.moveTo(coords.x, coords.y);
		},
		touchmove:function(coords){
			if(this.isDrawing){
				ctx.lineTo(coords.x, coords.y);
				ctx.stroke();
			}
		},
		touchend:function(coords){
			if(this.isDrawing)
			{
				this.touchmove(coords);
				this.isDrawing=false;
			}
			
		}
	
	};
	
	var draw = function(event){
		
		var coords= { 
		x: event.changedTouches[0].pageX,
		y: event.changedTouches[0].pageY
		
		};
		drawer[event.type](coords);
	};
	canvas.addEventListener("touchstart", draw, false);
	canvas.addEventListener("touchmove", draw, false);
	canvas.addEventListener("touchend", draw, false);
	
	
	document.body.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
	
	var makeIntoGasket = function(){
	
		bufctx.clearRect(0,0, buffer.width, buffer.height);
    	bufctx.drawImage(canvas, 0, 0);
		ctx.clearRect(0,0, canvas.width, canvas.height); //clears canvas as well as saving it. 
		
		var width=canvas.width;
		var height=canvas.height;
			
		ctx.save();
		ctx.transform(0.5, 0, 0, 0.5, 0, 100);
		ctx.drawImage(buffer,0,0);
		//ctx.drawImage(image, 0, 0);
		ctx.restore();
		
		//draw copy 2
		
		ctx.save();
		ctx.transform(0.5, 0, 0, 0.5, 100, 0);
		ctx.drawImage(buffer,0,0);
		//ctx.drawImage(image, 0, 0);
		ctx.restore();
		
		//draw copy 3
		ctx.save();
		ctx.transform(0.5, 0, 0, 0.5, 0, 0);
		ctx.drawImage(buffer,0,0);
		//ctx.drawImage(image, 0, 0);
		ctx.restore();
		
		//make pixels darker on each iteration
		var original = ctx.getImageData( 0, 0, width, height);
		
		var pixels = width*height*4;
	
		while(pixels--){
			if(original.data[pixels] !== 0){
				original.data[pixels]=255;
			}
		}
		
		ctx.putImageData(original, 0, 0);
		
	}
	
	
	var  make_into_gasket=document.getElementById("make_into_gasket");
	make_into_gasket.addEventListener("click", makeIntoGasket, false);
	
	
}