import { useState } from "react";
<<<<<<< HEAD

export default function ProductList( { products, handleDelete, handleEdit }) {
  const [productList, setProductList] = useState([]);


  const ProductCard = ({ product, handleDelete, handleEdit }) => {

    return (
      <div className="bg-200 rounded-lg">
        <div className="bg-200 rounded-lg flex flex-col">
          <h2 className="font-bold text-xl">{product.name}</h2>
          <span className="font-bold">Prix : {product.price}</span>
          <span className="font-bold">Stock :  {product.stock} </span>
          <div className="flex flex-wrap m-0.5">
            <button 
            onClick={() => handleEdit(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:oultine-none focus:ring-2 focus:ring-blue-500">
              Modifier
            </button>

            <button 
            onClick={() => handleDelete(product.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:oultine-none focus:ring-2 focus:ring-red-500">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };


    return (
      <div className="bg-gray-200 flex flex-wrap rounded-lg">
        <h1 className="font-bold text-2xl">Liste des poduits</h1>
        {products.map((product) => (
            <ProductCard 
            key={product.id} 
            product={product} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit}/>
        ))}
      </div>
    );
=======
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function ProductList({ products, loading }) {
  const [sortOrder, setSortOrder] = useState({});
  const [openDropdown, setOpenDropdown] = useState({});
  const { addToCart } = useAuth();

  // Garde en mémoire la quantité choisie par produit
  const [quantities, setQuantities] = useState({});

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Chargement des produits...</p>;
  }

  const categories = [...new Set(products.map(p => p.category_name))];

  const handleSortChange = (category, order) => {
    setSortOrder(prev => ({ ...prev, [category]: order }));
    setOpenDropdown(prev => ({ ...prev, [category]: false }));
  };

  const toggleDropdown = (category) => {
    setOpenDropdown(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // 🔹 Changement de quantité
  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, Number(value) || 1); // minimum 1
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  // 🔹 Ajout au panier avec quantité choisie
  const onAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart({ ...product, qty });
    alert(`✅ ${qty}x ${product.name} ajouté${qty > 1 ? "s" : ""} au panier !`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Nos Produits</h1>

      {categories.map(category => {
        const productsByCategory = products
          .filter(p => p.category_name === category)
          .sort((a, b) =>
            sortOrder[category] === "desc" ? b.price - a.price : a.price - b.price
          );

        return (
          <div key={category} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>

              {/* Menu déroulant pour trier */}
              <div className="relative inline-block text-left">
                <button
                  onClick={() => toggleDropdown(category)}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Trier par prix
                  <ChevronDown className="ml-2 -mr-1 w-5 h-5" />
                </button>

                {openDropdown[category] && (
                  <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleSortChange(category, "asc")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Croissant
                      </button>
                      <button
                        onClick={() => handleSortChange(category, "desc")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Décroissant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grille des produits */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {productsByCategory.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <span className="text-gray-400">Pas d'image disponible</span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between h-52">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">€{product.price.toFixed(2)}</p>
                    </div>

                    {/* Sélecteur de quantité */}
                    <div className="flex items-center justify-between mt-3">
                      <label className="text-sm text-gray-700">Quantité :</label>
                      <input
                        type="number"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
                      />
                    </div>

                    {/* Bouton Ajouter */}
                    <button
                      onClick={() => onAddToCart(product)}
                      className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
>>>>>>> 5a2de49 (02 novembre)
}
