import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Commander() {
  const { cart, user, clearCart } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("carte");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 6.99;
  const vat = +(subtotal * 0.21).toFixed(2);
  const total = +(subtotal + shipping + vat).toFixed(2);

  const handleOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d’envoi à l’API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      alert("✅ Votre commande a été passée avec succès !");
      clearCart();
      navigate("/"); // redirige vers l’accueil
    } catch (error) {
      alert("❌ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Votre panier est vide.</h1>
          <a href="/catalogue" className="inline-block px-4 py-2 border rounded hover:shadow">
            Retour au catalogue
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-8 text-center">Finaliser la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Informations de livraison */}
          <form onSubmit={handleOrder} className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
              <input
                type="text"
                placeholder="Votre adresse complète"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="carte"
                    checked={paymentMethod === "carte"}
                    onChange={() => setPaymentMethod("carte")}
                  />
                  Carte bancaire
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  PayPal
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="livraison"
                    checked={paymentMethod === "livraison"}
                    onChange={() => setPaymentMethod("livraison")}
                  />
                  Paiement à la livraison
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => navigate("/Products")}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {isSubmitting ? "Commande en cours..." : "Valider ma commande"}
            </button>
          </form>

          {/* Récapitulatif */}
          <aside className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            <ul className="divide-y divide-gray-200 mb-4">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between py-2 text-sm">
                  <span>{item.name} × {item.qty || 1}</span>
                  <span>€{(item.price * (item.qty || 1)).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="text-sm space-y-2">
              <div className="flex justify-between"><span>Sous-total</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Livraison</span><span>{shipping === 0 ? "Gratuite" : `€${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span>TVA (21%)</span><span>€{vat.toFixed(2)}</span></div>
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                <span>Total</span><span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
