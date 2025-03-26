
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoutes from "../ProtectedRoutes";
import VendorDashobard from "../../Pages/Vendor/VendorDashboard/VendorDashobard";
import AddNewBrand from "../../Pages/Vendor/Brand/AddNewBrand";
import BrandList from "../../Pages/Vendor/Brand/BrandList";
import AllOrders from "../../Pages/Vendor/Orders/AllOrders";
import AddNewProduct from "../../Pages/Vendor/ProductManagement/AddNewProduct";
import ProductList from "../../Pages/Vendor/ProductManagement/ProductList";
import PendingOrders from "../../Pages/Vendor/Orders/PendingOrders";
import ConfirmedOrders from "../../Pages/Vendor/Orders/ConfirmedOrders";
import Packaging from "../../Pages/Vendor/Orders/Packaging";
import OrderListTable from "../VendorTable/OrderListTable";
import OutForDelivery from "../../Pages/Vendor/Orders/OutForDelivery";
import Delivered from "../../Pages/Vendor/Orders/Delivered";
import Returned from "../../Pages/Vendor/Orders/Returned";
import FailedToDelivery from "../../Pages/Vendor/Orders/FailedToDelivery";
import Cancelled from "../../Pages/Vendor/Orders/Cancelled";
import MyAccountSettingPage from "../../Pages/AccountSetting/MyAccountSettingPage";
import Coupon from "../../Pages/Vendor/OffersandDeals/Coupon";
import ProductReview from "../../Pages/Vendor/ProductManagement/ProductReview";
import GenerateBarCode from "../../Pages/ProductManagement/InHouseProduct/GenerateBarCode"

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
        <Route path="/pending-orders" element={<ProtectedRoutes> <PendingOrders/>   </ProtectedRoutes>} />
        <Route path="/pending-orders" element={<ProtectedRoutes> <PendingOrders/>   </ProtectedRoutes>} />
        <Route path="/confirmed-orders" element={<ProtectedRoutes> <ConfirmedOrders/>   </ProtectedRoutes>} />
        <Route path="/packaging-orders" element={<ProtectedRoutes> <Packaging/>   </ProtectedRoutes>} />
        <Route path="/out-for-delivery" element={<ProtectedRoutes> <OutForDelivery/>   </ProtectedRoutes>} />
        <Route path="/delivered-orders" element={<ProtectedRoutes> <Delivered/>   </ProtectedRoutes>} />
        <Route path="/returned-orders" element={<ProtectedRoutes> <Returned/>   </ProtectedRoutes>} />
        <Route path="/failed-orders" element={<ProtectedRoutes> <FailedToDelivery/>   </ProtectedRoutes>} />
        <Route path="/cancelled-orders" element={<ProtectedRoutes> <Cancelled/>   </ProtectedRoutes>} />



      {/* Product Management section */}

        <Route path="/add-product" element={<ProtectedRoutes> <AddNewProduct/>  </ProtectedRoutes>} />
        <Route path="/product-list" element={<ProtectedRoutes> <ProductList/>  </ProtectedRoutes>} />
        <Route path="/GenerateBarCode" element={<ProtectedRoutes> <GenerateBarCode/>  </ProtectedRoutes>} />
        <Route path="/product-review" element={<ProtectedRoutes> <ProductReview/>  </ProtectedRoutes>} />

    {/* Offers and deals */}

        <Route path="/coupons" element={<ProtectedRoutes> <Coupon/>  </ProtectedRoutes>} />


        {/* Authentication */}
        <Route path="/my-setting" element={<MyAccountSettingPage/> } />
        
        

      </Routes>
    </>
  );
};

export default VendorRouteContent;