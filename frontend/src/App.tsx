import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AdminHome from './admin/AdminHome';
import ProtectedRoute from './admin/components/ProtectedRoute';
import EditProduct from './admin/page/EditProduct';

function App() {
  const token = localStorage.getItem("auth");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!token ? <SignUp /> : <Navigate to={"/"} replace />} />
        <Route path="/signin" element={!token ? <SignIn /> : <Navigate to={"/"} replace />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/products/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN']}><EditProduct /></ProtectedRoute>} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          duration: 4000,
        }}
      />
    </BrowserRouter>
  )
}

export default App
