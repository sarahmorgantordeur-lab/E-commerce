import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart } from "lucide-react";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  const goToCart = () => navigate("/panier");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-16 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
          <p className="text-gray-700"><span className="font-semibold">Nom :</span> {user?.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Email :</span> {user?.email}</p>

          <button
            onClick={goToCart}
            className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            Aller au Panier
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
