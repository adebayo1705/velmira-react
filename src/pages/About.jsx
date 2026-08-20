import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import Navbar from "../components/layouts/Navbar";

import searchProducts from "../data/searchProducts";

import ScrollReveal from "../components/ui/ScrollReveal";

import storyImage from "../assets/images/story.jpg";
import founderImage from "../assets/images/founder.jpg";
import aboutHeroImage from "../assets/images/shop-banner2.jpg";
import ctaImage from "../assets/images/hero.png";

import "../styles/About.css";

function About() {
  return (
    <>
      <Navbar products={searchProducts} />

      <main className="about-page">

        {/* ==================== ABOUT HERO ==================== */}

        <section className="about-hero">

          {/* ==================== HERO IMAGE ==================== */}

          <img
            src={aboutHeroImage}
            alt="Velmira Fashion Collection"
            className="about-hero-image"
          />


          {/* ==================== HERO OVERLAY ==================== */}

          <div className="about-hero-overlay"></div>


          {/* ==================== HERO CONTENT ==================== */}

          <div className="container about-hero-content">

            <h1>
              About Velmira
            </h1>

            <p>
              Discover the story behind Velmira and our passion
              for timeless luxury and modern elegance.
            </p>

            <div className="breadcrumb">

              <Link to="/home">
                Home
              </Link>

              <span>/</span>

              <span>
                About
              </span>

            </div>

          </div>

        </section>


        {/* ==================== OUR STORY ==================== */}

        <section className="about-story">

          <div className="container">

            <div className="about-story-grid">

              {/* ==================== STORY IMAGE ==================== */}

              <ScrollReveal className="scroll-reveal-left">

                <div className="about-story-image">

                  <img
                    src={storyImage}
                    alt="Velmira"
                  />

                </div>

              </ScrollReveal>


              {/* ==================== STORY CONTENT ==================== */}

              <ScrollReveal className="scroll-reveal-right">

                <div className="about-story-content">

                  <span className="about-tag">
                    Our Story
                  </span>

                  <h2>
                    Elegance Designed
                    <br />
                    For You
                  </h2>

                  <p>
                    Velmira was created with one simple idea:
                    luxury should feel effortless, personal,
                    and accessible.
                  </p>

                  <p>
                    From carefully selected fashion pieces to
                    beautiful accessories, perfumes, watches,
                    hair and more, every product is chosen to
                    help you express your individual style.
                  </p>

                  <p>
                    We believe that what you wear and how you
                    present yourself should reflect confidence,
                    elegance, and personality.
                  </p>

                </div>

              </ScrollReveal>

            </div>

          </div>

        </section>


        {/* ==================== OUR VALUES ==================== */}

        <section className="about-values">

          <div className="container">

            <ScrollReveal>

              <div className="section-title">

                <h2>
                  What We Stand For
                </h2>

                <p>
                  The values that define the Velmira experience.
                </p>

              </div>

            </ScrollReveal>


            <div className="values-grid">

              {/* ==================== QUALITY ==================== */}

              <ScrollReveal>

                <div className="value-card">

                  <div className="value-icon">
                    ✨
                  </div>

                  <h3>
                    Quality
                  </h3>

                  <p>
                    We carefully select products that meet
                    our standards for quality, style, and value.
                  </p>

                </div>

              </ScrollReveal>


              {/* ==================== CUSTOMER FIRST ==================== */}

              <ScrollReveal>

                <div className="value-card">

                  <div className="value-icon">
                    ♡
                  </div>

                  <h3>
                    Customer First
                  </h3>

                  <p>
                    Your shopping experience matters to us.
                    We strive to make every interaction simple
                    and enjoyable.
                  </p>

                </div>

              </ScrollReveal>


              {/* ==================== ELEGANCE ==================== */}

              <ScrollReveal>

                <div className="value-card">

                  <div className="value-icon">
                    ◆
                  </div>

                  <h3>
                    Elegance
                  </h3>

                  <p>
                    We believe in timeless designs that help
                    you look and feel your best.
                  </p>

                </div>

              </ScrollReveal>


              {/* ==================== TRUST ==================== */}

              <ScrollReveal>

                <div className="value-card">

                  <div className="value-icon">
                    ✓
                  </div>

                  <h3>
                    Trust
                  </h3>

                  <p>
                    We aim to build lasting relationships with
                    our customers through reliability and care.
                  </p>

                </div>

              </ScrollReveal>

            </div>

          </div>

        </section>


        {/* ==================== MEET THE FOUNDER ==================== */}

        <section className="founder-section">

          <div className="container">

            {/* ==================== FOUNDER TITLE ==================== */}

            <ScrollReveal>

              <div className="section-title">

                <h2>
                  Meet the Founder
                </h2>

                <p>
                  Behind every great brand is a vision. Velmira was
                  founded with a passion for bringing timeless luxury,
                  premium craftsmanship, and exceptional shopping
                  experiences to every customer.
                </p>

              </div>

            </ScrollReveal>


            {/* ==================== FOUNDER CARD ==================== */}

            <div className="team-grid">

              <ScrollReveal>

                <div className="team-card">

                  <img
                    src={founderImage}
                    alt="CEO & Founder"
                  />


                  <div className="team-info">

                    <h3>
                      CEO & Founder
                    </h3>

                    <span>
                      Founder of Velmira
                    </span>

                    <p>
                      Velmira was founded with a passion for delivering
                      premium fashion pieces that combine elegance,
                      quality, and affordability. Every collection is
                      carefully selected to help customers express
                      confidence and style.
                    </p>


                    {/* ==================== SOCIALS ==================== */}

                    <div className="team-socials">

                      <a
                        href="https://www.facebook.com/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebookF />
                      </a>

                      <a
                        href="https://www.instagram.com/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram />
                      </a>

                      <a
                        href="https://wa.me/#"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaWhatsapp />
                      </a>

                    </div>

                  </div>

                </div>

              </ScrollReveal>

            </div>

          </div>

        </section>


        {/* ==================== STYLE CTA ==================== */}

        <section className="style-cta">

          {/* ==================== CTA IMAGE ==================== */}

          <img
            src={ctaImage}
            alt="Velmira Collection"
            className="style-cta-image"
          />


          {/* ==================== CTA DARK OVERLAY ==================== */}

          <div className="style-cta-overlay"></div>


          {/* ==================== CTA CONTENT ==================== */}

          <ScrollReveal>

            <div className="container style-cta-content">

              <h2>
                Elevate Your Style Today
              </h2>

              <p>
                Discover our carefully curated collection of luxury
                fashion pieces designed to inspire confidence,
                elegance, and timeless beauty.
              </p>

              <div className="cta-buttons">

                <Link
                  to="/shop"
                  className="btn"
                >
                  Shop Now
                </Link>

                <Link
                  to="/contact"
                  className="btn-outline"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </ScrollReveal>

        </section>

      </main>

    </>
  );
}

export default About;