import { Routes, Route } from "react-router-dom";
import LoginForm from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
// import ProductAttribute from "../Pages/CategorySetup/ProductAttribute/ProductAttribute";
// import Banner from "../Pages/Promotionmanagement/Banner/Banner";
// import Coupon from "../Pages/Promotionmanagement/offersAndDeals/Coupon";
// import Dealoftheday from "../Pages/Promotionmanagement/offersAndDeals/Dealoftheday";
// import Featureddeal from "../Pages/Promotionmanagement/offersAndDeals/Featureddeal";
// import Flashdeals from "../Pages/Promotionmanagement/offersAndDeals/Flashdeals";
// import PushNotification from "../Pages/Promotionmanagement/Notification/PushNotification";
// import SendNotification from "../Pages/Promotionmanagement/Notification/sendNotification";
// import Testimonial from "../Pages/Promotionmanagement/Testimonial/Testimonial";
// import Message from "../Pages/HelpsandSupport/Message";
// import Service from "../Pages/HelpsandSupport/Service";
// import BusinessToBusiness from "../Pages/HelpsandSupport/BusinessToBusiness"
// import SupportTicket from "../Pages/HelpsandSupport/SupportTicket";
// import EarningReport from "../Pages/UserManagement/SalesandTransactionRep/EarningReport";
// import InhouseSales from "../Pages/UserManagement/SalesandTransactionRep/InhouseSales";
// import TransactionReport from "../Pages/UserManagement/SalesandTransactionRep/TransactionReport"
// import Register from "../Pages/Register/Register";

import AddCategory from '../Pages/ProductManagement/CategorySetup/AddCategory';
import AddSubCategory from "../Pages/ProductManagement/CategorySetup/AddSubCategory";
import AddSubSubCagtegory from "../Pages/ProductManagement/CategorySetup/AddSubSubCagtegory";
import AddnewBrand from "../Pages/ProductManagement/Brands/AddnewBrand";
import BrandList from "../Pages/ProductManagement/Brands/BrandList";
import AddNewProduct from "../Pages/ProductManagement/InHouseProduct/AddNewProduct";
import ProductList from "../Pages/ProductManagement/InHouseProduct/ProductList";
import BulkInsert from "../Pages/ProductManagement/InHouseProduct/BulkInsert";
import NewProductRequest from "../Pages/ProductManagement/SellerProduct/NewProductRequest";
import ApprovedProducts from "../Pages/ProductManagement/SellerProduct/ApprovedProducts";
import DeniedProduct from "../Pages/ProductManagement/SellerProduct/DeniedProduct";
import Banner from "../Pages/Promotionmanagement/Banner/Banner";
import Coupon from "../Pages/Promotionmanagement/offersAndDeals/Coupon";
import Flashdeals from "../Pages/Promotionmanagement/offersAndDeals/Flashdeals";
import PushNotification from "../Pages/Promotionmanagement/Notification/PushNotification";
import SendNotification from "../Pages/Promotionmanagement/Notification/sendNotification";
import Testimonial from "../Pages/Promotionmanagement/Testimonial/Testimonial";
import Message from "../Pages/HelpsandSupport/Message";
import Service from "../Pages/HelpsandSupport/Service";
import BusinessToBusiness from "../Pages/HelpsandSupport/BusinessToBusiness"
import SupportTicket from "../Pages/HelpsandSupport/SupportTicket";
import EarningReport from "../Pages/UserManagement/SalesandTransactionRep/EarningReport";
import InhouseSales from "../Pages/UserManagement/SalesandTransactionRep/InhouseSales";
// import sellerSales from "../Pages/UserManagement/SalesandTransactionRep/sellerSales";
import TransactionReport from "../Pages/UserManagement/SalesandTransactionRep/TransactionReport"
import Register from "../Pages/Register/Register";

