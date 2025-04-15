import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import styles from "../styles/blogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="blog" && _id == $id][0]{
          title,
          content,
          image,
          author,
          publishedAt
        }`,
        { id }
      )
      .then((data) => setBlog(data))
      .catch(console.error);
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className={styles.blogDetails}>
      <h1>{blog.title}</h1>
      <p><strong>By:</strong> {blog.author}</p>
      <p><strong>Published:</strong> {new Date(blog.publishedAt).toDateString()}</p>
      <img src={urlFor(blog.image?.asset?._ref).url()} alt={blog.title} />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
