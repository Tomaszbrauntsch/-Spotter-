import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    let width = 320;    // We will scale the photo width to this
    let height = 0;     // This will be computed based on the input stream
  
    let streaming = false;
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;
  
  }

  componentDidMount() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.photo = document.getElementById('photo');
    this.startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      this.video.srcObject = stream;
      this.video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });

  }

  clearPhoto() {
    return;
  }

  takePicture() {
    var context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
    
      var data = this.canvas.toDataURL('image/png');
      this.photo.setAttribute('src', data);
    } else {
      this.clearPhoto();
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <body>
            <div class="camera">
              <video id="video">Video stream not available.</video>
              <button id="startbutton" onClick={() => { this.takePicture(); }}>Take photo</button>
            </div>
            <canvas id="canvas" />
            <div class="output">
              <img id="photo" alt="The screen capture will appear in this box." />
            </div>
          </body>
        </header>
      </div>
    );
  }
}

export default App;



