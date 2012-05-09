window.onload=function(){
	
	var drawingCanvas = function(canvas_object){

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
				x: event.changedTouches[0].pageX,
				y: event.changedTouches[0].pageY
			};
			drawer[event.type](coords, ctx);
		};
		
		canvas_object.addEventListener("touchstart", draw, false);
		canvas_object.addEventListener("touchmove", draw, false);
		canvas_object.addEventListener("touchend", draw, false);
	}
	
	drawingCanvas(document.getElementById("canvas"));
	
	var copyCanvas = function(canvas_to_be_copied){
		
		var copy=function(event){
			var canvas_copy = document.createElement('canvas');
    		canvas_copy.width = canvas_to_be_copied.width;
    		canvas_copy.height = canvas_to_be_copied.height;
    		var canvas_copy_ctx = canvas_copy.getContext('2d');
    		
    		var ctx=canvas_to_be_copied.getContext('2d');
    		
    		canvas_copy_ctx.drawImage(canvas_to_be_copied, 0, 0);
    		
    		
    		
    		document.body.appendChild(canvas_copy);
		}
		copy_button.addEventListener("click", copy, false );
	}
	
	copyCanvas(document.getElementById("canvas"));
	
	document.body.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
}