import { Link } from 'react-router-dom';
import {} from './StyleHome.css';
import {getUserData} from '../api/login'
import Navbar from './Navbar';
import 'materialize-css/dist/css/materialize.min.css';

// import aliciaAvatar from './../img/aliciaAvatar.png';

import camaraN1 from './../img/camaraN1.jpg';
import camaraN2 from './../img/camaraN2.jpg';
import camaraN3 from './../img/camaraN3.jpg';
import camaraN4 from './../img/camaraN4.jpg';



const Home = () => {
    async function loadUserData() {
        try {
            const userData = await getUserData();
            console.log('Datos del usuario:', userData);
            // Utiliza los datos del usuario como necesites en tu frontend
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
        }
    }
    
   
    loadUserData();


    return (
        <>
            <Navbar />
            <div className="row">
            <div className="col m6">
                <div className="card">
                    <div className="card-image">
                        <img src={camaraN1} alt="Card Image"  />
                        <span className="card-title">Camara #1</span>
                    </div>
                    <div className="card-content">
                        <p>
                            Persona con mascara a las 3:00pm 
                        </p>
                    </div>
                    <a href="#" className="btn btn-primary">VER</a>
                    
                </div>
            </div>
            <div className="col m6">
                <div className="card">
                    <div className="card-image">
                        <img src={camaraN2} alt="Card Image"  />
                        <span className="card-title">Camara #2</span>
                    </div>
                    <div className="card-content">
                        <p>
                            Mesas sucias a las 10:00am
                        </p>
                    </div>
                    <a href="#" className="btn btn-primary">VER</a>
                </div>
            </div>
            <div className="col m6">
                <div className="card">
                    <div className="card-image">
                        <img src={camaraN3} alt="Card Image"  />
                        <span className="card-title">Camara #2</span>
                    </div>
                    <div className="card-content">
                        <p>
                            Lavado de manos correctamente 
                        </p>
                    </div>
                    
                        <a href="#" className="btn btn-primary">VER</a>
                    {/* <div className="card-action">
                        <a href="#">Ver</a>
                    </div> */}
                </div>
            </div>
            <div className="col m6">
                <div className="card">
                    <div className="card-image">
                        <img src={camaraN4} alt="Card Image"  />
                        <span className="card-title">Camara #2</span>
                    </div>
                    <div className="card-content">
                        <p>
                            Entrega de producto
                        </p>
                    </div>
                    <a href="#" className="btn btn-primary">VER</a>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Home;
