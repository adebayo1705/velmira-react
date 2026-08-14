import { Link } from "react-router-dom";

import "../../styles/hero.css";
import Button from "../ui/Button";
import heroImage from "../../assets/images/hero.png";


function Hero() {
  return (
    <section className="hero">

      <div className="container hero-container">

        <div className="hero-content">

          <span className="hero-tag">
            Luxury Fashion Collection
          </span>

          <h1>
            Elevate Your Style With Timeless Luxury
          </h1>

          <p>
            Discover premium handbags, watches, perfumes,
            jewellery and fashion pieces carefully selected
            to redefine elegance.
          </p>

          <Link to="/shop">
            <Button text="Explore Collection" />
          </Link>

        </div>


        <div className="hero-image">

          <img
            src={heroImage}
            alt="Luxury Collection"
          />

        </div>

      </div>

    </section>
  );
}


export default Hero;
