import logoAvantec from '../../assets/img/logoAvantec.gif'
import 'materialize-css/dist/css/materialize.min.css';
import ButtonAppBar from "../layout/Navbar";

const Home = () => {



    return (
        <>
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