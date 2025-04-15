import React, { useState } from "react";
import { client, urlFor } from "../sanityClient"; // Import the Sanity client
import styles from "../styles/contact.module.css";
import Footer from "./footer";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // Create the message object to send to Sanity
    const contactMessage = {
      _type: "contactMessage",
      name,
      email,
      phone,
      message,
    };

    // Submit the data to Sanity
    client
      .create(contactMessage)
      .then(() => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch(console.error);
  };

  return (
    <div className={styles.contactForm}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      
    </div>
    
  );
};

export default ContactForm;
