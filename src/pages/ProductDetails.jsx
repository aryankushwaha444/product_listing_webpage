import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <img src={product.image} className="w-60 mx-auto" alt="" />

        <div>
          <h2 className="text-2xl font-semibold dark:text-white">{product.title}</h2>
          <p className="text-green-600 text-xl font-bold">${product.price}</p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
