//--------------------
// GET USER MEDIA CODE
//--------------------


var video;
var webcamStream;

function startWebcam() {
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(function (stream) {
					video.srcObject = stream;
					})
		.catch(function (err0r) {
				console.log("Something went wrong!");
				});
	}
}


//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	//Old Code
	//write the ArrayBuffer to a blob, and you're done
	//var bb = new BlobBuilder();
	//bb.append(ab);
	//return bb.getBlob(mimeString);

	//New Code
	return new Blob([ab], {type: mimeString});


}
function init() {
	video = document.querySelector('video');
	// Get the canvas and obtain a context for
	// drawing in it
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext('2d');
}

function snapshot() {
	// Draws current image from the video element into the canvas
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	var dataURL = canvas.toDataURL('image/jpeg', 1.0);
	document.querySelector('#dl-btn').href = dataURL;
	console.log(dataURL)
	//NOW WE NEED TO SEND IT TO FLASK
	let blob = dataURItoBlob(dataURL);
	var fd = new FormData(document.forms[0]);
	var xhr = new XMLHttpRequest();
	fd.append("myFile", blob);
	xhr.open('POST', '/upload', true);
	xhr.send(fd);
}


