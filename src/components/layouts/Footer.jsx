import "../../styles/footer.css";

import logo from "../../assets/images/logo.png";

import { Link } from "react-router-dom";

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


        {/* ============================
            COMPANY
        ============================ */}

        <div className="footer-column">

          <Link
            to="/home"
            className="logo"
          >

            <img
              src={logo}
              alt="Velmira Logo"
            />

          </Link>

          <p>
            Premium fashion products including bags,
            clothing, jewelry, watches, perfumes,
            and luxury hair collections.
          </p>

        </div>


        {/* ============================
            QUICK LINKS
        ============================ */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/home">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/about">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>

          </ul>

        </div>


        {/* ============================
            CONTACT
        ============================ */}

        <div className="footer-column footer-contact">

          <h3>
            Contact
          </h3>

          <ul>

            <li>

              <FaLocationDot />

              <span>
                Nigeria
              </span>

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


        {/* ============================
            SOCIAL
        ============================ */}

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


      {/* ============================
          FOOTER BOTTOM
      ============================ */}

      <div className="footer-bottom">

        <p>
          &copy; 2026 Velmira. All Rights Reserved.
        </p>

      </div>

    </footer>

  );

}


export default Footer;