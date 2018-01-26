'use strict';
    
window.addEventListener('load', function (evt) {
    let elVideo = document.getElementById('remoteVideo');

    navigator.getUserMedia({audio: false, video: true},
        function (stream) {
            elVideo.src = window.URL.createObjectURL(stream)
        },
  
        function (err) {
            console.log('The following error occurred: ' + err.name)
        }
    )
})