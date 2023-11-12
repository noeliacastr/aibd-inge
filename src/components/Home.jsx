import {} from './StyleHome.css';
import Navbar from './Navbar';
import 'materialize-css/dist/css/materialize.min.css';

// import aliciaAvatar from './../img/aliciaAvatar.png';

import camaraN1 from './../img/camaraN1.jpg';
import camaraN2 from './../img/camaraN2.jpg';
import camaraN3 from './../img/camaraN3.jpg';
import camaraN4 from './../img/camaraN4.jpg';



const Home = () => {
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
                            persona con mascara a las 3:00pm 
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
                        <img src={camaraN2} alt="Card Image"  />
                        <span className="card-title">Camara #2</span>
                    </div>
                    <div className="card-content">
                        <p>
                            Mesas sucias a las 10:00am
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">Ver</a>
                        <a href="#" className="btn btn-primary">VER</a>
                    </div>
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
                            lavado de manos correctamente 
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
                            entrega de producto
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">Ver</a>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Home;
