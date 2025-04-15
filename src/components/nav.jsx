import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "../styles/nav.module.css";
import logo from "../assets/images/logo.png";

const Nav = () => {
    const [closeStatus, setCloseStatus] = useState(true);
    const [navStatus, setNavStatus] = useState(false);
    const [menuStatus, setMenuStatus] = useState(true);
    const toogleCloseIcon = ()=>{
        setCloseStatus((prev)=> !prev);
    }
    const toogleNavbar = ()=>{
        setNavStatus((prev)=> !prev);
        toogleMenu();
    }
    const toogleMenu = ()=>{
        setMenuStatus((prev)=> !prev);
        
    }
    return ( 
        <div className={classes.navCont}>
            <span className={`material-symbols-outlined ${classes.menu} ${ menuStatus ? "" : classes.hideMenu }`} onClick={toogleNavbar}>menu</span>

            
            <div className={`${classes.navbar} ${ navStatus ? classes.showNav : ""}` }>
                
                <h1 className={ `${classes.closeIcon } ${closeStatus ? '': classes.hideCloseIcon}`} onClick={toogleNavbar}>&times;</h1>
                <div className={classes.logoBox}>
                    <img src={logo} alt="logo of nature guardians" />
                </div>
                <div className={classes.links}>
                    <NavLink to="/" className={({ isActive })=> isActive ? `${classes.active}`:""} onClick={toogleNavbar}>Home</NavLink>
                    <NavLink to="/about" className={({isActive})=> isActive ? `${classes.active}`: ""} onClick={toogleNavbar}>About</NavLink>
                    <NavLink to="/blogs" className={({ isActive})=> isActive ? `${classes.active}`: ""} onClick={toogleNavbar}>Blogs</NavLink>
                    <NavLink to="/contacts" className={({ isActive})=> isActive ? `${classes.active}`: ""} onClick={toogleNavbar}>Contacts</NavLink>
                </div>
                <div className={classes.auth}>
                    <h2>Login</h2>
                </div>
            </div>
        </div>
     );
}
 
export default Nav;