import React, { useEffect, useState } from 'react';
import Navbar from "../layout/Navbar";

function Notification() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000/ws");

    newSocket.onopen = () => {
      // Inicia el temporizador cuando la conexión WebSocket está abierta
      startInterval(newSocket);
    };

    newSocket.onmessage = event => {
      // Agregar el mensaje recibido al estado de mensajes
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const startInterval = (socket) => {
    // Establece un temporizador para enviar un mensaje cada 5 segundos
    const intervalId = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send("Ping from client");
      }
    }, 5000);

    // Limpia el temporizador cuando se cierra la conexión WebSocket
    socket.onclose = () => {
      clearInterval(intervalId);
    };
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket) {
      socket.send(message);
      setMessage(''); // Limpiar el mensaje después de enviarlo
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <h1>Detecciónes</h1>
      <div class="containerNoti center-align">
        <div class="row">
          {messages.map((message, index) => (
            <div class="col s12 m6" key={index}>
              <div class="card blue-grey darken-3">
                <div class="card-content white-text">
                  <span class="card-title"></span>
                  <p>{message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Notification;