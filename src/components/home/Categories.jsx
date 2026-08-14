import "../../styles/category.css";

import CategoryCard from "./CategoryCard";

import hair from "../../assets/images/categories/hair.jpg";
import bags from "../../assets/images/categories/bags.jpg";
import jewelry from "../../assets/images/categories/jewelry.jpg";
import watches from "../../assets/images/categories/watches.jpg";
import clothing from "../../assets/images/categories/clothing.jpg";
import perfumes from "../../assets/images/categories/perfumes.jpg";

function Categories() {

const categories = [
  {
    title: "Hair",
    image: hair,
    link: "/shop?category=Hair",
  },

  {
    title: "Bags",
    image: bags,
    link: "/shop?category=Bags",
  },

  {
    title: "Jewelry",
    image: jewelry,
    link: "/shop?category=Jewelry",
  },

  {
    title: "Watches",
    image: watches,
    link: "/shop?category=Watches",
  },

  {
    title: "Clothing",
    image: clothing,
    link: "/shop?category=Clothing",
  },

  {
    title: "Perfumes",
    image: perfumes,
    link: "/shop?category=Perfumes",
  },
];

  return (

<section className="categories">

<div className="container">

<div className="section-title">

<h2>Shop By Category</h2>

<p>
Explore our carefully selected collections.
</p>

</div>

<div className="category-grid">

{categories.map((category) => (
  <CategoryCard
    key={category.title}
    title={category.title}
    image={category.image}
    link={`/shop?category=${category.title}`}
  />
))}

</div>

</div>

</section>

  );
}

export default Categories;