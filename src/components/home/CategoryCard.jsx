import "../../styles/category.css";
import { Link } from "react-router-dom";

function CategoryCard({ image, title, link }) {
  return (
    <Link to={link} className="category-card">

      <img src={image} alt={title} />

      <div className="overlay">
        <h3>{title}</h3>
        <span>Shop Now</span>
      </div>

    </Link>
  );
}

export default CategoryCard;