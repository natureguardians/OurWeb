import React from "react";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>My Blog</div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        </div>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
