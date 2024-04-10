import React, { useEffect, useState } from 'react';

function Detecion() {

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
      console.log("Message from server ", event.data);
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
 // Create WebSocket connection.
// Listen for messages

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={sendMessage}>Send Message</button>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Received Message</h5>
          <p key={message} className="card-text">{message}</p>
        </div>
      </div>
    </div>
  );
  }
  
  export default Detecion;


// function Detecion() {
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = new WebSocket("ws://localhost:8000/ws");

//     newSocket.onopen = () => {
//       console.log("WebSocket connected");
//       // Inicia el temporizador cuando la conexión WebSocket está abierta
//       startInterval(newSocket);
//     };

//     newSocket.onmessage = event => {
//       console.log("Message from server ", event.data);
//       const parsedMessage = JSON.parse(event.data); // Analiza el mensaje JSON
//       setMessage(parsedMessage);
//     };

//     setSocket(newSocket);

//     return () => {
//       // Cerrar la conexión WebSocket antes de desmontar el componente
//       if (newSocket) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   const startInterval = (socket) => {
//     // Establece un temporizador para enviar un mensaje cada 5 segundos
//     const intervalId = setInterval(() => {
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.send("Ping from client");
//       } else {
//         console.log("WebSocket connection not open.");
//         clearInterval(intervalId);
//       }
//     }, 5000);
  
//     // Limpia el temporizador cuando se cierra la conexión WebSocket
//     socket.onclose = () => {
//       clearInterval(intervalId);
//     };
//   };

//   const sendMessage = () => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send("Hello, server!");
//     } else {
//       console.log("WebSocket connection not open.");
//     }
//   };

//   return (
//     <div>
//       <h1>WebSocket Example</h1>
//       <button onClick={sendMessage}>Send Message</button>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Received Message</h5>
//           <p className="card-text">{message}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Detecion;

// function Detecion() {
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState(null);
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     const newSocket = new WebSocket("ws://localhost:8000/ws");

//     newSocket.onopen = () => {
//       console.log("WebSocket connected");
//       // Inicia el temporizador cuando la conexión WebSocket está abierta
//       startInterval(newSocket);
//     };

//     newSocket.onmessage = event => {
//       console.log("Message from server ", event.data);
//       const parsedMessage = JSON.parse(event.data); // Analiza el mensaje JSON
//       setMessage(parsedMessage);
//     };

//     setSocket(newSocket);

//     return () => {
//       // Cerrar la conexión WebSocket antes de desmontar el componente
//       if (newSocket) {
//         newSocket.close();
//       }
//       // Detener el temporizador cuando se cierra la conexión WebSocket
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   const startInterval = (socket) => {
//     // Establece un temporizador para enviar un mensaje cada 5 segundos
//     const intervalId = setInterval(() => {
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.send("Ping from client");
//       } else {
//         console.log("WebSocket connection not open.");
//         clearInterval(intervalId);
//       }
//     }, 5000);
  
//     // Limpia el temporizador cuando se cierra la conexión WebSocket
//     socket.onclose = () => {
//       clearInterval(intervalId);
//     };
//     // Guarda el ID del temporizador en el estado
//     setIntervalId(intervalId);
//   };

//   const sendMessage = () => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send("Hello, server!");
//     } else {
//       console.log("WebSocket connection not open.");
//     }
//   };

//   return (
//     <div>
//       <h1>WebSocket Example</h1>
//       <button onClick={sendMessage}>Send Message</button>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Received Message</h5>
//           <p className="card-text">{message}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Detecion;
