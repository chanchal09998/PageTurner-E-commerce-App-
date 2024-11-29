import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./components/pages/Products";
import Checkout from "./components/pages/Checkout";
import Home from "./components/pages/Home";
import ProductDetails from "./components/pages/ProductDetails";
import Signup from "./components/AuthComponent/Signup";
import Login from "./components/AuthComponent/Login";
import UserDetails from "./components/pages/UserDetails";
import AdminLogin from "./components/AuthComponent/AdminLogin";
import Dashboard from "./components/pages/Dashboard";
import SearchedItemPage from "./components/pages/SearchedItemPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/productdetails/:id" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user-details" element={<UserDetails />}></Route>
        <Route path="/login/admin" element={<AdminLogin />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/searched-book" element={<SearchedItemPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
