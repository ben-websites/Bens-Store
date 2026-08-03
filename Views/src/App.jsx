import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { CartProvider } from "./contextApi/CartContext";
import { ProductProvider } from "./contextApi/ProductContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import MyOrderDetails from "./pages/MyOrderDetails";


import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProductAdmin from "./admin/ProductsAdmin";
import EditProduct from "./admin/EditProduct";
import Orders from "./admin/Orders";
import OrderDetails from "./admin/OrderDetails";
import Messages from "./admin/Messages";
import MessageDetails from "./admin/MessageDetails";
import Customers from "./admin/Customers"
import CustomerDetails from "./admin/CustomerDetails";
import Settings from "./admin/Settings"
import Statistics from "./admin/Statistics";
import UserRoute from "./Protected/UserRoute";
import AdminRoute from "./Protected/AdminRoute";
import NotFoundAdmin from "./admin/NotFoundAdmin";


function App() {
  return (
    
      <ProductProvider>
        <CartProvider>

          <div className="min-h-screen bg-[#f8f5ef] text-slate-900">

            {/* Hide Navbar on Admin Pages */}
            {window.location.pathname.startsWith("/admin") ? null : <Navbar />}

            <main>

              <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Protected Routes */}

                <Route
                  path="/"
                  element={
                    <UserRoute>
                      <Home />
                    </UserRoute>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <UserRoute>
                      <Products />
                    </UserRoute>
                  }
                />

                <Route
                  path="/products/:id"
                  element={
                    <UserRoute>
                      <ProductDetails />
                    </UserRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <UserRoute>
                      <Cart />
                    </UserRoute>
                  }
                />

                <Route
                  path="/about"
                  element={
                    <UserRoute>
                      <About />
                    </UserRoute>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <UserRoute>
                      <Contact />
                    </UserRoute>
                  }
                />
              <Route
                path="/myorders"
                element={
                  <UserRoute>
                    <MyOrders />
                  </UserRoute>
                }
              />
              <Route 
                path="/myorders/:id"
                element={
                  <UserRoute>
                     <MyOrderDetails />
                  </UserRoute>
                } 
              />

                <Route
                  path="/users"
                  element={
                    <UserRoute>
                      <Users />
                    </UserRoute>
                  }
                />

                <Route
                  path="/edituser/:id"
                  element={
                    <UserRoute>
                      <EditUser />
                    </UserRoute>
                  }
                />

              <Route
                path="/checkout"
                element={
                  <UserRoute>
                    <Checkout />
                  </UserRoute>
                }
              />
                <Route
                  path="*"
                  element={
                    <UserRoute>
                      <NotFound />
                    </UserRoute>
                  }
                />

                {/* Admin Routes */}

                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<ProductAdmin />} />
                  <Route path="products/edit/:id" element={<EditProduct />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:id" element={<OrderDetails />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="customers/:id" element={<CustomerDetails />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="messages/:id" element={<MessageDetails />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<NotFoundAdmin />} />

                </Route>

              </Routes>

            </main>

            {window.location.pathname.startsWith("/admin") ? null : <Footer />}

          </div>

        </CartProvider>
      </ProductProvider>
  );
}

export default App;