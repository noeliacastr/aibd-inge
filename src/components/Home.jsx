import { Link } from 'react-router-dom';
import logoAvantec from '../img/logoAvantec.gif'
import 'materialize-css/dist/css/materialize.min.css';
import ButtonAppBar from "./Navbar2"

const Home = () => {
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