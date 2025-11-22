import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./index.css";
import AppLayouts from "./layouts/AppLayouts";
import UserProfilePage from "./Page/UserProfilePage";
import Salepage from "./Page/Salepage";
import Rentpage from "./Page/Rentpage";
import PageTransition from "./components/PageTransition";


// DEV - 2 (ForSales Pages)
import SaleListingPage from "./Page/SaleListingPage";
import PropertyInfo from "./Pages/Forsales/PropertyInfo";
import PropertyOwnerInfo from "./Pages/Forsales/PropertyOwnerInfo";

// Auth Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// DEV - 3 (Login & Register)
// import Login from "./Page/login/Login"
// import Register from "./Page/login/Register"

// DEV - 4 (Home Page)
import Home from "./Page/home/Home";

function AppRoutes() {
  const location = useLocation();
  
  return (
    <PageTransition>
      <Routes location={location}>
        {/* Home Page - Main Landing */}
        <Route path="/" element={<Home />} />

        {/* Main Layout Routes */}
        <Route path="/app" element={<AppLayouts />}>
          <Route index element={<Rentpage />} />
          <Route path="/app/salepage" element={<Salepage />} />
          <Route path="/app/rentpage" element={<Rentpage />} />
        </Route>

        {/* Profile Page */}
        <Route path="/profile" element={<UserProfilePage />} />

        {/* ForSales Routes - Protected */}
        <Route 
          path="/forsales/propertyinfo" 
          element={
            <ProtectedRoute>
              <PropertyInfo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/forsales/propertyownerinfo" 
          element={
            <ProtectedRoute>
              <PropertyOwnerInfo />
            </ProtectedRoute>
          } 
        />

        <Route path="/properties/sale" element={<SaleListingPage />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;