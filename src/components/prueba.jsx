import React, { useState } from 'react';

const Prueba = () => {
    const [pc, setPc] = useState(null);

    // Función para crear la conexión peer
    const createPeerConnection = () => {
        const config = {
            sdpSemantics: 'unified-plan'
        };
        if (true) {
            config.iceServers = [
                {
                    urls: ['stun:stun.zerpatechnology.com:3478']
                },
                {
                    urls: ['turn:turn.zerpatechnology.com:3478'],
                    username: 'zerpatec',
                    credential: 'prueba.2023'
                }
            ];
        }

        const peerConnection = new RTCPeerConnection(config);

        // Registro de listeners para debugging
        peerConnection.addEventListener('icegatheringstatechange', () => {
            // Lógica de actualización de estado
        });
        // Otros listeners...

        // Devolver la conexión peer creada
        return peerConnection;
    };

    const start = () => {
        // Lógica para iniciar la conexión
        const peerConnection = createPeerConnection();
        setPc(peerConnection);
        // Otro código de inicio...
    };

    const stop = () => {
        // Lógica para detener la conexión
        if (pc) {
            pc.close();
            setPc(null);
        }
        // Otro código de cierre...
    };

    return (
        <>
            <video id="video" autoPlay={true} playsInline={true}></video>
            <button
                id="start"
                className="btn btn-primary"
                onClick={start}
            >
                Conectar
            </button>
            <button
                id="stop"
                style={{ display: pc ? 'inline-block' : 'none' }}
                className="btn btn-primary"
                onClick={stop}
            >
                Desconectar
            </button>
            <input id="use-video" type="checkbox" />
            <label htmlFor="use-video">Usar vídeo</label>
        </>
    );
};

export default Prueba;
