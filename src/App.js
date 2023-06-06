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
import ManageOrder from "pages/ManageOrder";

import Category from "pages/Category";
import AddCategory from "pages/AddCategory";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-order" element={<ManageOrder />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/manage-staff" element={<ManageStaffs />} />
              <Route path="/add-staff" element={<AddStaff />} />
              <Route path="/category" element={<Category />} />
              <Route path="/add-category" element={<AddCategory />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
