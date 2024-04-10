import React, { useEffect, useState } from 'react';

function Detection() {
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
  
    useEffect(() => {
      const newSocket = new WebSocket("ws://localhost:8000/ws");
  
      newSocket.onopen = () => {
        console.log("WebSocket connected");
        // Inicia el temporizador cuando la conexión WebSocket está abierta
        startInterval(newSocket);
      };
  
      newSocket.onmessage = event => {
        setMessage(event.data);
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
  
    const sendMessage = () => {
      if (socket) {
        socket.send("Hello, server!");
      }
    };
  
    return (
      <div>
        <h1>WebSocket Example</h1>
        <button onClick={sendMessage}>Send Message</button>
        <p>Received Message: {message}</p>
      </div>
    );
  }

export default Detection;