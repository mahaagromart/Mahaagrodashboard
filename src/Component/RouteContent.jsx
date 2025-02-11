
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";

import AddCategory from '../Pages/ProductManagement/CategorySetup/AddCategory';
import AddSubCategory from "../Pages/ProductManagement/CategorySetup/AddSubCategory";
import AddSubSubCagtegory from "../Pages/ProductManagement/CategorySetup/AddSubSubCagtegory";
import AddNewProduct from "../Pages/ProductManagement/InHouseProduct/AddNewProduct";
import ProductList from "../Pages/ProductManagement/InHouseProduct/ProductList";
import BulkInsert from "../Pages/ProductManagement/InHouseProduct/BulkInsert";
import NewProductRequest from "../Pages/ProductManagement/SellerProduct/NewProductRequest";
import ApprovedProducts from "../Pages/ProductManagement/SellerProduct/ApprovedProducts";
import DeniedProduct from "../Pages/ProductManagement/SellerProduct/DeniedProduct";
import Banner from "../Pages/Promotionmanagement/Banner/Banner";
import Coupon from "../Pages/Promotionmanagement/offersAndDeals/Coupon";
import Flashdeals from "../Pages/Promotionmanagement/offersAndDeals/Flashdeals";
import PushNotification from "../Pages/Promotionmanagement/Notification/BroadcastNotification";
import SendNotification from "../Pages/Promotionmanagement/Notification/sendNotification";
import Testimonial from "../Pages/Promotionmanagement/Testimonial/Testimonial";
import Message from "../Pages/HelpsandSupport/Message";

import BusinessToBusiness from "../Pages/HelpsandSupport/BusinessToBusiness";
import SupportTicket from "../Pages/HelpsandSupport/SupportTicket";


import Register from "../Pages/Register/Register";
import GenerateBarCode from "../Pages/ProductManagement/InHouseProduct/GenerateBarCode";
import Dealoftheday from "../Pages/Promotionmanagement/offersAndDeals/Dealoftheday";
import Featureddeal from "../Pages/Promotionmanagement/offersAndDeals/Featureddeal";
import BroadcastNotification from "../Pages/Promotionmanagement/Notification/BroadcastNotification";
import MessageView from "../Pages/HelpsandSupport/MessageView";
import SupportTicketChatRoom from "../Pages/HelpsandSupport/SupportTicketChatRoom";
import Service from "../Pages/HelpsandSupport/Service";
import ServiceEnquiry from "../Pages/HelpsandSupport/ServiceEnquiry";
import AdminEarningReport from "../Pages/SalesAndTransactionReport/EarningReport/AdminEarningReport";
import TotalEarningTable from "./Table/TotalEarningTable";
import EarningReport from "../Pages/SalesAndTransactionReport/EarningReport/EarningReport";
import ProductAttribute from "../Pages/ProductManagement/ProductAttribute/ProductAttribute";
const RouteContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />

        {/* product management start here */}
        <Route path="/addCategory" element={<ProtectedRoutes><AddCategory /></ProtectedRoutes>} />
        <Route path="/SubCategory" element={<ProtectedRoutes><AddSubCategory /></ProtectedRoutes>} />
        <Route path="/SubSubCategory" element={<ProtectedRoutes><AddSubSubCagtegory /></ProtectedRoutes>} />

        <Route path="/ProductAttribute" element={<ProtectedRoutes> <ProductAttribute/>  </ProtectedRoutes>} />


        {/* inhouse product starts */}
        <Route path="/ProductList" element={<ProtectedRoutes><ProductList /></ProtectedRoutes>} />
        <Route path="/AddNewProduct" element={<ProtectedRoutes><AddNewProduct /></ProtectedRoutes>} />
        <Route path="/GenerateBarCode" element={<ProtectedRoutes><GenerateBarCode /></ProtectedRoutes>} />
        <Route path="/BulkInsert" element={<ProtectedRoutes><BulkInsert /></ProtectedRoutes>} />

        {/* seller product starts */}
        <Route path="/NewProductRequest" element={<ProtectedRoutes><NewProductRequest /></ProtectedRoutes>} />
        <Route path="/ApprovedProducts" element={<ProtectedRoutes><ApprovedProducts /></ProtectedRoutes>} />
        <Route path="/DeniedProduct" element={<ProtectedRoutes><DeniedProduct /></ProtectedRoutes>} />

        {/* promotional management start here */}
        <Route path="/Banner" element={<ProtectedRoutes><Banner /></ProtectedRoutes>} />
        <Route path="/Coupon" element={<ProtectedRoutes><Coupon /></ProtectedRoutes>} />
        <Route path="/Flashdeals" element={<ProtectedRoutes><Flashdeals /></ProtectedRoutes>} />
        <Route path="/Dealoftheday" element={<ProtectedRoutes><Dealoftheday /></ProtectedRoutes>} />
        <Route path="/FeatureDeal" element={<ProtectedRoutes><Featureddeal /></ProtectedRoutes>} />
        <Route path="/BroadcastNotification" element={<ProtectedRoutes><BroadcastNotification /></ProtectedRoutes>} />
        <Route path="/SendNotification" element={<ProtectedRoutes><SendNotification /></ProtectedRoutes>} />

        {/* help and support starts */}
        <Route path="/Message" element={<ProtectedRoutes><Message /></ProtectedRoutes>} />
        <Route path="/MessageView" element={<ProtectedRoutes><MessageView /></ProtectedRoutes>} />
        <Route path="/BtoBMessages" element={<ProtectedRoutes><BusinessToBusiness /></ProtectedRoutes>} />
        <Route path="/SupportTicket" element={<ProtectedRoutes><SupportTicket /></ProtectedRoutes>} />
        <Route path="/SupportTicketChatRoom" element={<ProtectedRoutes><SupportTicketChatRoom /></ProtectedRoutes>} />
        <Route path="/Service" element={<ProtectedRoutes> <Service/>  </ProtectedRoutes>} />
        <Route path="/ServiceEnquiry" element={<ProtectedRoutes> <ServiceEnquiry/>  </ProtectedRoutes>} />

        {/* user management starts */}
        <Route path="/EarningReport" element={<ProtectedRoutes> <EarningReport/> </ProtectedRoutes>} />
        {/* <Route path="/InhouseSales" element={<ProtectedRoutes><InhouseSales /></ProtectedRoutes>} />
        <Route path="/TransactionReport" element={<ProtectedRoutes><TransactionReport /></ProtectedRoutes>} /> */}

        {/* authentication routes */}
        <Route path="/signout" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />

        {/* catch-all route to redirect to main route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default RouteContent;
