import { useEffect, useState } from "react";
import image1 from "../assets/images/a.jpg";
import classes from "../styles/home.module.css";
import { NavLink } from "react-router-dom";
const Home = () => {
    

    return ( 
        <div className={classes.home}>
            <div className={classes.slide}>
                <img src={image1} alt="image of nature guardians" />
                <div className={classes.slideContent}>
                    <h1>Nature Guardians</h1>
                    <p>Where Scientific Innovation Meets Indigenous Wisdom – In Perfect Harmony.
                    We Protect, Preserve, and Cherish Nature for Generations to Come. 🌿✨</p>
                    <button><NavLink to="/about">Learn More</NavLink></button>
                </div>
            </div>
        </div>
        
     );
}
 
export default Home;