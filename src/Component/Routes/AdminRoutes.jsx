import { SettingFilled } from '@ant-design/icons';
import { FaBell, FaBusinessTime, FaCodePullRequest, FaIdeal, FaList, FaMoneyBillTrendUp, FaShirtsinbulk, FaShop, FaTags,FaMobile, FaUser, FaWallet } from 'react-icons/fa6';
import { GiCheckMark,GiPhone , GiCrossMark, GiKnightBanner, GiTakeMyMoney } from 'react-icons/gi';
import { MdCategory, MdAddCircle, MdAdd, MdAddToPhotos, MdHouse, MdListAlt, MdMessage, MdDashboard, MdBarcodeReader, MdReviews, MdOutlineSettingsInputComponent, MdContactEmergency, MdBorderColor,MdPendingActions,MdDeliveryDining, MdSettings, } from 'react-icons/md';
import { BiMoneyWithdraw, BiSend, BiSolidOffer } from "react-icons/bi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { BsTicketPerforated } from "react-icons/bs";
import { GrServicePlay } from "react-icons/gr";
import { RiBankLine } from "react-icons/ri";
import { FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbCategory2, TbMan } from "react-icons/tb";
import { PiHandWithdrawFill } from "react-icons/pi";
import { CiDeliveryTruck, CiSettings, CiUser } from "react-icons/ci";
import {LuListOrdered} from 'react-icons/lu'
import { GiConfirmed,GiReturnArrow,GiBoxUnpacking  } from 'react-icons/gi';
import { TbShoppingCartCancel } from 'react-icons/tb';
import { AiOutlineDeliveredProcedure,AiFillCloseCircle } from 'react-icons/ai';
export const adminRoutes = [
  { label: 'Dashboard', icon: <MdDashboard />, key: '/' },
  {
      label: "Order Management",
      icon: <MdBorderColor />,
      children: [
        { label: "All Orders", icon: <LuListOrdered />, key: "/all-orders" },
        { label: "Pending", icon: <MdPendingActions />, key: "/pending-orders" },
        { label: "Confirmed", icon: <GiConfirmed />, key: "/confirmed-orders" },
        { label: "Packaging", icon: <GiBoxUnpacking />, key: "/packaging-orders" },
        { label: "Out For Delivery", icon: <MdDeliveryDining />, key: "/out-for-delivery" },
        { label: "Delivered", icon: <AiOutlineDeliveredProcedure />, key: "/delivered-orders" },
        { label: "Returned", icon: <GiReturnArrow />, key: "/returned-orders" },
        { label: "Failed To Deliver", icon: <AiFillCloseCircle />, key: "/failed-orders" },
        { label: "Cancelled", icon: <TbShoppingCartCancel />, key: "/cancelled-orders" },
      ],
    },
  {
    label: 'Category Setup',
    icon: <MdCategory />,
    children: [
      { label: 'Add Category', icon: <MdAddCircle />, key: '/addCategory' },
      { label: 'Sub category', icon: <MdAdd />, key: '/SubCategory' },
      { label: 'Sub Sub Category', icon: <MdAddToPhotos />, key: '/SubSubCategory' },
    ],
  },

  { label: 'ProductAttribute', icon: <SettingFilled />, key: '/ProductAttribute' },
  {
    label: 'In-house Products',
    icon: <MdHouse />,
    children: [
      { label: 'Product List', icon: <MdListAlt />, key: '/ProductList' },
      // { label: 'Generate BarCode', icon: <MdBarcodeReader />, key: '/GenerateBarCode' },
      { label: 'Add new Product', icon: <MdAddCircle />, key: '/AddNewProduct' },
      { label: 'Bulk Insert', icon: <FaShirtsinbulk />, key: '/BulkInsert' },
    ],
  },
  {
    label: 'Seller Products',
    icon: <FaShop />,
    children: [
      { label: 'New Product Request', icon: <FaCodePullRequest />, key: '/NewProductRequest' },
      { label: 'Approved Products', icon: <GiCheckMark />, key: '/ApprovedProducts' },
      { label: 'Denied Product', icon: <GiCrossMark />, key: '/DeniedProduct' },
    ],
  },
  { label: "Banner's", icon: <GiKnightBanner />, 
    children: [
      { label: "Website Banner's", icon: <GiKnightBanner />, key: '/Banner' },
      { label: "Mobile Banner's", icon: <FaMobile />, key: '/MobileBanner' },
      // { label: 'Denied Product', icon: <GiCrossMark />, key: '/DeniedProduct' },
    ],
  },
  {
    label: 'Offers & Deals',
    icon: <BiSolidOffer />,
    children: [
      { label: 'Coupons', icon: <FaTags />, key: '/Coupon' },
      { label: 'Flash deals', icon: <FaIdeal />, key: '/Flashdeals' },
      { label: 'Deal of the day', icon: <FaIdeal />, key: '/Dealoftheday' },
      { label: 'Featured deal', icon: <FaIdeal />, key: '/FeatureDeal' },
    ],
  },
  {
    label: 'Notifications',
    icon: <FaBell />,
    children: [
      { label: 'Broadcast Notification', icon: <FaGlobeAsia />, key: '/BroadcastNotification' },
      { label: 'Send Notification', icon: <BiSend />, key: '/SendNotification' },
    ],
  },


  { label: 'Testimonial', icon: <IoDocumentTextSharp />, key: '/Testimonial' },

  // help and support 
  {
    label: 'Help & Support',
    icon: <FaBell />,
    children: [
      { label: 'Message', icon: <MdMessage />, key: '/Message' },
      { label: 'B2B Messages', icon: <FaBusinessTime />, key: '/BtoBMessages' },
      { label: 'SupportTicket', icon: <BsTicketPerforated />, key: '/SupportTicket' },
      { label: 'Service', icon: <GrServicePlay />, key: '/Service' },
      { label: 'Service Enquiry', icon: <GrServicePlay />, key: '/ServiceEnquiry' },
      { label: 'B2B', icon: <GrServicePlay />, key: '/BtoB' },
    ],
  },

  // user Management

  {
    label: 'User Management',
    icon: <FaUser />,
    children: [
      {
        label: 'Customers', icon: <FaPeopleGroup />,
        children: [
          { label: 'Customer List', icon: <FaList />, key: '/CustomerList' },
          { label: 'Customer Reviews', icon: <MdReviews />, key: '/CustomerReviews' },
          { label: 'Wallet', icon: <FaWallet />, key: '/CustomerWallet' },
          { label: 'Wallet Bonus Setup', icon: <MdOutlineSettingsInputComponent />, key: '/WalletBonusSetup' },
        ]
      },
      {
        label: 'Employee', icon: < FaUserFriends />,
        children: [
          { label: 'Employee Role Setup', icon: <CiSettings />, key: '/EmployeeRoleSetup' },
          { label: 'Employees', icon: <CiUser />, key: '/Employees' },
        ]
      },

    ],
  },
  {
    label: 'Sellers', icon: <TbMan />,
    children: [
      { label: 'Add New Seller', icon: <MdAdd />, key: '/AddNewSeller' },
      { label: 'Seller List', icon: <MdListAlt />, key: '/SellerList' },
      { label: 'Withdraws', icon: < BiMoneyWithdraw />, key: '/SellerWithdraws' },
      { label: 'Withdraws Methods', icon: < PiHandWithdrawFill />, key: '/WithdrawsMethods' },
    ]
  },
  {
    label: 'Delivery-Man', icon: <CiDeliveryTruck />,
    children: [
      { label: 'Add New', icon: <MdAdd />, key: '/AddNewDelivery-man' },
      { label: 'List', icon: <MdListAlt />, key: '/Deliver-manList' },
      { label: 'Chat', icon: <TbCategory2 />, key: '/Delivery-manChat' },
      { label: 'Withdraws', icon: < BiMoneyWithdraw />, key: '/Delivery-manWithdraws' },
      // { label: 'Emergency Contact', icon: < MdContactEmergency/>, key: '/Delivery-manEmergencyContact' },
    ]
  },



  {
    label: 'Sales & Transaction Rep',
    icon: <RiBankLine />,
    children: [
      { label: 'Earning Report', icon: <GiTakeMyMoney />, key: '/EarningReport' },
      { label: 'Inhouse Sales', icon: <MdHouse />, key: '/InhouseSales' },
      { label: 'seller Sales', icon: <FaShop />, key: '/SellerSale' },
      { label: 'Transaction Report', icon: <FaMoneyBillTrendUp />, key: '/TransactionReport' },
    ],
  },
  { label: 'My Account Setting', icon: <MdSettings />, key: '/my-setting',},
  { label: 'Signout', icon: <FaSignOutAlt />, key: '/signout', danger: true },

];


