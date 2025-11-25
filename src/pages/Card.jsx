import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  if (cart.length === 0)
    return <p className="text-center p-6">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white dark:bg-gray-400 p-4 mb-3 rounded shadow"
        >
          <div className="flex items-center gap-4">
            <img src={item.image} className="w-16" alt="" />
            <div>
              <h3 className="font-semibold dark:text-white">{item.title}</h3>
              <p className="text-green-600">${item.price}</p>
            </div>
          </div>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateQty(item.id, Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />

          <button
            onClick={() => removeFromCart(item.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
