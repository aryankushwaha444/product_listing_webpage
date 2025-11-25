import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = login(form);
      if (!res.ok) return alert(res.message);
    } else {
      register(form);
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            className="p-2 border rounded"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          className="p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="p-2 rounded bg-indigo-600 text-white">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 mt-4"
      >
        {isLogin ? "Create an account" : "Have an account? Login"}
      </button>
    </div>
  );
}
