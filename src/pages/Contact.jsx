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

import "../styles/contact.css";

function Contact() {
  return (
    <>
      <Navbar products={searchProducts} />

<main className="contact-page">

  {/* ==================== CONTACT HERO ==================== */}

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


  {/* ==================== CONTACT INFORMATION ==================== */}

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


  {/* ==================== CONTACT FORM ==================== */}

  <section className="contact-form-section">

    <div className="container">

      <div className="contact-form-container">

        {/* Left */}

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


        {/* Right */}

        <ScrollReveal className="scroll-reveal-right">

          <form className="contact-form">

            <div className="form-row">

              <input
                type="text"
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />

            </div>


            <div className="form-row">

              <input
                type="tel"
                placeholder="Phone Number"
              />

              <input
                type="text"
                placeholder="Subject"
              />

            </div>


            <textarea
              placeholder="Write your message..."
              required
            ></textarea>


            <Button
              text="Send Message"
              type="submit"
            />

          </form>

        </ScrollReveal>

      </div>

    </div>

  </section>


  {/* ==================== BUSINESS & SOCIAL ==================== */}

  <section className="business-hours">

    <div className="container business-grid">

      {/* Business Hours */}

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


      {/* Social Media */}

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