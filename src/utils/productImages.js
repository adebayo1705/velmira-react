import bag1 from "../assets/images/products/bag1.jpg";
import bag2 from "../assets/images/products/bag2.jpg";

import clothing1 from "../assets/images/products/clothing1.jpg";
import clothing2 from "../assets/images/products/clothing2.jpg";

import hair1 from "../assets/images/products/hair1.jpg";
import hair2 from "../assets/images/products/hair2.jpg";
import hair3 from "../assets/images/products/hair3.jpg";
import hair4 from "../assets/images/products/hair4.jpg";

import jewelry1 from "../assets/images/products/jewelry1.jpg";
import jewelry2 from "../assets/images/products/jewelry2.jpg";

import perfume1 from "../assets/images/products/perfume1.jpg";
import perfume2 from "../assets/images/products/perfume2.jpg";

import watch1 from "../assets/images/products/watch1.jpg";
import watch2 from "../assets/images/products/watch2.jpg";

const productImages = {
  "bag1.jpg": bag1,
  "bag2.jpg": bag2,

  "clothing1.jpg": clothing1,
  "clothing2.jpg": clothing2,

  "hair1.jpg": hair1,
  "hair2.jpg": hair2,
  "hair3.jpg": hair3,
  "hair4.jpg": hair4,

  "jewelry1.jpg": jewelry1,
  "jewelry2.jpg": jewelry2,

  "perfume1.jpg": perfume1,
  "perfume2.jpg": perfume2,

  "watch1.jpg": watch1,
  "watch2.jpg": watch2,
};

export const getProductImage = (image) => {
  const filename = image?.split("/").pop();

  return productImages[filename] || image;
};