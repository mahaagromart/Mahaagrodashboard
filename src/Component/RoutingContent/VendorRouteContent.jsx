
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoutes from "../ProtectedRoutes";
import VendorDashobard from "../../Pages/Vendor/VendorDashboard/VendorDashobard";
import AddNewBrand from "../../Pages/Vendor/Brand/AddNewBrand";
import BrandList from "../../Pages/Vendor/Brand/BrandList";
import AllOrders from "../../Pages/Vendor/Orders/AllOrders";


const VendorRouteContent = () => {
  return (
    <>
      <Routes>

          {/*------------------------------ These are all admin Routes ---------------------------------- */}
        
        <Route path="/" element={<ProtectedRoutes> <VendorDashobard/>   </ProtectedRoutes>} />

        {/* Brand's Section */}

        <Route path="/add-brand" element={<ProtectedRoutes> <AddNewBrand/>   </ProtectedRoutes>} />
        <Route path="/brand-list" element={<ProtectedRoutes> <BrandList/>   </ProtectedRoutes>} />

            {/* Order's Section  */}
        <Route path="/all-orders" element={<ProtectedRoutes> <AllOrders/>   </ProtectedRoutes>} />





      </Routes>
    </>
  );
};

export default VendorRouteContent;