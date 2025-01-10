import { FaSignOutAlt } from "react-icons/fa";
import {
  MdCategory,
  // MdBrandingWatermark,
  MdProductionQuantityLimits,
  MdDashboard,
  MdAddCircle,
  MdAddToPhotos,
  MdList,
  MdListAlt,
  MdBorderColor,
  MdPendingActions,
  MdDeliveryDining,
  MdAdd,
  MdReviews,
  MdAddBusiness,
  MdReport,
} from "react-icons/md";


import {LuListOrdered} from 'react-icons/lu'
import { GiBoxUnpacking, GiConfirmed, GiReturnArrow } from "react-icons/gi";
import {AiOutlineDeliveredProcedure, AiOutlineProduct, AiOutlineTransaction } from "react-icons/ai";
import { TbShoppingCartCancel } from "react-icons/tb";
import { RiMessage2Fill, RiReactjsFill, RiRefund2Line } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { FaBitcoin, FaShop } from "react-icons/fa6";
import { PiBankFill, PiHandWithdraw } from "react-icons/pi";


export const vendorRoutes = [
  { label: "Dashboard", icon: <MdDashboard />, key: "/" },

  {
    label: "Brands",
    icon: <MdCategory />,
    children: [
      { label: "Add New", icon: <MdAddCircle />, key: "/add-brand" },
      { label: "List", icon: <MdListAlt />, key: "/brand-list" },
    ],
  },

  {
    label: "Order Management",
    icon: <MdBorderColor />,
    children: [
      { label: "All Orders", icon: <LuListOrdered />, key: "/all-orders" },
      { label: "Pending", icon: <MdPendingActions />, key: "/pending-orders" },
      { label: "Confirmed", icon: <GiConfirmed />, key: "/confirmed-orders" },
      { label: "Packaging", icon: <GiBoxUnpacking />, key: "/packaging-orders" },
      { label: "Out For Delivery", icon: <MdDeliveryDining />, key: "/delivery-orders" },
      { label: "Delivered", icon: <AiOutlineDeliveredProcedure />, key: "/delivered-orders" },
      { label: "Returned", icon: <GiReturnArrow />, key: "/returned-orders" },
      { label: "Failed To Deliver", icon: <MdList />, key: "/failed-orders" },
      { label: "Cancelled", icon: <TbShoppingCartCancel />, key: "/cancelled-orders" },
    ],
  },

  {
    label: "Refund Request List",
    icon: <RiRefund2Line />,
    children: [
      { label: "Pending", icon: <MdPendingActions />, key: "/pending-refunds" },
      { label: "Approved", icon: <GiConfirmed />, key: "/approved-refunds" },
      { label: "Refunded", icon: <RiReactjsFill />, key: "/refunded" },
      { label: "Rejected", icon: <TbShoppingCartCancel />, key: "/rejected-refunds" },
    ],
  },

  {
    label: "Product Management",
    icon: <AiOutlineProduct />,
    children: [
      { label: "Product List", icon: <MdList />, key: "/product-list" },
      { label: "Add New Product", icon: <MdAdd />, key: "/add-product" },
      { label: "Bulk Import", icon: <MdAddToPhotos />, key: "/bulk-import" },
    ],
  },

  {
    label: "Product Review",
    icon: <MdReviews />,
    key: "/product-review",
  },

  {
    label: "Offers & Deals",
    icon: <BiSolidOffer />,
    children: [
      { label: "Coupon", icon: <MdProductionQuantityLimits />, key: "/coupons" },
    ],
  },

  {
    label: "B2B",
    icon: <MdAddBusiness />,
    key: "/b2b",
  },

  {
    label: "Message",
    icon: <RiMessage2Fill />,
    key: "/message",
  },

  {
    label: "Sales & Transaction Report",
    icon: <FaBitcoin />,
    children: [
      {
        label: "Transaction Report",
        icon: <AiOutlineTransaction />,
        key: "/transaction-report",
      },
    ],
  },

  {
    label: "Product Report",
    icon: <MdReport />,
    key: "/product-report",
  },

  {
    label: "Order Report",
    icon: <MdReport />,
    key: "/order-report",
  },

  {
    label: "Withdraws",
    icon: <PiHandWithdraw />,
    key: "/withdraws",
  },

  {
    label: "My Bank Info",
    icon: <PiBankFill />,
    key: "/bank-info",
  },

  {
    label: "My Shop",
    icon: <FaShop />,
    key: "/my-shop",
  },

  {
    label: "Signout",
    icon: <FaSignOutAlt />,
    key: "/signout",
    danger: true,
  },
];
