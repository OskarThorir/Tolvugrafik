/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teiknar punkt � strigann �ar sem notandinn smellir m�sinni
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2021
/////////////////////////////////////////////////////////////////
var canvas;
var gl;


var maxNumPoints = 200;       // H�marksfj�ldi punkta sem forriti� r��ur vi�!
var index = 0;                // N�mer n�verandi punkts
var count = 0;
var radius = 0.1;
var tripoints=[];

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // T�kum fr� minnispl�ss � graf�kminni fyrir maxNumPoints tv�v�� hnit (float er 4 b�ti)
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumPoints, gl.DYNAMIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    // Me�h�ndlun � m�sarsmellum
    canvas.addEventListener("mousedown", function(e){

        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
        
        // Reikna heimshnit m�sarinnar �t fr� skj�hnitum
        var x = 2*e.offsetX/canvas.width-1;
        var y = 2*(canvas.height-e.offsetY)/canvas.height-1;
        var t = vec2(x, y);
       
        // Reikna út hnit hnúta þríhyrningsins
        /*var vertices= new Float32Array( [x, y+radius,
                                         x*Math.cos(Math.PI*2/3)-y*Math.cos(Math.PI*2/3), x*Math.cos(Math.PI*2/3)+y*Math.cos(Math.PI*2/3),
                                         x*Math.cos(Math.PI*2/3)-y*Math.cos(Math.PI*2/3), x*Math.cos(Math.PI*4/3)+y*Math.cos(Math.PI*4/3)]);
        */
        
        a=vec2(x, y+radius);
        b=vec2(x*Math.cos(Math.PI*2/3)-y*Math.cos(Math.PI*2/3), x*Math.cos(Math.PI*2/3)+y*Math.cos(Math.PI*2/3));
        c=vec2(x*Math.cos(Math.PI*2/3)-y*Math.cos(Math.PI*2/3), x*Math.cos(Math.PI*4/3)+y*Math.cos(Math.PI*4/3));
        tripoints.push(a, b, c);


        // F�ra �essi hnit yfir � graf�kminni, � r�ttan sta�
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

        index++;
    } );

    render();
}


function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3*index);

    window.requestAnimFrame(render);
}