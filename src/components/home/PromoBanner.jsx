import "../../styles/promoBanner.css";

import banner from "../../assets/images/banner.jpg";

function PromoBanner() {
  return (
    <section className="promo-banner">

      <div className="container promo-content">

        <div className="promo-text">

          <span className="tag">
            Exclusive Collection
          </span>

          <h2>
            Elevate Your Style with Velmira
          </h2>

          <p>
            Discover timeless fashion pieces carefully selected
            to bring elegance, confidence, and quality to your wardrobe.
          </p>

          <a href="/shop" className="btn">
            Shop Collection
          </a>

        </div>

        <div className="promo-image">

          <img
            src={banner}
            alt="Exclusive Fashion Collection"
          />

        </div>

      </div>

    </section>
  );
}

export default PromoBanner;