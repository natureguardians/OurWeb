import { useState, useEffect } from "react";
import classes from "../styles/blog.module.css";
import { client, urlFor } from "../sanityClient";

const Blogs = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    useEffect(() => {
        client.fetch(`*[_type=="blog"] | order(publishedAt desc){
            title,
            content,
            image,
            author,
            publishedAt
        }`)
        .then((blogs) => {
            setData(blogs);
        })
        .catch(err => console.error("Could not fetch blogs because", err));
    }, []);

    // Auto-slide every 7 seconds unless user interacts
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isUserInteracting) {
                nextSlide();
            }
        }, 7000);

        return () => clearInterval(timer); // Cleanup timer
    }, [currentIndex, isUserInteracting]);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
        resetUserTimer();
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + data.length) % data.length);
        resetUserTimer();
    };

    const resetUserTimer = () => {
        setIsUserInteracting(true);
        setTimeout(() => setIsUserInteracting(false), 7000);
    };

    if (data.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="blogs">
            <div className={classes.wrapper}>
                <div className={classes.blogs}>
                    {data.map((blog, index) => (
                        <div
                            key={index}
                            className={`${classes.blog} ${index === currentIndex ? classes.active : ""}`}
                            style={{ display: index === currentIndex ? "block" : "none" }}
                        >
                            <img src={urlFor(blog.image?.asset?._ref).url()} alt={blog.title} />
                            <div className={classes.blogContent}>
                                <h1>{blog.title}</h1>
                                <p>{blog.content.substring(0, 150) + "..."}</p>
                                <p>{new Date(blog.publishedAt).toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.btn}>
                    <button onClick={prevSlide} className={classes.prev}>Prev</button>
                    <button onClick={nextSlide} className={classes.next}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
