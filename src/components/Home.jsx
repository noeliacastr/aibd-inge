import { Link } from 'react-router-dom';
import logoAvantec from '../img/logoAvantec.gif'
import 'materialize-css/dist/css/materialize.min.css';
import ButtonAppBar from "./Navbar2"

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
            <ButtonAppBar/>
            <div>
            <img
                src={logoAvantec}
                alt="Logo Avantec.Ds"
                className="logo-avantec"
            />
            </div>
        </>
    );
};

export default Home;