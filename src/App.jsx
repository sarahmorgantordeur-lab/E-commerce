<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx' 





function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products.jsx';
import Panier from './pages/Panier.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panier"
              element={
                <ProtectedRoute>
                  <Panier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
>>>>>>> 5a2de49 (02 novembre)
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
<<<<<<< HEAD
   )
}

export default App
=======
  );
}

export default App;
>>>>>>> 5a2de49 (02 novembre)
