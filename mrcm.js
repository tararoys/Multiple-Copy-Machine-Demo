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
    		
    		
    		var animation_buffer = document.createElement('canvas');
    		animation_buffer.width = canvas.width;
    		animation_buffer.height = canvas.height;
    		var anibufctx = animation_buffer.getContext('2d');
    		
    		var copy1 = document.createElement('canvas');
    		copy1.width = canvas.width;
    		copy1.height = canvas.height;
    		var copy1ctx = copy1.getContext('2d');
    		
    		var copy2 = document.createElement('canvas');
    		copy2.width = canvas.width;
    		copy2.height = canvas.height;
    		var copy2ctx = copy2.getContext('2d');
    		
    		var copy3 = document.createElement('canvas');
    		copy3.width = canvas.width;
    		copy3.height = canvas.height;
    		var copy3ctx = copy3.getContext('2d');
    		
    		
    		var ctx=canvas.getContext('2d');
    		ctx.clearRect(0,0, canvas.width, canvas.height);
    		
    		var i=0;
    		
    			var animate = function() {
    				ctx.clearRect(0,0, canvas.width, canvas.height);
    				
						anibufctx.clearRect(0,0, canvas.width, canvas.height);
						
						anibufctx.save();
						anibufctx.transform((1-i/10), 0, 0, (1-i/10), i/5*canvas.width/2, i/5*canvas.width/2);
						anibufctx.drawImage(buffer,0,0);
						anibufctx.restore();
					
					ctx.drawImage(animation_buffer,0,0);
					i++;
					if (i !==6){
					setTimeout(animate, 100);
					}
					else{
					copy1ctx.drawImage(animation_buffer,0,0);
					setTimeout(animate2, 100);
					}
					
				
					var original = ctx.getImageData( 0, 0, canvas.width, canvas.height);
			
					var pixels = canvas.width*canvas.height*4;
	
					while(pixels--){
						if(original.data[pixels] !== 0){
							original.data[pixels]=255;
						}
					}
					ctx.putImageData(original, 0, 0);
	    			
	    			};
	    			
	    			var j = 0;
	    			var animate2 = function() {
    				ctx.clearRect(0,0, canvas.width, canvas.height);
    				ctx.drawImage(copy1,0,0);
    				
						anibufctx.clearRect(0,0, canvas.width, canvas.height);
						
						//draw copy 1
						anibufctx.save();
						anibufctx.transform((1-j/10), 0, 0, (1-j/10), j/5*canvas.width/4, 0);
						anibufctx.drawImage(buffer,0,0);
						anibufctx.restore();
					
					ctx.drawImage(animation_buffer,0,0);
					j++;
					if (j !==6){
					
					setTimeout(animate2, 100);
					}
					else{
					copy2ctx.drawImage(animation_buffer,0,0);
					setTimeout(animate3, 100);
					}
					
				
					var original = ctx.getImageData( 0, 0, canvas.width, canvas.height);
			
					var pixels = canvas.width*canvas.height*4;
	
					while(pixels--){
						if(original.data[pixels] !== 0){
							original.data[pixels]=255;
						}
					}
					ctx.putImageData(original, 0, 0);
	    			
	    			};
	    			
	    			
	    			var k = 0;
	    			var animate3 = function() {
    				ctx.clearRect(0,0, canvas.width, canvas.height);
    				ctx.drawImage(copy1,0,0);
    				ctx.drawImage(copy2,0,0);
						anibufctx.clearRect(0,0, canvas.width, canvas.height);
						
						
						
						//draw copy 3
						anibufctx.save();
						anibufctx.transform((1-k/10), 0, 0, (1-k/10), 0, k/5*canvas.width/2);
						anibufctx.drawImage(buffer,0,0)
						anibufctx.restore();
						
					
					
					ctx.drawImage(animation_buffer,0,0);
					k++;
					if (k !==6){
					
					setTimeout(animate3, 100);
					}
					
				
					var original = ctx.getImageData( 0, 0, canvas.width, canvas.height);
			
					var pixels = canvas.width*canvas.height*4;
	
					while(pixels--){
						if(original.data[pixels] !== 0){
							original.data[pixels]=255;
						}
					}
					ctx.putImageData(original, 0, 0);
	    			
	    			};
    		
					setTimeout(animate, 100);
		}
		
		copy_button.addEventListener("click", copy, false );
	}
	
	multipleReductionCopyMachine(document.getElementById("canvas"));
	document.body.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
}