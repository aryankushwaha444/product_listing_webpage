import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold dark:text-white">🛍️ Productly</Link>

        <div className="flex items-center gap-4">

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative text-xl">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
                {cart.reduce((sum, p) => sum + p.qty, 0)}
              </span>
            )}
          </Link>

          {/* Login state */}
          {user ? (
            <button onClick={logout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
