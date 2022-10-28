"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];
var colors = [];


var theta=0;
var se = document.getElementById("select").value;
var twist=true;


console.log(twist);

var radius=1.0;

var tab1=document.getElementById("tab1");
var tab2=document.getElementById("tab2");

function change(){
	var se = document.getElementById("select").value;
	if(se=="1"||se=="2"||se=="3"){
	tab1.style.display="block";
	tab2.style.display="none";}
	else{
		tab2.style.display="block";
		tab1.style.display="none";
	}
	initTriangles();
}
window.onload = initTriangles();
function initTriangles(){
	canvas = document.getElementById( "gl-canvas" );
	var se = document.getElementById("select").value;
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	if(se=="5"||se=="4"){
		dd();
	}
	if(se=="3"){
		theta=0;
		cc();
	}
	if(se=="2"){
		bb();
	}
	if(se=="1"){
		aa();
	}
};

function aa(){
	canvas = document.getElementById( "gl-canvas" );
	var numTimesToSubdivide = document.getElementById("num").value;
	console.log(numTimesToSubdivide);
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	var vertices = [
		-1, -1,  0,
		 0,  1,  0,
		 1, -1,  0
	];

	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	divideTriangle( u, v, w, numTimesToSubdivide );
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	renderTriangles();
	points = [];
};

function triangle( a, b, c ){
	//var k;
	points.push( a[0], a[1], a[2] );
	points.push( b[0], b[1], b[2] );
	points.push( c[0], c[1], c[2] );
	
}

function divideTriangle( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		triangle( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		--count;

		// three new triangles
		divideTriangle( a, ab, ca, count );
		divideTriangle( b, bc, ab, count );
		divideTriangle( c, ca, bc, count );
	}
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, points.length/3 );
}
function bb() {
    canvas = document.getElementById("gl-canvas");
	var numTimesToSubdivide = document.getElementById("num").value;
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    var vertices = [
        0.0000, 0.0000, -1.0000,
        0.0000, 0.9428, 0.3333,
        -0.8165, -0.4714, 0.3333,
        0.8165, -0.4714, 0.3333
    ];

    var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
    var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
    var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
    var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

    divideTetra2(t, u, v, w, numTimesToSubdivide);
	gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	var program = initShaders(gl, "vertex-shader2", "fragment-shader2");
    gl.useProgram(program);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render2();
	 points = [];
	 colors = [];
};


function triangle2(a, b, c, color) {

    var baseColor = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 0.0
    ];

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(a[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(b[k]);

    for (var k = 0; k < 3; k++) {
        colors.push(baseColor[color * 3 + k]);
    }
    for (var k = 0; k < 3; k++)
        points.push(c[k]);
}

function tetra2(a, b, c, d) {
    triangle2(a, c, b, 0);
    triangle2(a, c, d, 1);
    triangle2(a, b, d, 2);
    triangle2(b, c, d, 3);
}

function divideTetra2(a, b, c, d, count) {
    // check for end of recursion
    if (count == 0) {
        tetra2(a, b, c, d);
    } else {
        var ab = vec3.create();
        vec3.lerp(ab, a, b, 0.5);
        var ac = vec3.create();
        vec3.lerp(ac, a, c, 0.5);
        var ad = vec3.create();
        vec3.lerp(ad, a, d, 0.5);
        var bc = vec3.create();
        vec3.lerp(bc, b, c, 0.5);
        var bd = vec3.create();
        vec3.lerp(bd, b, d, 0.5);
        var cd = vec3.create();
        vec3.lerp(cd, c, d, 0.5);

        --count;

        divideTetra2(a, ab, ac, ad, count);
        divideTetra2(ab, b, bc, bd, count);
        divideTetra2(ac, bc, c, cd, count);
        divideTetra2(ad, bd, cd, d, count);
    }

}

function render2() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);
}
function cc(){
	canvas = document.getElementById( "gl-canvas" );
	var numTimesToSubdivide = document.getElementById("num").value;
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    // R=0.6, Theta = 90, 210, -30
	var vertices = [
        radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,
        radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,
        radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangle3( u, v, w, numTimesToSubdivide );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader3", "fragment-shader3" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderTriangles3();
	points = [];
};

function dd(){
	canvas = document.getElementById( "gl-canvas" );
	var numTimesToSubdivide = document.getElementById("num2").value;
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    // R=0.6, Theta = 90, 210, -30
	var vertices = [
        radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,
        radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,
        radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );

	divideTriangle3( u, v, w, numTimesToSubdivide );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader3", "fragment-shader3" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	renderTriangles3();
	points = [];
};

function tessellaTriangle( a, b, c ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
	theta=document.getElementById("theta").value;
    var radian = theta * Math.PI / 180.0;
    
    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();
	var se = document.getElementById("select").value;
    if( se == "4"||se=="3" ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );
        
        points.push( a_new[0], a_new[1], a_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
        points.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var d_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var d_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var d_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );

        vec3.set( a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin( d_a * radian ), 
            a[0] * Math.sin( d_a * radian ) + a[1] * Math.cos( d_a * radian ), 0 );
        vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
            b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
        vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
            c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);
        
        points.push(a_new[0], a_new[1], a_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
        points.push(a_new[0], a_new[1], a_new[2]);
    
    }
}

function divideTriangle3( a, b, c, count ){
	// check for end of recursion
	if( count == 0 ){
		tessellaTriangle( a, b, c );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

		divideTriangle3( a, ab, ca, count-1 );
		divideTriangle3( ab, b, bc, count-1 );
        divideTriangle3( ca, bc, c, count-1 );
        divideTriangle3( ab, bc, ca, count-1 );
	}
}

function renderTriangles3(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, points.length/3 );
}