import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      if (data?.data?.products) {
        setProducts(data.data.products);
        const cats = ["Tous", ...new Set(data.data.products.map(p => p.category_name))];
        setCategories(cats);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "Tous"
    ? products
    : products.filter(p => p.category_name === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />


      <main className="flex-row max-w-7xl mx-auto px-6 py-10 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Catégories
        </h1>

        {/* Sélecteur de catégorie */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium shadow-md transition-colors duration-200
                ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>


        <ProductList products={filteredProducts} onAddToCart={onAddToCart} loading={loading} />
      </main>


      <Footer />
    </div>
  );
}