const RouteContent = () => {
  return (
    <>
      <Routes>


        <Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />

        {/* product management start here */}


        <Route path="/addCategory" element={<ProtectedRoutes> < AddCategory/>  </ProtectedRoutes>} />

        <Route path="/SubCategory" element={<ProtectedRoutes><AddSubCategory/></ProtectedRoutes>} />
        <Route path="/SubSubCategory" element={<ProtectedRoutes><AddSubSubCagtegory /></ProtectedRoutes>} />
        {/* brand starts */}
        {/* <Route path="/AddnewBrand" element={<ProtectedRoutes><AddnewBrand/></ProtectedRoutes>} />
        <Route path="/BrandList" element={<ProtectedRoutes><BrandList/></ProtectedRoutes>} /> */}
        {/* brands ends */}

        {/* product attribute starts */}
        {/* <Route path="/ProductAttribute" element={<ProtectedRoutes><ProductAttribute /></ProtectedRoutes>}
        /> */}
        {/* product attribute ends */}


        {/* inhouse product starts */}
        <Route path="/ProductList" element={<ProtectedRoutes><ProductList/></ProtectedRoutes>} />


        <Route path="/AddNewProduct" element={<ProtectedRoutes><AddNewProduct /></ProtectedRoutes>} />


        <Route path="/BulkInsert" element={<ProtectedRoutes><BulkInsert/></ProtectedRoutes>} />

        {/* inhouse ends here  */}


        {/* seller product starts */}
        <Route path="/NewProductRequest" element={<ProtectedRoutes> <NewProductRequest/> </ProtectedRoutes>} />
        <Route path="/ApprovedProducts" element={<ProtectedRoutes> <ApprovedProducts/> </ProtectedRoutes>} />
        <Route path="/DeniedProduct" element={<ProtectedRoutes> <DeniedProduct/> </ProtectedRoutes>} /> 
        {/* seller ends here */}

        {/* <Route path="/AddnewProduct" element={<ProtectedRoutes><AddnewProduct /></ProtectedRoutes>}
        />
        <Route path="/ViewProduct" element={<ProtectedRoutes><ViewProduct /></ProtectedRoutes>}/>




        {/* product management ends here */}


        {/* promotional management start here */}
        <Route path="/Banner" element={<ProtectedRoutes><Banner/></ProtectedRoutes>} />
        <Route path="/Coupon" element={<ProtectedRoutes> <Coupon/> </ProtectedRoutes>} />
        <Route path="/Flashdeals" element={<ProtectedRoutes><Flashdeals /></ProtectedRoutes>} />
{/* 
        <Route path="/Dealoftheday" element={<ProtectedRoutes><Dealoftheday /></ProtectedRoutes>} />
        <Route path="/Flashdeals" element={<ProtectedRoutes><Flashdeals /></ProtectedRoutes>} />
        <Route path="/SendNotification" element={<ProtectedRoutes><SendNotification /></ProtectedRoutes>} />
        <Route path="/PushNotification" element={<ProtectedRoutes><PushNotification /></ProtectedRoutes>} />
        <Route path="/Testimonial" element={<ProtectedRoutes><Testimonial /></ProtectedRoutes>} /> */}


        {/* promotional management ends here */}


        {/* help and support starts */}

        {/* <Route path="/Message" element={<ProtectedRoutes><Message /></ProtectedRoutes>} />
        <Route path="/SupportTicket" element={<ProtectedRoutes><SupportTicket /></ProtectedRoutes>} />
        <Route path="/Service" element={<ProtectedRoutes><Service /></ProtectedRoutes>} />
        <Route path="/BusinessToBusiness" element={<ProtectedRoutes><BusinessToBusiness /></ProtectedRoutes>} /> */}


       {/* help ans support ends */}

       {/* user management starts */}
       {/* <Route path="/EarningReport" element={<ProtectedRoutes><EarningReport /></ProtectedRoutes>} />
        <Route path="/InhouseSales" element={<ProtectedRoutes><InhouseSales /></ProtectedRoutes>} />
        <Route path="/sellerSales" element={<ProtectedRoutes><sellerSales /></ProtectedRoutes>} />
        <Route path="/TransactionReport" element={<ProtectedRoutes><TransactionReport /></ProtectedRoutes>} /> */}

       {/* user management ends */}


       




        {/* <Route path="/profile" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} /> */}
        <Route path="/signout" element={<LoginForm />}  />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        </Routes>
    </>
  );
};

export default RouteContent;
