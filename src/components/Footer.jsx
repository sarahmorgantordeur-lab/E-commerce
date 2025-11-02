import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="mt-10 w-full bg-white/70 backdrop-blur-lg border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          
          {/* Logo / Nom du site */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate('/products')}
          >
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              E-commerce
            </h1>
          </div>

          {/* Liens et infos */}
          <div className="flex flex-col sm:flex-row gap-10 text-gray-700">
            
            {/* Liens rapides */}
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-gray-900">Liens rapides</h2>
              <Link to="/products" className="hover:text-blue-600 transition-colors">Produits</Link>
              <Link to="/panier" className="hover:text-blue-600 transition-colors">Panier</Link>
              <Link to="/auth/login" className="hover:text-blue-600 transition-colors">Connexion</Link>
              <Link to="/auth/register" className="hover:text-blue-600 transition-colors">Inscription</Link>
            </div>

            {/* Stock et utilisateur */}
            {user && (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-gray-700 shadow-sm">
                <User className="w-4 h-4 text-blue-600"/>
                <span className="text-sm font-medium">Bonjour {user?.data?.name}</span>
              </div>
            )}

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
          &copy; {new Date().getFullYear()} E-commerce. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
