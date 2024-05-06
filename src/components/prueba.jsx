import React, { useState } from 'react';

const Prueba = () => {
    const [pc, setPC] = useState(null); // Utiliza useState para manejar pc como estado
    let dc = null;
    let dcInterval = null;

    function createPeerConnection() {
        const config = {
            sdpSemantics: 'unified-plan'
        };

        // Configura los servidores ICE
        if (true) { // Ajusta esta condición según tus necesidades
            config.iceServers = [
                { urls: ['stun:stun.zerpatechnology.com:3478'] },
                { urls: ['turn:turn.zerpatechnology.com:3478'], username: 'zerpatec', credential: 'prueba.2023' }
            ];
        }

        const peerConnection = new RTCPeerConnection(config);

        // Agrega event listeners para el estado de ICE
        peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log('ICE Gathering State:', peerConnection.iceGatheringState);
        });

        peerConnection.addEventListener('iceconnectionstatechange', () => {
            console.log('ICE Connection State:', peerConnection.iceConnectionState);
        });

        peerConnection.addEventListener('signalingstatechange', () => {
            console.log('Signaling State:', peerConnection.signalingState);
        });

        // Maneja la llegada de tracks
        peerConnection.addEventListener('track', (event) => {
            const stream = event.streams[0];
            const mediaElement = document.getElementById('video');
            if (mediaElement) {
                mediaElement.srcObject = stream;
            }
        });

        return peerConnection;
    }

    async function negotiate() {
        // Agrega transceivers para video y audio
        pc.addTransceiver('video', { direction: 'recvonly' });
        pc.addTransceiver('audio', { direction: 'recvonly' });

        console.log('Negociando');
        
        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            // Espera a que termine la recolección ICE
            await new Promise((resolve) => {
                if (pc.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    pc.addEventListener('icegatheringstatechange', () => {
                        if (pc.iceGatheringState === 'complete') {
                            resolve();
                        }
                    });
                }
            });

            const offerSDP = pc.localDescription.sdp;
            console.log('Offer SDP:', offerSDP);

            // Realiza una solicitud HTTP para obtener datos de NGROK (supongo que esto está definido en otro lugar)
            const req = await fetch(window.BACKEND + `/servers/${window.SERVIDOR_ID}/ngrok`);
            const data = await req.json();
            const useWebcam = document.querySelector('#use-video').checked;

            const url = window.NGROK_MODE ? data.ngrok : window.BACKEND2;
            const response = await fetch(`${url}/offer?use_webcam=${useWebcam}&analytic=${ORDEN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sdp: offerSDP,
                    type: pc.localDescription.type,
                    video_transform: document.getElementById('video-transform').value
                })
            });

            const answer = await response.json();
            document.getElementById('answer-sdp').textContent = answer.sdp;

            await pc.setRemoteDescription(answer);
        } catch (e) {
            console.error('Error during negotiation:', e);
            alert(e.message);
        }
    }

    function start() {
        document.getElementById('start').style.display = 'none';
        document.getElementById('stop').style.display = 'inline-block';

        const pc = createPeerConnection();

        const useDataChannel = document.getElementById('use-datachannel').checked;
        if (useDataChannel) {
            const parameters = JSON.parse(document.getElementById('datachannel-parameters').value);

            dc = pc.createDataChannel('chat', parameters);
            dc.onclose = () => {
                clearInterval(dcInterval);
                console.log('Data Channel Closed');
            };
            dc.onopen = () => {
                console.log('Data Channel Opened');
                dcInterval = setInterval(() => {
                    const message = 'ping ' + Date.now();
                    dc.send(message);
                    console.log('> ' + message);
                }, 1000);
            };
            dc.onmessage = (evt) => {
                console.log('< ' + evt.data);

                if (evt.data.substring(0, 4) === 'pong') {
                    const elapsedMs = Date.now() - parseInt(evt.data.substring(5), 10);
                    console.log('RTT ' + elapsedMs + ' ms');
                }
            };
        }

        const useVideo = document.getElementById('use-video').checked;
        const constraints = {
            video: useVideo,
            audio: false
        };

        if (useVideo) {
            const resolution = document.getElementById('video-resolution').value;
            if (resolution) {
                const [width, height] = resolution.split('x');
                constraints.video = { width: parseInt(width, 10), height: parseInt(height, 10) };
            }
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });
                return negotiate();
            })
            .catch((err) => {
                console.error('Error acquiring media:', err);
                alert('Could not acquire media: ' + err.message);
            });
    }

    function stop() {
        document.getElementById('start').style.display = 'inline-block';
        document.getElementById('stop').style.display = 'none';

        // Cierra el data channel
        if (dc) {
            dc.close();
        }

        // Detiene los transceivers
        if (pc.getTransceivers) {
            pc.getTransceivers().forEach((transceiver) => {
                if (transceiver.stop) {
                    transceiver.stop();
                }
            });
        }

        // Detiene las pistas locales de audio / video
        pc.getSenders().forEach((sender) => {
            if (sender.track) {
                sender.track.stop();
            }
        });

        // Cierra la conexión peer
        setTimeout(() => {
            if (pc) {
                pc.close();
            }
        }, 500);
    }

    return (
        <>
            <video id="video" autoPlay={true} playsInline={true}></video>
            <button id="start" className="btn btn-primary" onClick={start}>
                Conectar
            </button>
            <button id="stop" className="btn btn-primary" style={{ display: 'none' }} onClick={stop}>
                Desconectar
            </button>
            <input id="use-video" type="checkbox" />
            <label htmlFor="use-video">Usar vídeo</label>
        </>
    );
};

export default Prueba;
