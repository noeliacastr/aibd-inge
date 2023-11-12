import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { Box, TextField, Grid, Card, CardContent, FormControl, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import M from 'materialize-css';
import LoadingButton from '@mui/lab/LoadingButton';
import './style.css';
import {updateEmployee} from "../api/empleado"
import {getEmployee} from "../api/empleado"



const EditEmpleado = ({initialValue}) => {
     
      const {id}  = useParams();
      const [cedula, setCedula] = useState(id);  
      const navigate = useNavigate();
      M.AutoInit();
      const queyCLient = useQueryClient();
      const [employe, setEmploye] = useState(
        {
          cedula: cedula,
          nombre: "",
          apellidos:   "",
          telefono:  "",
          domicilio: "",
        }
      );
    
      const {
        isLoading,
        isError,
        data: employee,
        error,
        isSuccess,
      } = useQuery({
        queryKey: ["employee"],
        queryFn: () => getEmployee(cedula),
      });
      
      const editEmpleado = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queyCLient.invalidateQueries("employee")
            navigate("/empleados")
        },
      });

      const handleSubmit = (e) => {
        // e.preventDefault()
        console.log(employe)
        editEmpleado.mutate({
          ...employe
        });
      }; 
      const handleChangeInput = (e) => {
        setEmploye({
          ...employee,
          [e.target.name]: e.target.value
        })
      }
      const handleChangeEdit = (e) => {
    
        const { name, value } = e.target;
        console.log(value)
        console.log(name)
            setEmploye((employee) => ({
                ...employee,
                [name]: value
                
            }));
            console.log('Employee State:', employe);
        if (name == "nombre" ){
          employee.nombre = value
        }
        if (name == "apellidos" ){
          employee.apellidos = value
        }
        if (name == "telefono" ){
          employee.telefono = value
        }
        if (name == "email" ){
          employee.email = value
        }
        if (name == "domicilio" ){
          employee.domicilio = value
        }
      };

      if (isLoading) return <div>...is Loading</div>
      else if (isError) return <div>...{error.message}</div>

      return (
     <div >
         <Typography component="h2" variant="h2" >Registro de Usuario</Typography>
        <Box my={2}>
          <Card>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    error={false}
                    label="Cedula"
                    type="number"
                    name="cedula"
                    value={employee.cedula}
                    onChange={handleChangeEdit}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    error={false}
                    label="Nombre"
                    type="text"
                    name="nombre"
                    value={employee.nombre}
                    onChange={handleChangeEdit}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    error={false}
                    label="Apellidos"
                    type="text"
                    name="apellidos"
                    value={employee.apellidos}
                    onChange={handleChangeEdit}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    error={false}
                    label="Telefono"
                    type="tel"
                    name="telefono"
                    value={employee.telefono}
                    onChange={handleChangeEdit}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                  <TextField
                    error={false}
                    label="Domicilio"
                    type="text"
                    name="domicilio"
                    value={employee.domicilio}
                    onChange={handleChangeEdit}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box sx={{ '& > button': { m: 1 } }}>
                    <LoadingButton
                      size="small"
                      onClick={() => handleSubmit()}
                      loading={isLoading}
                      variant="outlined"
                      disabled={!isLoading ? false : true}
                    >
                      Enviar
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Box>
        </div>
  //   <div className="container">
  //     <div className="row">
  //       <form className="col s12" onSubmit={handleSubmit}>
  //         <div className="row">
  //           <div className="input-field col s6">
  //             <input
  //               id="cedula"
  //               type="text"
  //               name = "cedula"
  //               className="validate"
  //               value={employee.cedula}
  //               onChange={handleChangeEdit}
  //             />
  //             <label htmlFor="cedula">Cedula</label>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="input-field col s6">
  //             <input
  //               id="nombre"
  //               name="nombre"
  //               type="text"
  //               className="validate"
  //               value={employee.nombre}
  //               onChange={handleChangeEdit}
  //             />
             
  //           </div>
            
  //           <div className="input-field col s6">
  //             <input
  //               id="apellidos"
  //               name="apellidos"
  //               type="text"
  //               className="validate"
  //               value={employee.apellidos}
  //               onChange={handleChangeEdit}
  //             />
  //             <label htmlFor="apellidos">Apellidos</label>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="input-field col s12">
  //             <input
  //               id="telefono"
  //               name="telefono"
  //               type="tel"
  //               className="validate"
  //               value={employee.telefono}
  //               onChange={handleChangeEdit}
  //             />
  //             <label htmlFor="telefono">Telefono</label>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="input-field col s6">
  //             <input
  //               id="domicilio"
  //               name="domicilio"
  //               type="text"
  //               className="validate"
  //               value={employee.domicilio}
  //               onChange={handleChangeEdit}
  //             />
  //             <label htmlFor="domicilio">Domicilio</label>
  //           </div>

           
  //         </div>
          
          

  //         <div className="row">
  //           <button type="submit" className="btn btn-primary">
  //             Guardar
  //           </button>

  //           <button type="button" className="btn btn-secondary">
  //             Cancelar
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // </div>
  
      );
}
export default EditEmpleado;

