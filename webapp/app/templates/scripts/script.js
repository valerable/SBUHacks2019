const captureVideoButton =
document.querySelector('#capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
const img = document.querySelector('img');
const video = document.querySelector('video');
const canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
captureVideoButton.onclick = function() {
	navigator.mediaDevices.getUserMedia(constraints).
		then(handleSuccess).catch(handleError);
};

screenshotButton.onclick = video.onclick = function() {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d').drawImage(video, 0, 0);
	// Other browsers will fall back to image/png
	img.src = canvas.toDataURL('image/jpeg', 1.0);
	// Now send this photo to the backend
	$.post("/postmethod", {
		javascript_data: img
	});
};

function handleSuccess(stream) {
	screenshotButton.disabled = false;
	video.srcObject = stream;
}

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			video.play();
			});
}

// Trigger photo take
screenshotButton.addEventListener("click", function() {
		context.drawImage(video, 0, 0, 640, 480);
		});

