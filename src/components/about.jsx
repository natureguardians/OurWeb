import React, { useEffect, useState } from "react";
import classes from "../styles/about.module.css";
import { client, urlFor } from "../sanityClient"; // Import the Sanity client


const About = () => {
    // State to store fetched data
    const [data, setData] = useState(null);

    // Fetch data when the component mounts
    useEffect(() => {
        client
            .fetch(`
                {
  "team": *[_type == "team"] | order(name asc) {
    name,
    role,
    image
  },
  "philosophy": *[_type == "philosophy"] {
    mission,
      vision
  }
}

            `)
            .then((data) => {setData(data)
                console.log(data)
            }) // Set the fetched data to the state
            .catch((error) => console.error("Error fetching data from Sanity:", error));
    }, []);

    // If data hasn't loaded yet, show a loading message
    if (!data) {
        return <p className={classes.loading}>Loading...</p>;
    }
    const totalMembers = data.team.length;
    const animationDuration = 15;
    

    return (
        
        <div className={classes.about}>
            <div className={classes.wrapper}>
                <div className={classes.boxWrapper}>
                    <div className={classes.box}>
                        <h2>Who we Are <span class="material-symbols-outlined">groups</span></h2>
                        <p>Nature Guardians is a student-led initiative focused on preserving nature through sustainable practices, combining indigenous knowledge and science to protect the environment and empower communities.</p>
                    </div>
                    <div className={classes.box}>
                        <h2>Mission <span class="material-symbols-outlined">trending_up</span></h2>
                        <p>{data.philosophy[0].mission}</p>
                    </div>
                    <div className={classes.box}>
                        <h2>Vision <span class="material-symbols-outlined">target</span></h2>
                        <p>{data.philosophy[0].vision}</p>
                    </div>
                </div>
                <div className={classes.team}>
                <h1>Our Team 💪</h1>
                <div className={classes.members} style={{ "--elements":`${totalMembers}` }}>
                    {
                        data.team.map((member, index) => {
                            const delay = (animationDuration/ totalMembers) * index -1;
                            return(
                                <div className={classes.member} key={index} style={{ animationDelay: `${delay}s` }}>
                                <div className={classes.profile}>
                                  <img src={urlFor(member.image?.asset?._ref).url()} alt={`profile of ${member.name}`} />
                                </div>
                                <h3>{member.name}</h3> {/* Accessing member's name */}
                                <p>{member.role}</p>
                              </div>
                            )
                        }
                          
                           
                          )
                          
                    }
                </div>
                </div>
            </div>
        </div>
    );
};

export default About;
