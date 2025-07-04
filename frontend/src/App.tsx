import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!token ? <SignUp /> : <Navigate to={"/"} replace />} />
        <Route path="/signin" element={!token ? <SignIn /> : <Navigate to={"/"} replace />} />
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
