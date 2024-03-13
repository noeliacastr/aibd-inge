import React, { useState } from 'react';
import axios from 'axios';

function AlegraTest() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      cliente: cliente,
      producto: producto,
      precio: precio
    };

    try {
        const response = await axios.post('http://127.0.0.1:8000/aibd/alegra', data, {
            headers: {
                'Content-Type': 'application/json',
              }
      });

      if (response.ok) {
        const facturaCreada = await response.json();
        setMensaje(`La factura ${facturaCreada.id} ha sido creada exitosamente.`);
      } else {
        setMensaje('Error al crear la factura de venta.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="App">
      <h1>Crear Factura de Venta</h1>
      <form onSubmit={handleSubmit}>
        <label>Cliente:</label>
        <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        <br />
        <label>Producto:</label>
        <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} required />
        <br />
        <label>Precio:</label>
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        <br />
        <button type="submit">Crear Factura</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AlegraTest;
