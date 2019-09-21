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

      function init() {
        video = document.querySelector('video');
        // Get the canvas and obtain a context for
        // drawing in it
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext('2d');
      }

      function snapshot() {
        // Draws current image from the video element into the canvas
        console.log(webcamStream);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        webcamStream.getTracks().forEach(function(track) {
          track.stop();
        });
        var dataURL = canvas.toDataURL('image/jpeg', 1.0);
        document.querySelector('#dl-btn').href = dataURL;

        console.log(dataURL)

      }
