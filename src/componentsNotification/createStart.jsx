// import React, { useState, useEffect } from 'react';

// const WebRTCComponent = () => {
// const [pc, setPC] = useState(null);
// const [dc, setDC] = useState(null);
// const [dataChannelLog, setDataChannelLog] = useState('');
// const [iceConnectionLog, setIceConnectionLog] = useState('');
// const [iceGatheringLog, setIceGatheringLog] = useState('');
// const [signalingLog, setSignalingLog] = useState('');

// useEffect(() => {
// const startButton = document.getElementById('start');
// const stopButton = document.getElementById('stop');
// const videoElement = document.getElementById('video');
// const messageVideo = document.getElementById('message-video');

// // Verificar si los elementos existen antes de intentar acceder a sus propiedades
// if (startButton && stopButton && videoElement && messageVideo) {
//     // Asignar estilos u otras configuraciones necesarias
//     // Por ejemplo:
//     startButton.style.display = 'none';
//     messageVideo.style.display = 'inherit';
// }

// // Agregar otras configuraciones necesarias aquí

// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// const createPeerConnection = () => {
// var config = {
//     sdpSemantics: 'unified-plan'
// };

// if (true) {
//     config.iceServers = [
//     {
//         urls: ['stun:stun.zerpatechnology.com:3478']
//     },
//     {
//         urls: ['turn:turn.zerpatechnology.com:3478'],
//         username: 'zerpatec',
//         credential: 'prueba.2023'
//     }
//     ];
// }

// const newPC = new RTCPeerConnection(config);

// newPC.addEventListener('icegatheringstatechange', () => {
//     setIceGatheringLog(prevLog => prevLog + ' -> ' + newPC.iceGatheringState);
// });

// newPC.addEventListener('iceconnectionstatechange', () => {
//     setIceConnectionLog(prevLog => prevLog + ' -> ' + newPC.iceConnectionState);
// });

// newPC.addEventListener('signalingstatechange', () => {
//     setSignalingLog(prevLog => prevLog + ' -> ' + newPC.signalingState);
// });

// setIceGatheringLog(newPC.iceGatheringState);
// setIceConnectionLog(newPC.iceConnectionState);
// setSignalingLog(newPC.signalingState);

// newPC.addEventListener('track', evt => {
//     if (evt.track.kind === 'video') {
//     document.getElementById('video').srcObject = evt.streams[0];
//     }
// });

// setPC(newPC);
// };

// const negotiate = async () => {
// pc.addTransceiver('video', { direction: 'recvonly' });
// pc.addTransceiver('audio', { direction: 'recvonly' });

