import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "layout";
import Dashboard from "pages/Dashboard";
import Products from "pages/Products";
import AddProduct from "pages/AddProduct";
import Customers from "pages/Customers";
import AddCustomer from "pages/AddCustomer";
import ManageStaffs from "pages/ManageStaffs";
import AddStaff from "pages/AddStaff";
import Bookings from "pages/Bookings";
import CreateProduct from "pages/CreateProduct";
import Category from "pages/Category";
import SubCategory from "pages/SubCategory";
import CreateBooking from "pages/CreateBooking";
import Login from "./pages/Login";
import PrivacyPolicry from "./pages/privacy-policy";
import TermsConditions from "./pages/terms-conditions";
import InstantQuotation from "./pages/InstantQuotation";
import AddQuotation from "./pages/AddQuotation";
import Location from "pages/Location";
import AddLocation from "pages/AddLocation";
import RequireAuth from "components/RequireAuth";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/create-booking" element={<CreateBooking />} />
              <Route path="/instant-quotation" element={<InstantQuotation />} />
              <Route path="/create-quotation" element={<AddQuotation />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/manage-staff" element={<ManageStaffs />} />
              <Route path="/add-staff" element={<AddStaff />} />
              <Route path="/category" element={<Category />} />
              <Route path="/sub-category" element={<SubCategory />} />
              <Route path="/location" element={<Location />} />
              <Route path="/add-location" element={<AddLocation />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/privacy-policy" element={<PrivacyPolicry />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
