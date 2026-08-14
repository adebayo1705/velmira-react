import "../../styles/footer.css";

import logo from "../../assets/images/logo.png";

import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">

        {/* Company */}

        <div className="footer-column">

          <a href="/home" className="logo">

            <img
              src={logo}
              alt="Velmira Logo"
            />

          </a>

          <p>
            Premium fashion products including bags,
            clothing, jewelry, watches, perfumes,
            and luxury hair collections.
          </p>

        </div>


        {/* Quick Links */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <a href="/home">Home</a>
            </li>

            <li>
              <a href="shop">Shop</a>
            </li>

            <li>
              <a href="about">About</a>
            </li>

            <li>
              <a href="contact">Contact</a>
            </li>

          </ul>

        </div>


        {/* Contact */}

        <div className="footer-column footer-contact">

          <h3>Contact</h3>

          <ul>

            <li>
              <FaLocationDot />
              <span>Nigeria</span>
            </li>

            <li>
              <FaPhone />
              <a href="tel:+2348064323281">
                +234 806 432 3281
              </a>
            </li>

            <li>
              <FaEnvelope />
              <a href="mailto:info@velmira.com">
                info@velmira.com
              </a>
            </li>

          </ul>

        </div>


        {/* Social */}

        <div className="footer-socials">

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


      {/* Footer Bottom */}

      <div className="footer-bottom">

        <p>
          &copy; 2026 Velmira. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;