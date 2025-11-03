<<<<<<< HEAD
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout ()
        navigate('/login')
    };

    return (
        <nav className='bg-white shadow-sm'>
            <div className="max-m7xl mx-auto px-4 sm:px-6 lg:px8">
                <div className='flex justify-between items-center h-16'>
                    <h1 className='text-2xl font-bold'>My product</h1>
                    <div className='flex items-center gap-4'>
                        <span className='text-sm font-bold'>
                            <span className='text-black font-bold text-2xl'>Bonjour {user?.data.name}</span>
                        </span>
                        <button className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:oultine-none focus:ring-2 focus:ring-red-500' onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
};
=======
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          

          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate('/products')}
          >
            <ShoppingCart className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              E-commerce
            </h1>
          </div>


          <div className="flex items-center gap-5">

            <Link
              to="/profile"
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span>Profil</span>
            </Link>


            <Link
              to="/panier"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Panier</span>
            </Link>


            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
>>>>>>> 5a2de49 (02 novembre)
