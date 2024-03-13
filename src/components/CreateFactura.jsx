import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {craeteFactura} from "../api/factura"
import Swal from "sweetalert2";

const CreateFactura = ({}) => {
   
    const [factura, setFactura] = useState({
        cliente: "",
        producto: "",
        precio: 0,
    });
    const [mensaje, setMensaje] = useState('');
    const queyCLient = useQueryClient();

    const create = useMutation({
        mutationFn: craeteFactura,
        onSuccess: () => {
            queyCLient.invalidateQueries("factura");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Empleado agregado!",
                showConfirmButton: false,
                timer: 1500,
              });
        setMensaje('La factura ha sido creada')
        },
        onError: () => {
            setMensaje('Error, la factura no ha sido creada')
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        create.mutate({
            ...factura,
        });
    };

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFactura((factura) => ({
            ...factura,
            [name]:value,
        }));
    };

    return (
        <div>
        <h1>Crear Factura de Venta</h1>
        <form onSubmit={handleSubmit} className="form-dialog">
        <div className="row">
            <div className="input-field col s6">
              <input
                id="cliente"
                type="text"
                name="cliente"
                className="validate"
                value={factura.cliente}
                onChange={handleChange}
              />
              <label htmlFor="cliente">Cliente</label>
            </div>
          </div>

         <div className="row">
            <div className="input-field col s6">
              <input
                id="producto"
                type="text"
                name="producto"
                className="validate"
                value={factura.producto}
                onChange={handleChange}
              />
              <label htmlFor="producto">Producto</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="precio"
                type="number"
                name="precio"
                className="validate"
                value={factura.precio}
                onChange={handleChange}
              />
              <label htmlFor="precio">Precio</label>
            </div>
          </div>

        <div className="row">
          <button type="submit"  className="button-primary"
          onClick={handleSubmit}>
            Guardar
          </button>

          <button
            type="button"
            className="button-secondary"
          >
            Cancelar
          </button>
        </div>

      </form>
      {mensaje && <p>{mensaje}</p>}
        </div>
    )


}

export default CreateFactura;