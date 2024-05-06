import React, { useState, useEffect, createContext } from 'react';

window.BACKEND="https://demo.alicia.software/backend";


const WebRTCComponent = () => {
  const [dataChannelLog, setDataChannelLog] = useState('');
  const [iceConnectionLog, setIceConnectionLog] = useState('');
  const [iceGatheringLog, setIceGatheringLog] = useState('');
  const [signalingLog, setSignalingLog] = useState('');

// Estado para la conexión de pares y el canal de datos
const [pc, setPc] = useState(null);
const [dc, setDc] = useState(null);
const [dcInterval, setDcInterval] = useState(null);

const createPeerConnection = () => {
  // Tu implementación existente aquí
  var config = {
    sdpSemantics: 'unified-plan'
};
//document.getElementById('use-stun').checked
if (true) {
    config.iceServers = [
        {urls: [
        'stun:stun.zerpatechnology.com:3478'
        ]},
        {urls: [
            "turn:turn.zerpatechnology.com:3478"],
        username:"zerpatec",
        credential:"prueba.2023"
        }


    ];
}

const pc = new RTCPeerConnection(config);

// register some listeners to help debugging
pc.addEventListener('icegatheringstatechange', function() {
}, false);

pc.addEventListener('iceconnectionstatechange', function() {
}, false);


pc.addEventListener('signalingstatechange', function() {
}, false);

// connect audio / video
pc.addEventListener('track', function(evt) {

    if (evt.track.kind == 'video')
        document.getElementById('video').srcObject = evt.streams[0];
    else
        document.getElementById('audio').srcObject = evt.streams[0];
});

return pc;
};

const negotiate = (pc) => {
  /* Esto es super importante no quitar*/
  console.log(pc,"dentro de pc");
  window.NGROK_MODE = true
  ORDEN = "1107f267-f5ed-491b-a0c3-5ec9fa3c1a6e";
  SERVIDOR_ID = 2
  pc.addTransceiver('video', {direction: 'recvonly'});
  pc.addTransceiver('audio', {direction: 'recvonly'});
  /*------------*/
  console.log("Negociando")
  return pc.createOffer().then(function(offer) {

      return pc.setLocalDescription(offer);
  }).then(function() {
      // wait for ICE gathering to complete
      return new Promise(function(resolve) {
          if (pc.iceGatheringState === 'complete') {
              resolve();
          } else {
              function checkState() {
                  if (pc.iceGatheringState === 'complete') {
                      pc.removeEventListener('icegatheringstatechange', checkState);
                      resolve();
                  }
              }
              pc.addEventListener('icegatheringstatechange', checkState);
          }
      });
  }).then(async function() {
      var offer = pc.localDescription;
      var codec;

      codec = document.getElementById('audio-codec').value;
      if (codec !== 'default') {
          offer.sdp = sdpFilterCodec('audio', codec, offer.sdp);
      }

      codec = document.getElementById('video-codec').value;
      if (codec !== 'default') {
          offer.sdp = sdpFilterCodec('video', codec, offer.sdp);
      }

      document.getElementById('offer-sdp').textContent = offer.sdp;
      console.log("TTTTTTTTTTTTTTTTTT",{
                  sdp: offer.sdp,
                  type: offer.type,
                  video_transform: document.getElementById('video-transform').value
              })
      req=await fetch(window.BACKEND+`/servers/${window.SERVIDOR_ID}/ngrok`)
      data=await req.json()
      let use_webcam=document.querySelector("#use-video").checked
      if (window.NGROK_MODE){
          console.log("wwwwwwwwwwwwwww ",data["ngrok"]+`/offer?use_webcam=${use_webcam}&analytic=${ORDEN}`)
          return fetch(data["ngrok"]+`/offer?use_webcam=${use_webcam}&analytic=${ORDEN}`, {
              body: JSON.stringify({
                  sdp: offer.sdp,
                  type: offer.type,
                  video_transform: document.getElementById('video-transform').value
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
      }
      else{
          return fetch(window.BACKEND2+`/offer?use_webcam=${use_webcam}&analytic=${ORDEN}`, {
              body: JSON.stringify({
                  sdp: offer.sdp,
                  type: offer.type,
                  video_transform: document.getElementById('video-transform').value
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
  }
  }).then(function(response) {
      return response.json();
  }).then(function(answer) {
      document.getElementById('answer-sdp').textContent = answer.sdp;

      return pc.setRemoteDescription(answer);
  }).catch(function(e) {
      alert(e);
  });
};

const start = () => {
  console.log(document.getElementById('start'),"entra al start");
  document.getElementById('start').style.display = 'none';


  const pc = createPeerConnection();

  var time_start = null;

  function current_stamp() {
      if (time_start === null) {
          time_start = new Date().getTime();
          return 0;
      } else {
          return new Date().getTime() - time_start;
      }
  }
  

  var constraints = {
      video: document.getElementById('use-video').checked,
      audio:false
  };
  
  if (constraints.video) {
      var resolution = false//document.getElementById('video-resolution').value;
      if (resolution) {
          resolution = resolution.split('x');
          constraints.video = {
              width: parseInt(resolution[0], 0),
              height: parseInt(resolution[1], 0)
          };
      } else {
          constraints.video = true;
      }
  }
  
  if ( constraints.video) {
      
      
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      
      stream.getTracks().forEach(function(track) {
          pc.addTrack(track, stream);
      });
      
      return negotiate(pc);
      }, function(err) {
          alert('Could not acquire media: ' + err);
      });
      
  }
  else{
      negotiate(pc);
  }

  document.getElementById('stop').style.display = 'inline-block';
};

const stop = () => {
  document.getElementById('stop').style.display = 'none';
  document.getElementById('start').style.display = 'inline-block';

  if (window.NGROK_MODE){
          

          return fetch(data["ngrok"]+`/disconnect`, {
              body: JSON.stringify({
                  analytic: ORDEN
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
      }
      else{
          return fetch(window.BACKEND2+`/disconnect`, {
              body: JSON.stringify({
                  analytic: ORDEN
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
  }
  // close data channel
  if (dc) {
      dc.close();
  }

  // close transceivers
  if (pc.getTransceivers) {
      pc.getTransceivers().forEach(function(transceiver) {
          if (transceiver.stop) {
              transceiver.stop();
          }
      });
  }

  // close local audio / video
  pc.getSenders().forEach(function(sender) {
      sender.track.stop();
  });

  // close peer connection
  setTimeout(function() {
      pc.close();
  }, 500);
};

const sdpFilterCodec = (kind, codec, realSdp)  =>{
  var allowed = []
    var rtxRegex = new RegExp('a=fmtp:(\\d+) apt=(\\d+)\r$');
    var codecRegex = new RegExp('a=rtpmap:([0-9]+) ' + escapeRegExp(codec))
    var videoRegex = new RegExp('(m=' + kind + ' .*?)( ([0-9]+))*\\s*$')
    
    var lines = realSdp.split('\n');

    var isKind = false;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('m=' + kind + ' ')) {
            isKind = true;
        } else if (lines[i].startsWith('m=')) {
            isKind = false;
        }

        if (isKind) {
            var match = lines[i].match(codecRegex);
            if (match) {
                allowed.push(parseInt(match[1]));
            }

            match = lines[i].match(rtxRegex);
            if (match && allowed.includes(parseInt(match[2]))) {
                allowed.push(parseInt(match[1]));
            }
        }
    }

    var skipRegex = 'a=(fmtp|rtcp-fb|rtpmap):([0-9]+)';
    var sdp = '';

    isKind = false;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('m=' + kind + ' ')) {
            isKind = true;
        } else if (lines[i].startsWith('m=')) {
            isKind = false;
        }

        if (isKind) {
            var skipMatch = lines[i].match(skipRegex);
            if (skipMatch && !allowed.includes(parseInt(skipMatch[2]))) {
                continue;
            } else if (lines[i].match(videoRegex)) {
                sdp += lines[i].replace(videoRegex, '$1 ' + allowed.join(' ')) + '\n';
            } else {
                sdp += lines[i] + '\n';
            }
        } else {
            sdp += lines[i] + '\n';
        }
    }

    return sdp;
};
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

return (
<div>
    <video id="video" autoPlay playsInline></video>
    <button id="start" className="btn btn-primary" onClick={start}>Conectar</button>
    <button id="stop" style={{ display: 'none' }} className="btn btn-primary" onClick={stop}>Desconectar</button>
    <input id="use-video" type="checkbox"/>
    <label htmlFor="use-video">Use video</label>
</div>
);
};

export default WebRTCComponent;