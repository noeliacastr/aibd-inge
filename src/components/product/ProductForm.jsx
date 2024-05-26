import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';




const ProductForm = ({ onSubmit, initialValue }) => {
    const [producto, setProduct] = useState(
        {
          "idProducto": initialValue.idProducto || 0,
          "titulo": initialValue.titulo || "",
          "descrip": initialValue.descrip || "",
          "precio": initialValue.precio || 0,
        }
      );
      
  
    const handleChangeInput = (e) => {
      setProduct({
        ...producto,
        [e.target.name]: e.target.value
      })
    }
  
    const renderField = (label) => (
      <div>
        <label>{label}</label>
        <input onChange={handleChangeInput}/>
      </div>
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(producto);
      setProduct({
        idProducto: 0,
        titulo: "",
        descrip: "",
        precio: 0
      })
    }
    return (
    //   <form onSubmit={handleSubmit}>
    //     {renderField('Title')}
    //     {renderField('Body')}
    //     <button type="submit">Submit</button>
    //   </form>
    <>
    <div className="fondo-from-conteiner">
    <div className="container formulario-custom">
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="rowCreate">
            <div className="input-field col s6">
              <input
                id="titulo"
                name="titulo"
                type="text"
                className="validate"
                value={producto.titulo}
                onChange={handleChangeInput}
              />
              <label htmlFor="titulo">Nombre del producto</label>
            </div>
            <div className="input-field col s6">
              <input
                id="descrip"
                name="descrip"
                type="text"
                className="validate"
                value={producto.descrip}
                onChange={handleChangeInput}
              />
              <label htmlFor="descrip">Descripción</label>
            </div>
          </div>
          <div className="rowCreate">
            <div className="input-field col s12">
              <input
                id="precio"
                name="precio"
                type="number"
                className="validate"
                value={producto.precio}
                onChange={handleChangeInput}
              />
              <label htmlFor="precio">Precio</label>
            </div>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>

            <button type="button" className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </>
    );
  };
  
  export default ProductForm