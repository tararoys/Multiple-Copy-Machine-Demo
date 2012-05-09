window.onload=function(){

	var findPos = function(obj){
		
	
			current_pos_left=current_pos_top=0;
			if(obj.offsetParent){
				do {
					current_pos_left += obj.offsetLeft;
					current_pos_top += obj.offsetTop;
				}while(obj=obj.offsetParent);
			}
			//alert("got here");
			return {
					 x: current_pos_left,
					 y: current_pos_top
				};
		};

	var drawingCanvas = function(canvas){
		var drawer = {
			touchstart:function(coords, draw_context){ 
				draw_context.beginPath();
				draw_context.moveTo(coords.x, coords.y);
			},
			touchmove:function(coords, draw_context){
					draw_context.lineTo(coords.x, coords.y);
					draw_context.stroke();
			},
			touchend:function(coords, draw_context){
					this.touchmove(coords);
			}
		};
		
		var draw = function(event){
			var ctx=this.getContext("2d");
			ctx.lineWidth=10;
			var coords= { 
				x: event.changedTouches[0].pageX-findPos(this).x,
				y: event.changedTouches[0].pageY-findPos(this).y
			};
			drawer[event.type](coords, ctx);
		}; 
		canvas.addEventListener("touchstart", draw, false);
		canvas.addEventListener("touchmove", draw, false);
		canvas.addEventListener("touchend", draw, false);
	};
	
	drawingCanvas(document.getElementById("canvas"));
	
	var multipleReductionCopyMachine = function(canvas){
		
		var copy=function(event){
			//create a copy of the original image.  
			
			var buffer = document.createElement('canvas');
    		buffer.width = canvas.width;
    		buffer.height = canvas.height;
    		var bufctx = buffer.getContext('2d');
    		bufctx.drawImage(canvas, 0, 0);
    		
    		var ctx=canvas.getContext('2d');
    		ctx.clearRect(0,0, canvas.width, canvas.height)
    		
	    		ctx.save();
				ctx.transform(0.5, 0, 0, 0.5, canvas.width/2, canvas.width/2);
				ctx.drawImage(buffer,0,0);
				//ctx.drawImage(image, 0, 0);
				ctx.restore();
			
				//draw copy 2
			
				ctx.save();
				ctx.transform(0.5, 0, 0, 0.5, canvas.width/4, 0);
				ctx.drawImage(buffer,0,0);
				//ctx.drawImage(image, 0, 0);
				ctx.restore();
				
			
				//draw copy 3
				ctx.save();
				ctx.transform(0.5, 0, 0, 0.5, 0, canvas.width/2);
				ctx.drawImage(buffer,0,0)
				//ctx.drawImage(image, 0, 0);
				ctx.restore();
			
			var original = ctx.getImageData( 0, 0, canvas.width, canvas.height);
			
			var pixels = canvas.width*canvas.height*4;
	
			while(pixels--){
				if(original.data[pixels] !== 0){
					original.data[pixels]=255;
				}
			}
			ctx.putImageData(original, 0, 0);
		}
		
		copy_button.addEventListener("click", copy, false );
	}
	
	multipleReductionCopyMachine(document.getElementById("canvas"));
	document.body.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
}