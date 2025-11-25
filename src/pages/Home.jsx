import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../api/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const loader = useRef();

  const perPage = 8;

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setVisible(data.slice(0, perPage));
    });
  }, []);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category));

  if (sortBy === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "high") filtered.sort((a, b) => b.price - a.price);

  useEffect(() => {
    setVisible(filtered.slice(0, page * perPage));
  }, [page, search, category, sortBy]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) setPage((p) => p + 1);
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        <input
          className="p-2 border rounded"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="p-2 border rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          {[...new Set(products.map((p) => p.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select className="p-2 border rounded" onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div ref={loader} className="h-10"></div>
    </div>
  );
}
