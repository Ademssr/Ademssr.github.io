"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 10;

var theta2 = 0.0;
var thetaLoc2;
var direction2 = 1;
var speed2 = 10;

var theta3 = 0.0;
var thetaLoc3;
var direction3 = 1;
var speed3 = 10;

var theta4 = 0.0;
var thetaLoc4;
var direction4 = 1;
var speed4= 10;

function changeDir(){
	direction *= -1;
}
function changeDir2(){
	direction2 *= -1;
}
function changeDir3(){
	direction3 *= -1;
}
function changeDir4(){
	direction4 *= -1;
}


function initRotSquare(){
	
	
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var vertices = [
		-1.0, -0.5, 
		 0,  0, 
		 -0.5, 0.5, 
		 -0.5, 1.0,
		 0.5, 0.5,
		 0, 0,
		 0, 0,
		 1.0, 0.5,
		 0.5, -0.5, 
		 0, 0,
		-0.5, -0.5,
		 0.5, -1.0
	];
	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	
	thetaLoc = gl.getUniformLocation( program, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 20 - event.target.value;
	}
	render();
	
	
	
	document.getElementById( "speedcon2" ).onchange = function( event ){
		speed2 = 20 - event.target.value;
	}
	
	document.getElementById( "speedcon3" ).onchange = function( event ){
		speed3 = 20 - event.target.value;
	}
	document.getElementById( "speedcon4" ).onchange = function( event ){
		speed4 = 20 - event.target.value;
	}
	render2();
	render3();
	render4();
	
	
	
	
}

function render(){
	theta += direction * 0.02;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLES, 0, 3);
	
	setTimeout( function(){ requestAnimFrame( render ); }, speed );
}
function render2(){
	theta2 += direction2 * 0.02;
	
	gl.uniform1f( thetaLoc, theta2 );

	gl.drawArrays( gl.TRIANGLES, 3, 3);
	// update and render
	setTimeout( function(){ requestAnimFrame( render2 ); }, speed2 );
}
function render3(){
	theta3 += direction3 * 0.02;
	
	gl.uniform1f( thetaLoc, theta3 );

	gl.drawArrays( gl.TRIANGLES, 6, 3);
	// update and render
	setTimeout( function(){ requestAnimFrame( render3 ); }, speed3 );
}
function render4(){
	theta4 += direction4 * 0.02;
	
	gl.uniform1f( thetaLoc, theta4 );

	gl.drawArrays( gl.TRIANGLES, 9, 3);
	// update and render
	setTimeout( function(){ requestAnimFrame( render4 ); }, speed4 );
}