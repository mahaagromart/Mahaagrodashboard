import { SettingFilled } from '@ant-design/icons';
import { FaBell, FaBusinessTime, FaCodePullRequest, FaIdeal, FaList, FaMoneyBillTrendUp, FaShirtsinbulk, FaShop, FaTags, FaUser, FaWallet } from 'react-icons/fa6';
import { GiCheckMark, GiCrossMark, GiKnightBanner, GiTakeMyMoney } from 'react-icons/gi';
import { MdCategory, MdAddCircle, MdAdd, MdAddToPhotos, MdHouse, MdListAlt, MdMessage, MdDashboard, MdBarcodeReader, MdReviews, MdOutlineSettingsInputComponent, MdContactEmergency } from 'react-icons/md';
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
export const adminRoutes = [
  { label: 'Dashboard', icon: <MdDashboard />, key: '/' },
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
      { label: 'Bulk Insert', icon: <FaShirtsinbulk/>, key: '/BulkInsert' },
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
  { label: 'Banner', icon: <GiKnightBanner />, key: '/Banner' },
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
        { label: 'Customers', icon: <FaPeopleGroup /> ,
        children :[
          { label: 'Customer List', icon: <FaList />, key: '/CustomerList' },
          { label: 'Customer Reviews', icon: <MdReviews />, key: '/CustomerReviews' },
          { label: 'Wallet', icon: <FaWallet />, key: '/CustomerWallet' },
          { label: 'Wallet Bonus Setup', icon: <MdOutlineSettingsInputComponent />, key: '/WalletBonusSetup' },
        ] },
          { label: 'Employee', icon: < FaUserFriends/>,  
            children : [
            { label: 'Employee Role Setup', icon: <CiSettings />, key: '/EmployeeRoleSetup' },
            { label: 'Employees', icon: <CiUser />, key: '/Employees' },
            ]
          },

      ],
    },
    { label: 'Sellers', icon: <TbMan />, 
      children : [
      { label: 'Add New Seller', icon: <MdAdd />, key: '/AddNewSeller' },
      { label: 'Seller List', icon: <MdListAlt />, key: '/SellerList' },
      { label: 'Withdraws', icon: < BiMoneyWithdraw/>, key: '/SellerWithdraws' },
      { label: 'Withdraws Methods', icon: < PiHandWithdrawFill/>, key: '/WithdrawsMethods' },
      ]
    },
    { label: 'Delivery-Man', icon: <CiDeliveryTruck /> ,
      children : [
      { label: 'Add New', icon: <MdAdd />, key: '/AddNewDelivery-man' },
      { label: 'List', icon: <MdListAlt />, key: '/Deliver-manList' },
      { label: 'Chat', icon: <TbCategory2 />, key: '/Delivery-manChat' },
      { label: 'Withdraws', icon: < BiMoneyWithdraw/>, key: '/Delivery-manWithdraws' },
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
  { label: 'Signout', icon: <FaSignOutAlt />, key: '/signout' , danger : true  },

];



// import { SettingFilled } from '@ant-design/icons';
// import { FaBell, FaBusinessTime, FaCodePullRequest, FaIdeal, FaMoneyBillTrendUp, FaShirtsinbulk, FaShop, FaTags } from 'react-icons/fa6';
// import { GiCheckMark, GiCrossMark, GiKnightBanner, GiTakeMyMoney } from 'react-icons/gi';
// import { MdCategory, MdAddCircle, MdAdd, MdAddToPhotos, MdHouse, MdListAlt, MdMessage, MdDashboard, MdBarcodeReader } from 'react-icons/md';
// import { BiSend, BiSolidOffer } from "react-icons/bi";
// import { IoDocumentTextSharp } from "react-icons/io5";
// import { BsTicketPerforated } from "react-icons/bs";
// import { GrServicePlay } from "react-icons/gr";
// import { RiBankLine } from "react-icons/ri";
// import { FaSignOutAlt } from "react-icons/fa";
// import { FaGlobeAsia } from "react-icons/fa";

// export const adminRoutes = [
//   { label: 'Dashboard', icon: <MdDashboard />, key: '/' },

//   // Category Setup
//   { label: 'Category Setup', type: 'heading' },
//   { label: 'Add Category', icon: <MdAddCircle />, key: '/addCategory', private: true },
//   { label: 'Sub category', icon: <MdAdd />, key: '/SubCategory', private: true },
//   { label: 'Sub Sub Category', icon: <MdAddToPhotos />, key: '/SubSubCategory', private: true },

//   // Product Management
//   { label: 'Product Management', type: 'heading' },
//   { label: 'ProductAttribute', icon: <SettingFilled />, key: '/ProductAttribute' },
//   { label: 'In-house Products', icon: <MdHouse />, key: '/InhouseProducts' },
//   { label: 'Product List', icon: <MdListAlt />, key: '/ProductList', private: true },
//   { label: 'Add new Product', icon: <MdAddCircle />, key: '/AddNewProduct', private: true },
//   { label: 'Bulk Insert', icon: <FaShirtsinbulk />, key: '/BulkInsert', private: true },

//   // Seller Products
//   { label: 'Seller Products', type: 'heading' },
//   { label: 'New Product Request', icon: <FaCodePullRequest />, key: '/NewProductRequest', private: true },
//   { label: 'Approved Products', icon: <GiCheckMark />, key: '/ApprovedProducts', private: true },
//   { label: 'Denied Product', icon: <GiCrossMark />, key: '/DeniedProduct', private: true },

//   // Banner
//   { label: 'Banner', type: 'heading' },
//   { label: 'Banner Management', icon: <GiKnightBanner />, key: '/Banner' },

//   // Offers & Deals
//   { label: 'Offers & Deals', type: 'heading' },
//   { label: 'Coupons', icon: <FaTags />, key: '/Coupon', private: true },
//   { label: 'Flash deals', icon: <FaIdeal />, key: '/Flashdeals', private: true },
//   { label: 'Deal of the day', icon: <FaIdeal />, key: '/Dealoftheday', private: true },
//   { label: 'Featured deal', icon: <FaIdeal />, key: '/FeatureDeal', private: true },

//   // Notifications
//   { label: 'Notifications', type: 'heading' },
//   { label: 'Broadcast Notification', icon: <FaGlobeAsia />, key: '/BroadcastNotification', private: true },
//   { label: 'Send Notification', icon: <BiSend />, key: '/SendNotification', private: true },

//   // Testimonial
//   { label: 'Testimonial', type: 'heading' },
//   { label: 'Testimonial Management', icon: <IoDocumentTextSharp />, key: '/Testimonial' },

//   // Help & Support
//   { label: 'Help & Support', type: 'heading' },
//   { label: 'Message', icon: <MdMessage />, key: '/Message', private: true },
//   { label: 'B2B Messages', icon: <FaBusinessTime />, key: '/BtoBMessages', private: true },
//   { label: 'SupportTicket', icon: <BsTicketPerforated />, key: '/SupportTicket', private: true },
//   { label: 'Service', icon: <GrServicePlay />, key: '/Service', private: true },
//   { label: 'Service Enquiry', icon: <GrServicePlay />, key: '/ServiceEnquiry', private: true },
//   { label: 'B2B', icon: <GrServicePlay />, key: '/BtoB', private: true },

//   // Sales & Transaction Rep
//   { label: 'Sales & Transaction Rep', type: 'heading' },
//   { label: 'Earning Report', icon: <GiTakeMyMoney />, key: '/EarningReport', private: true },
//   { label: 'Inhouse Sales', icon: <MdHouse />, key: '/InhouseSales', private: true },
//   { label: 'seller Sales', icon: <FaShop />, key: '/SellerSale', private: true },
//   { label: 'Transaction Report', icon: <FaMoneyBillTrendUp />, key: '/TransactionReport', private: true },

//   // Signout
//   { label: 'Signout', icon: <FaSignOutAlt />, key: '/signout', danger: true },
// ];

// import React, { useState } from 'react';
// import { Menu } from 'antd';
// import { 
//   SettingFilled, FaBell, FaBusinessTime, FaCodePullRequest, FaIdeal, 
//   FaList, FaMoneyBillTrendUp, FaShirtsinbulk, FaShop, FaTags, FaUser, 
//   FaWallet, GiCheckMark, GiCrossMark, GiKnightBanner, GiTakeMyMoney, 
//   MdCategory, MdAddCircle, MdAdd, MdAddToPhotos, MdHouse, MdListAlt, 
//   MdMessage, MdDashboard, MdBarcodeReader, MdReviews, MdOutlineSettingsInputComponent, 
//   MdContactEmergency, BiMoneyWithdraw, BiSend, BiSolidOffer, IoDocumentTextSharp, 
//   BsTicketPerforated, GrServicePlay, RiBankLine, FaSignOutAlt, FaUserFriends, 
//   FaGlobeAsia, FaPeopleGroup, TbCategory2, TbMan, PiHandWithdrawFill, 
//   CiDeliveryTruck, CiSettings, CiUser 
// } from 'react-icons/all';


