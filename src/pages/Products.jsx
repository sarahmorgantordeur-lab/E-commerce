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
    </div>
  );
}
