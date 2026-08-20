import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";

import Button from "../components/ui/Button";
import ScrollReveal from "../components/ui/ScrollReveal";

import searchProducts from "../data/searchProducts";

import "../styles/Contact.css";

function Contact() {

  // ============================
  // FORM STATE
  // ============================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");


  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };


  // ============================
  // SEND MESSAGE
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setSuccess("");

    setError("");


    try {

      const response = await fetch(
        "https://velmira-backend.onrender.com/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Failed to send message"
        );

      }


      // ============================
      // SUCCESS
      // ============================

      setSuccess(
        "Your message has been sent successfully. We'll get back to you soon."
      );


      // Clear form

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <>
      <Navbar products={searchProducts} />


      <main className="contact-page">


        {/* ============================
            CONTACT HERO
        ============================ */}

        <section className="contact-hero">

          <ScrollReveal>

            <div className="container">

              <h1>
                Contact Us
              </h1>

              <p>
                We'd love to hear from you. Whether you have a
                question about our products, your order, or simply
                want to say hello, our team is here to help.
              </p>

              <div className="breadcrumb">

                <Link to="/">
                  Home
                </Link>

                <span>/</span>

                <span>
                  Contact
                </span>

              </div>

            </div>

          </ScrollReveal>

        </section>


        {/* ============================
            CONTACT INFORMATION
        ============================ */}

        <section className="contact-info">

          <div className="container">

            <div className="contact-grid">


              {/* Location */}

              <ScrollReveal>

                <div className="contact-card">

                  <FaLocationDot />

                  <h3>
                    Location
                  </h3>

                  <p>
                    Lagos, Nigeria
                  </p>

                </div>

              </ScrollReveal>


              {/* Phone */}

              <ScrollReveal>

                <div className="contact-card">

                  <FaPhone />

                  <h3>
                    Phone
                  </h3>

                  <a href="tel:+2348064323281">
                    +234 806 432 3281
                  </a>

                </div>

              </ScrollReveal>


              {/* Email */}

              <ScrollReveal>

                <div className="contact-card">

                  <FaEnvelope />

                  <h3>
                    Email
                  </h3>

                  <a href="mailto:info@velmira.com">
                    info@velmira.com
                  </a>

                </div>

              </ScrollReveal>


              {/* Business Hours */}

              <ScrollReveal>

                <div className="contact-card">

                  <FaClock />

                  <h3>
                    Business Hours
                  </h3>

                  <p>
                    Mon - Sat
                    <br />
                    9:00 AM - 6:00 PM
                  </p>

                </div>

              </ScrollReveal>


            </div>

          </div>

        </section>


        {/* ============================
            CONTACT FORM
        ============================ */}

        <section className="contact-form-section">

          <div className="container">

            <div className="contact-form-container">


              {/* LEFT SIDE */}

              <ScrollReveal className="scroll-reveal-left">

                <div className="contact-text">

                  <span>
                    Get In Touch
                  </span>

                  <h2>
                    We'd Love to Hear From You
                  </h2>

                  <p>
                    Whether you have questions about our products,
                    your order, or simply want to say hello,
                    our team is always ready to assist you.
                  </p>

                </div>

              </ScrollReveal>


              {/* RIGHT SIDE */}

              <ScrollReveal className="scroll-reveal-right">

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >


                  {/* SUCCESS MESSAGE */}

                  {success && (

                    <div className="contact-success">

                      {success}

                    </div>

                  )}


                  {/* ERROR MESSAGE */}

                  {error && (

                    <div className="contact-error">

                      {error}

                    </div>

                  )}


                  {/* NAME + EMAIL */}

                  <div className="form-row">

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* PHONE + SUBJECT */}

                  <div className="form-row">

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />

                  </div>


                  {/* MESSAGE */}

                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>


                  {/* SEND BUTTON */}

                  <Button
                    text={
                      loading
                        ? "Sending..."
                        : "Send Message"
                    }
                    type="submit"
                    disabled={loading}
                  />

                </form>

              </ScrollReveal>


            </div>

          </div>

        </section>


        {/* ============================
            BUSINESS & SOCIAL
        ============================ */}

        <section className="business-hours">

          <div className="container business-grid">


            {/* BUSINESS HOURS */}

            <ScrollReveal>

              <div className="hours-card">

                <h2>
                  Business Hours
                </h2>

                <div className="hour-row">

                  <span>
                    Monday - Friday
                  </span>

                  <strong>
                    9:00 AM - 6:00 PM
                  </strong>

                </div>


                <div className="hour-row">

                  <span>
                    Saturday
                  </span>

                  <strong>
                    10:00 AM - 4:00 PM
                  </strong>

                </div>


                <div className="hour-row">

                  <span>
                    Sunday
                  </span>

                  <strong>
                    Closed
                  </strong>

                </div>


                <div className="hour-row">

                  <span>
                    Public Holidays
                  </span>

                  <strong>
                    Closed
                  </strong>

                </div>

              </div>

            </ScrollReveal>


            {/* SOCIAL MEDIA */}

            <ScrollReveal>

              <div className="social-card">

                <h2>
                  Connect With Us
                </h2>

                <p>
                  Stay updated with our newest collections,
                  exclusive offers, and luxury fashion inspiration.
                </p>


                <div className="social-links">

                  <a
                    href="https://www.facebook.com/#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>


                  <a
                    href="https://www.instagram.com/#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>


                  <a
                    href="https://wa.me/#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>

                </div>

              </div>

            </ScrollReveal>


          </div>

        </section>


      </main>


      <Footer />

    </>
  );
}


export default Contact;
