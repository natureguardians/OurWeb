import React, { useEffect, useState } from "react";
import { client, urlFor } from "../sanityClient";
import styles from "../styles/blog.module.css";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    client
      .fetch(
        `*[_type=="blog"] | order(publishedAt desc){
            _id,
            title,
            content,
            image,
            author,
            publishedAt
        }`
      )
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  const latestBlogs = blogs.slice(0, 5);
  const paginatedBlogs = blogs.slice(5);
  const totalPages = Math.ceil(paginatedBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = paginatedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.blogPage}>
      <h1>Blog</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchBar}
      />
      <section className={styles.latestBlogs}>
        <h2>Latest Blogs</h2>
        <div className={styles.blogList}>
          {latestBlogs.map((blog) => (
            <div 
              key={blog._id} 
              className={styles.blogCard} 
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <img src={urlFor(blog.image?.asset?._ref).url()} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.allBlogs}>
        <h2>All Blogs</h2>
        <div className={styles.blogList}>
          {filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog).map((blog) => (
            <div 
              key={blog._id} 
              className={styles.blogCard} 
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <img src={urlFor(blog.image?.asset?._ref).url()} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogList;

