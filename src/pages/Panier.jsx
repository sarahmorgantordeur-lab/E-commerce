import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Panier() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useAuth();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty || 1, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 6.99;
  const vat = +(subtotal * 0.21).toFixed(2);
  const total = +(subtotal + shipping + vat).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-6">Votre panier</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border rounded-lg">
            <p className="text-lg mb-4">Votre panier est vide.</p>
            <a href="/catalogue" className="inline-block px-4 py-2 border rounded hover:shadow">Continuer mes achats</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 border p-4 rounded-md">
                  <img src={item.image_url} alt={item.name} className="w-28 h-28 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm">€{item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm px-2 py-1 hover:bg-red-50 rounded"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border p-4 rounded-md">
              <h2 className="text-xl font-medium mb-4">Récapitulatif</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Sous-total</span><span>€{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Livraison</span><span>{shipping === 0 ? "Gratuite" : `€${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>TVA (21%)</span><span>€{vat.toFixed(2)}</span></div>
                <div className="border-t pt-3 mt-3 flex justify-between font-semibold"><span>Total</span><span>€{total.toFixed(2)}</span></div>
              </div>
              <button
                onClick={() => navigate("/commandes")}
                className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Commander
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
removeEventListener