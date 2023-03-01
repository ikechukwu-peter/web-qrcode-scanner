// Get the video and canvas elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define media stream constraints
const constraints = {
  video: {
    facingMode: { exact: "environment" }, // Use rear-facing camera
  },
};

alert(JSON.stringify(constraints));
// Start the video stream
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error("Error starting video stream: ", err);
  });

// Scan for QR codes every frame
function scan() {
  // Draw the video frame to the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Try to decode the QR code from the image data
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  // If a QR code was found, display the result
  if (code) {
    console.log(code.data, code);
    document.getElementById("result").innerHTML = code.data;
    alert("WHAT I GOT", JSON.stringify(code.data));
  }

  // Call the scan function again on the next frame
  requestAnimationFrame(scan);
}

// Start scanning
requestAnimationFrame(scan);
