// Music player 
//design and develop by Amit Barman
const playbtn=document.querySelector('.mid');
const circleAnemation1=document.querySelector('.circle1');
const circleAnemation2=document.querySelector('.circle2');

window.onload = function() {
  
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    
    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      var canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = 256;
  
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
  
      var dataArray = new Uint8Array(bufferLength);
  
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
  
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
  
      function renderFrame() {
        requestAnimationFrame(renderFrame);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
  
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          
          var r = barHeight + (25 * (i/bufferLength));
          var g = 250 * (i/bufferLength);
          var b = 50;
  
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
  
          x += barWidth + 1;
        }
      }
      
      audio.play();
      renderFrame();
      setWheelanimation();
    };
  };


  function playPause(){
    if(audio.paused){
      audio.play();
      setWheelanimation();
    }else{
      audio.pause();
      removeWheelanimation();
    }
  }
  
  function setWheelanimation(){
    circleAnemation1.setAttribute('id','circle1');
    circleAnemation2.setAttribute('id','circle2');
  }
  function removeWheelanimation(){
    circleAnemation1.removeAttribute('id','circle1');
    circleAnemation2.removeAttribute('id','circle2');
  }