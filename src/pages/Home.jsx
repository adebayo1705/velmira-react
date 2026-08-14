import Navbar from "../components/layouts/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChoose from "../components/home/WhyChoose";
import PromoBanner from "../components/home/PromoBanner";
import Footer from "../components/layouts/Footer";

import searchProducts from "../data/searchProducts";

function Home() {
  return (
    <>
      <Navbar products={searchProducts} />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <PromoBanner />
      <Footer />
    </>
  );
}

export default Home;