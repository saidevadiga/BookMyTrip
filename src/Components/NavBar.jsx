import {Link} from 'react-router-dom'

const NavBar = () => {
    return ( 
        <nav id="navBar" >
            <Link to="/dashboard"><div id="logo">BookMyTrip</div></Link>
            <div><Link className="NavHeader" to="/bookbus">BUS</Link></div>
            <div><a className="NavHeader" href="/">FLIGHT</a></div>
            <div><a className="NavHeader" href="">Active</a></div>
            <div>
                <Link to="/profile"><i id="profileLogo" className='bx bxs-user-circle' ></i></Link>
            </div>
        </nav>
     );
}
 
export default NavBar;