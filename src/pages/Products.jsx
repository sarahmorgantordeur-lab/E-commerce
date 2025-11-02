<<<<<<< HEAD
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import api from "../api";
import { useState, useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (
        response.data.data?.products &&
        Array.isArray(response.data.data.products)
      ) {
        setProducts(response.data.data.products);
      } else {
        console.error("Unexpected API response format :", response.data.data);
        setProducts([]);
        showError("Format de données inattendu");
      }
      setProducts(response.data.data.products);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        navigate("/auth/login")
      } else {
        showError(error.message?.data?.error || "Tout est pété !!!");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    if (editingProduct) {
      // Editing an existing product
      try {
        const result = await api.put(`/products/${editingProduct.id}`, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
        });
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id ? result.data : product
          )
        );

        
        showSuccess("Produit modifié avec succès !");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du produit :", error);
        showError("Erreur lors de la sauvegarde du produit !");
      } finally {
        setEditingProduct(null);
        fetchProducts();
      }
    } else {
      try {
        const result = await api.post("/products", {
          name: formData.data.data.products.name,
          description: formData.data.data.products.description,
          price: formData.data.data.products.price,
          stock: formData.data.data.products.stock,
        });
        setProducts((prevProducts) => [...prevProducts, result.data]);
        showSuccess("Produit créé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du produit :", error);
        showError("Erreur lors de la sauvegarde du produit !");
      } finally {
        setEditingProduct(null);
        fetchProducts();
      }
    }
  }

  const handleEdit= (product) => {
    setEditingProduct(product)
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      showSuccess("Produit supprimé avec succès.");
      fetchProducts();
    } catch (error) {
      showError(error.response?.data?.error || "Une erreur est survenue.");
    }
  }

  return (
    <div className="bg-white text-black p-4 h-screen w-full grid grid-col">
      <div className="container mx-auto">
        <Navbar />
      </div>

      <div className="max-w-7xl mx -auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm onSubmit={handleSubmit} />
      </div>

      <div>
        <ProductList 
        products={products} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit}/>
      </div>
=======
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


      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Nos Produits
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
>>>>>>> 5a2de49 (02 novembre)
    </div>
  );
}
