window.onload=function(){

	var drawingCanvas = function(canvas){
	
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
		
		var oneMRCMIteration=function(canvas){
    		
    		var transformCanvas = function(canvas, transform_matrix){
    			var t = transform_matrix;
    			
    			var transform_buffer = document.createElement('canvas');
    			transform_buffer.width = canvas.width;
    			transform_buffer.height = canvas.height;
    			var tbctx = transform_buffer.getContext('2d');
    				
				tbctx.transform(t.a, t.b, t.c, t.d, t.x, t.y);
				tbctx.drawImage(canvas,0,0);
						
				return transform_buffer;
    		
    		};
    		
    		var darkenImage = function(canvas){
    			var ctx=canvas.getContext("2d");
    			
    			var original = ctx.getImageData( 0, 0, canvas.width, canvas.height);
			
					var pixels = canvas.width*canvas.height*4;
	
					while(pixels--){
						if(original.data[pixels] !== 0){
							original.data[pixels]=255;
						}
					}
					ctx.putImageData(original, 0, 0);
    		};
    		
    		
    		
    		var calculateFrame = function(transform_matrix, canvas, buffer, background) {
    			var ctx=canvas.getContext('2d');
    			ctx.clearRect(0,0, canvas.width, canvas.height);
				var transformed_image = transformCanvas(buffer, transform_matrix);
				ctx.drawImage(background, 0, 0);
				ctx.drawImage(transformed_image, 0, 0);
				
				
	    			
	    	};
	    	
	    	var getInterpolationMatrix = function(frame_index, total_num_frames, transform){
	    			//linear interpolation
	    			
	    			var ratio = frame_index/total_num_frames;
	    			
	    			return {
	    						a: (1-ratio*transform.a),
	    						b: 0,
	    						c: 0,
	    						d: (1-ratio*transform.d),
	    					
	    						x: ratio*transform.x,
	    						y: ratio*transform.y
	    					};
	    		};
	    	
	    	
	    	var drawAnimation = function(){
	    		
	    		
	    		
	    		var transform_matrix_array=[{
	    						a: (0.5),
	    						b: 0,
	    						c: 0,
	    						d: (0.5),
	    					
	    						x: canvas.width/2,
	    						y: canvas.width/2
	    		}, 
	    		{
	    						a: (0.5),
	    						b: 0,
	    						c: 0,
	    						d: (0.5),
	    					
	    						x: canvas.width/4,
	    						y: 0
	    		
	    		},
	    		{
	    						a: (0.5),
	    						b: 0,
	    						c: 0,
	    						d: (0.5),
	    					
	    						x: 0,
	    						y: canvas.width/2
	    		
	    		}
	    		];
	    		
	    		var buffer = document.createElement('canvas');
    			buffer.width = canvas.width;
    			buffer.height = canvas.height;
    			var bufctx = buffer.getContext('2d');
    			bufctx.drawImage(canvas, 0, 0);
	    		
	    		var frame_index = 0;
	    		var num_frames = 5;
	    		var keyframe_index = 0;
	    		var num_keyframes = transform_matrix_array.length;
	    		var background = document.createElement('canvas');
	    		background.width = canvas.width;
    			background.height = canvas.height;
	    		var bgctx = background.getContext('2d');
	    		
	    		
	    		
				var id = setInterval(function(){ 
						if (keyframe_index === num_keyframes){
							clearInterval(id);
						}
						else{
						
							var transform_matrix = getInterpolationMatrix(frame_index, num_frames, transform_matrix_array[keyframe_index]);
							
							calculateFrame(transform_matrix, canvas, buffer, background);
							var ctx=canvas.getContext('2d');							
							
						
							frame_index++;
							
							if(frame_index > num_frames){
								bgctx.drawImage(canvas, 0, 0);
								frame_index=0;
								keyframe_index++;
							}
							if(!(keyframe_index===3)  ){
									ctx.globalAlpha=0.5;
									ctx.drawImage(buffer, 0, 0);
									ctx.globalAlpha=1.0;
									
							}
							
						}
					}, 100);
			};
			
			drawAnimation();
			darkenImage(canvas);
			
		}
		
		var copy_button=document.getElementById("copy_button");
		copy_button.addEventListener("click", function(){
				oneMRCMIteration(canvas);
			}, false );
	}
	
	multipleReductionCopyMachine(document.getElementById("canvas"));
	
	document.body.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
};