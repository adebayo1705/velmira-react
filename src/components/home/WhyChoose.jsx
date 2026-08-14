import "../../styles/whyChoose.css";

import {
  FaGem,
  FaTruckFast,
  FaShieldHalved,
  FaHeadset,
} from "react-icons/fa6";

function WhyChoose() {

  const reasons = [
    {
      icon: <FaGem />,
      title: "Premium Quality",
      text: "Carefully selected fashion products made to meet high standards.",
    },
    {
      icon: <FaTruckFast />,
      title: "Fast Delivery",
      text: "Quick and reliable nationwide delivery to your doorstep.",
    },
    {
      icon: <FaShieldHalved />,
      title: "Secure Payments",
      text: "Shop with confidence through safe and trusted payment methods.",
    },
    {
      icon: <FaHeadset />,
      title: "Customer Support",
      text: "Friendly support ready to assist you before and after your purchase.",
    },
  ];

  return (

    <section className="why-choose">

      <div className="container">

        <div className="section-title">

          <h2>Why Choose Velmira?</h2>

          <p>
            We bring you premium fashion products with quality service you can trust.
          </p>

        </div>

        <div className="why-grid">

          {reasons.map((reason) => (

            <div className="why-card" key={reason.title}>

              <div className="why-icon">
                {reason.icon}
              </div>

              <h3>{reason.title}</h3>

              <p>
                {reason.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default WhyChoose;