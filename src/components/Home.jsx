import {} from './StyleHome.css';
import Navbar from './Navbar';
import 'materialize-css/dist/css/materialize.min.css';

const Home = () =>{
    return(
        
            <div className="container">
            <Navbar/>
            <div className="row">
                <div className="col s12">This div is 12-columns wide on all screen sizes</div>
                <div className="col s6">6-columns (one-half)</div>
                <div className="col s6">6-columns (one-half)</div>
                </div>
            </div>
        
    )
}

export default Home