
import { Routes, Route, Navigate } from "react-router-dom";

// **************************   therse are all admin Routes ****************************
import LoginForm from "../../Pages/Login/Login";
import Dashboard from "../../Pages/Dashboard/Dashboard"
import ProtectedRoutes from "../ProtectedRoutes";
import AddCategory from '../../Pages/ProductManagement/CategorySetup/AddCategory';
import AddSubCategory from "../../Pages/ProductManagement/CategorySetup/AddSubCategory";
import AddSubSubCagtegory from "../../Pages/ProductManagement/CategorySetup/AddSubSubCagtegory";
import AddNewProduct from "../../Pages/ProductManagement/InHouseProduct/AddNewProduct";
import ProductList from "../../Pages/ProductManagement/InHouseProduct/ProductList";
import BulkInsert from "../../Pages/ProductManagement/InHouseProduct/BulkInsert";
import NewProductRequest from "../../Pages/ProductManagement/SellerProduct/NewProductRequest";
import ApprovedProducts from "../../Pages/ProductManagement/SellerProduct/ApprovedProducts";
import DeniedProduct from "../../Pages/ProductManagement/SellerProduct/DeniedProduct";
import Banner from "../../Pages/Promotionmanagement/Banner/Banner";
import Coupon from "../../Pages/Promotionmanagement/offersAndDeals/Coupon";
import Flashdeals from "../../Pages/Promotionmanagement/offersAndDeals/Flashdeals";
import PushNotification from "../../Pages/Promotionmanagement/Notification/BroadcastNotification";
import SendNotification from "../../Pages/Promotionmanagement/Notification/sendNotification";
import Testimonial from "../../Pages/Promotionmanagement/Testimonial/Testimonial";
import Message from "../../Pages/HelpsandSupport/Message";
import BusinessToBusiness from "../../Pages/HelpsandSupport/BusinessToBusiness";
import SupportTicket from "../../Pages/HelpsandSupport/SupportTicket";
import Register from "../../Pages/Register/Register";
import GenerateBarCode from "../../Pages/ProductManagement/InHouseProduct/GenerateBarCode";
import Dealoftheday from "../../Pages/Promotionmanagement/offersAndDeals/Dealoftheday";
import Featureddeal from "../../Pages/Promotionmanagement/offersAndDeals/Featureddeal";
import BroadcastNotification from "../../Pages/Promotionmanagement/Notification/BroadcastNotification";
import MessageView from "../../Pages/HelpsandSupport/MessageView";
import SupportTicketChatRoom from "../../Pages/HelpsandSupport/SupportTicketChatRoom";
import Service from "../../Pages/HelpsandSupport/Service";
import ServiceEnquiry from "../../Pages/HelpsandSupport/ServiceEnquiry";
import InHouseSales from "../../Pages/SalesAndTransactionReport/InHouseSales";
import AdminEarningReport from "../../Pages/SalesAndTransactionReport/EarningReport/AdminEarningReport";
import TotalEarningTable from "../Table/TotalEarningTable";
import EarningReport from "../../Pages/SalesAndTransactionReport/EarningReport/EarningReport";
import ProductAttribute from "../../Pages/ProductManagement/ProductAttribute/ProductAttribute";
import SellerSales from "../../Pages/SalesAndTransactionReport/SellerSales";
import TransactionReport from "../../Pages/SalesAndTransactionReport/TransactionReport";
import CustomerList from "../../Pages/UserManagement/Customers/CustomerList";
import CustomerReviews from "../../Pages/UserManagement/Customers/CustomerReviews";
import AddNewSeller from "../../Pages/UserManagement/Sellers/AddNewSeller";
import SellerList from "../../Pages/UserManagement/Sellers/SellerList";
import EditSellerInfo from "../../Pages/UserManagement/Sellers/EditSellerInfo";
import Withdraws from "../../Pages/UserManagement/Sellers/Withdraws";
import AddNewDeliveryman from "../../Pages/UserManagement/Delivery_man/AddNewDeliveryman";
import DeliverymanList from "../../Pages/UserManagement/Delivery_man/DeliverymanList";
import EarningStatement from "../../Pages/UserManagement/Delivery_man/EarningStatement";
import DeliverymanWithdraw from "../../Pages/UserManagement/Delivery_man/DeliverymanWithdraw";
import MobileBanner from "../../Pages/Promotionmanagement/Banner/MobileBanner";
import AllOrders from "../../Pages/Vendor/Orders/AllOrders";
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





const RouteContent = () => {
  return (
    <>
      <Routes>

          {/*------------------------------ These are all admin Routes ---------------------------------- */}

        <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />

        {/* order management  */}
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
        <Route path="/MobileBanner" element={<ProtectedRoutes><MobileBanner /></ProtectedRoutes>} />
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
        <Route path="/InhouseSales" element={<ProtectedRoutes> <InHouseSales/> </ProtectedRoutes>} />
        <Route path="/SellerSale" element={<ProtectedRoutes> <SellerSales/>  </ProtectedRoutes>} />
        <Route path="/TransactionReport" element={<ProtectedRoutes> <TransactionReport/>  </ProtectedRoutes>} /> 

      {/* user Management */}

          <Route path="/CustomerList" element={<ProtectedRoutes> <CustomerList/>  </ProtectedRoutes>} /> 
          <Route path="/CustomerReviews" element={<ProtectedRoutes> <CustomerReviews/>  </ProtectedRoutes>} /> 
          <Route path="/AddNewSeller" element={<ProtectedRoutes><AddNewSeller/></ProtectedRoutes>} /> 
          <Route path="/SellerList" element={<ProtectedRoutes> <SellerList/> </ProtectedRoutes>} /> 
          <Route path="/EditSellerInfo" element={<ProtectedRoutes> <EditSellerInfo/> </ProtectedRoutes>} /> 
          <Route path="/SellerWithdraws" element={<ProtectedRoutes> <Withdraws/> </ProtectedRoutes>} /> 

          {/* Delivery Man Route */}
          <Route path="/AddNewDelivery-man" element={<ProtectedRoutes> <AddNewDeliveryman/> </ProtectedRoutes>} /> 
          <Route path="/Deliver-manList" element={<ProtectedRoutes> <DeliverymanList/> </ProtectedRoutes>} /> 
          <Route path="/EarningStatement" element={<ProtectedRoutes> <EarningStatement/> </ProtectedRoutes>} /> 
          <Route path="/Delivery-manWithdraws" element={<ProtectedRoutes> <DeliverymanWithdraw/> </ProtectedRoutes>} /> 


        {/* authentication routes */}

        <Route path="/my-setting" element={<MyAccountSettingPage/>} />
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
