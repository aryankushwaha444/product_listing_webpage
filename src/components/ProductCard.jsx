import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="h-40 mx-auto object-contain"
          alt={product.title}
        />
      </Link>

      <h3 className="mt-3 text-sm font-semibold dark:text-white line-clamp-2">
        {product.title}
      </h3>

      <p className="text-lg font-bold text-green-600">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="w-full mt-3 px-3 py-2 bg-indigo-600 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
