import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

// Import components
import GlobalToastContainer from "./components/GlobalToastContainer";
import { isLoggedIn, isRole } from "./utils/auth";
import RoleProtectedRoute from "./components/ProtectedRoute";
import DeliveryLogin from "./pages/delivery/DeliveryLogin";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import PaymentStatus from "./pages/PaymentStatus";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import MenuDetails from "./components/MenuDetails";
import OrderDetails from "./components/OrderDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";

function App() {
  // console.log(import.meta.env);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route
          path="/payment-status/:transactionId"
          element={<PaymentStatus />}
        />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* Admin Login Route */}
        <Route
          path="/admin/login"
          element={
            isLoggedIn() && isRole("admin") ? (
              <Navigate to="/admin" />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* Delivery Login Route */}
        <Route
          path="/delivery/login"
          element={
            isLoggedIn() && isRole("delivery") ? (
              <Navigate to="/delivery" />
            ) : (
              <DeliveryLogin />
            )
          }
        />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin/dashboard/menu"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard>
                <MenuDetails />
              </AdminDashboard>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Navigate to={"/admin/dashboard/orders"} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Navigate to={"/admin/dashboard/orders"} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard/orders"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard>
                <OrderDetails />
              </AdminDashboard>
            </RoleProtectedRoute>
          }
        />

        {/* Protected Delivery Dashboard Route */}
        <Route
          path="/delivery"
          element={
            <RoleProtectedRoute allowedRoles={["delivery"]}>
              <DeliveryDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Redirect user if trying to access an undefined route */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <GlobalToastContainer />
    </Router>
  );
}

export default App;