// try {
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     await new Promise(resolve => {
//     if (pc.iceGatheringState === 'complete') {
//         resolve();
//     } else {
//         function checkState() {
//         if (pc.iceGatheringState === 'complete') {
//             pc.removeEventListener('icegatheringstatechange', checkState);
//             resolve();
//         }
//         }
//         pc.addEventListener('icegatheringstatechange', checkState);
//     }
//     });

//     var codec;
//     var offerSDP = pc.localDescription;

//     codec = document.getElementById('audio-codec').value;
//     if (codec !== 'default') {
//     offerSDP.sdp = sdpFilterCodec('audio', codec, offerSDP.sdp);
//     }

//     codec = document.getElementById('video-codec').value;
//     if (codec !== 'default') {
//     offerSDP.sdp = sdpFilterCodec('video', codec, offerSDP.sdp);
//     }

//     document.getElementById('offer-sdp').textContent = offerSDP.sdp;

//     const req = await fetch(window.BACKEND + `/servers/${window.SERVIDOR_ID}/ngrok`);
//     const data = await req.json();
//     const useWebcam = document.querySelector('#use-video').checked;
//     const response = await fetch(
//     window.NGROK_MODE
//         ? data['ngrok'] + `/offer?use_webcam=${useWebcam}&analytic=${ORDEN}`
//         : window.BACKEND2 + `/offer?use_webcam=${useWebcam}&analytic=${ORDEN}`,
//     {
//         body: JSON.stringify({
//         sdp: offerSDP.sdp,
//         type: offerSDP.type,
//         video_transform: document.getElementById('video-transform').value
//         }),
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         method: 'POST'
//     }
//     );
//     const answer = await response.json();
//     document.getElementById('answer-sdp').textContent = answer.sdp;
//     await pc.setRemoteDescription(answer);
// } catch (error) {
//     alert(error);
// }
// };

// const start = () => {
// document.getElementById('start').style.display = 'none';
// document.getElementById('message-video').style.display = 'inherit';

// createPeerConnection();

// var time_start = null;

// function current_stamp() {
//     if (time_start === null) {
//     time_start = new Date().getTime();
//     return 0;
//     } else {
//     return new Date().getTime() - time_start;
//     }
// }

// if (document.getElementById('use-datachannel').checked) {
//     // Handle Data Channel creation
// }

// var constraints = {
//     video: document.getElementById('use-video').checked,
//     audio: false
// };

// if (constraints.video) {
//     var resolution = false; // Handle video resolution
//     if (resolution) {
//     resolution = resolution.split('x');
//     constraints.video = {
//         width: parseInt(resolution[0], 0),
//         height: parseInt(resolution[1], 0)
//     };
//     } else {
//     constraints.video = true;
//     }
// }

// if (constraints.video) {
//     navigator.mediaDevices.getUserMedia(constraints).then(
//     stream => {
//         stream.getTracks().forEach(track => {
//         pc.addTrack(track, stream);
//         });
//         negotiate();
//     },
//     err => {
//         alert('Could not acquire media: ' + err);
//     }
//     );
// } else {
//     negotiate();
// }

// document.getElementById('stop').style.display = 'inline-block';
// };

// const stop = async () => {
// document.getElementById('stop').style.display = 'none';
// document.getElementById('start').style.display = 'inline-block';

// try {
//     if (window.NGROK_MODE) {
//     const req = await fetch(data['ngrok'] + `/disconnect`, {
//         body: JSON.stringify({
//         analytic: ORDEN
//         }),
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         method: 'POST'
//     });
//     } else {
//     const req = await fetch(window.BACKEND2 + `/disconnect`, {
//         body: JSON.stringify({
//         analytic: ORDEN
//         }),
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         method: 'POST'
//     });
//     }

//     if (dc) {
//     dc.close();
//     }

//     if (pc.getTransceivers) {
//     pc.getTransceivers().forEach(transceiver => {
//         if (transceiver.stop) {
//         transceiver.stop();
//         }
//     });
//     }

//     pc.getSenders().forEach(sender => {
//     sender.track.stop();
//     });

//     setTimeout(() => {
//     pc.close();
//     }, 500);
// } catch (error) {
//     console.error(error);
// }
// };

// const sdpFilterCodec = (kind, codec, realSdp) => {
// // Implement sdpFilterCodec function
// };

// return (
// <div>
//     <video id="video" autoPlay playsInline></video>
//     <button id="start" className="btn btn-primary" onClick={start}>
//     Conectar
//     </button>
//     <button id="stop" className="btn btn-primary" onClick={stop}>
//     Desconectar
//     </button>
//     <input id="use-video" type="checkbox" />
//     <label htmlFor="use-video">Usar video</label>
// </div>
// );
// };

// export default WebRTCComponent;
import React, { useState } from 'react';

const WebcamComponent = () => {
  const [webcamStream, setWebcamStream] = useState(null);
  const [error, setError] = useState(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setWebcamStream(stream);
      setError(null); // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al iniciar la webcam:', error);
      setError('Error al iniciar la webcam. Por favor, verifica tus permisos y intenta nuevamente.');
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {webcamStream ? (
        <div>
          <video autoPlay playsInline muted={true} srcObject={webcamStream}></video>
          <button onClick={stopWebcam}>Detener Webcam</button>
        </div>
      ) : (
        <button onClick={startWebcam}>Iniciar Webcam</button>
      )}
    </div>
  );
};

export default WebcamComponent;


