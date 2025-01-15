import { DashboardOutlined, LogoutOutlined, NotificationFilled, NotificationOutlined, SettingFilled } from '@ant-design/icons';
import { FaBell, FaBusinessTime, FaCodePullRequest, FaIdeal, FaMoneyBillTrendUp, FaShirtsinbulk, FaShop, FaTags } from 'react-icons/fa6';
import { GiCheckMark, GiCrossMark, GiKnightBanner, GiTakeMyMoney } from 'react-icons/gi';
import { MdCategory, MdAddCircle, MdAdd, MdAddToPhotos, MdHouse, MdListAlt, MdMessage, MdDashboard } from 'react-icons/md';
import { BiSend, BiSolidOffer } from "react-icons/bi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { BsTicketPerforated } from "react-icons/bs";
import { GrServicePlay } from "react-icons/gr";
import { RiBankLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
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
//   {
//     label: 'Brands',
//     icon: <MdBrandingWatermark />,
//     children: [
//       { label: 'Add new', icon: <MdCategory />, key: '/AddnewBrand' },
//       { label: 'BrandList', icon: <MdCategory />, key: '/BrandList' },
//     ],
//   },
  { label: 'ProductAttribute', icon: <SettingFilled />, key: '/ProductAttribute' },
  {
    label: 'In-house Products',
    icon: <MdHouse />,
    children: [
      { label: 'Product List', icon: <MdListAlt />, key: '/ProductList' },
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
      { label: 'Deal of the day', icon: <FaIdeal />, key: '/Dealoftheday' },
      { label: 'Featured deal', icon: <FaIdeal />, key: '/Featureddeal' },
      { label: 'Flashdeals', icon: <FaIdeal />, key: '/Flashdeals' },
    ],
  },
  {
    label: 'Notifications',
    icon: <FaBell />,
    children: [
      { label: 'SendNotification', icon: <BiSend />, key: '/SendNotification' },
      { label: 'PushNotification', icon: <BiSend />, key: '/PushNotification' },
    ],
  },
  { label: 'Testimonial', icon: <IoDocumentTextSharp />, key: '/Testimonial' },
  { label: 'Message', icon: <MdMessage />, key: '/Message' },
  { label: 'SupportTicket', icon: <BsTicketPerforated />, key: '/SupportTicket' },
  { label: 'Service', icon: <GrServicePlay />, key: '/Service' },
  { label: 'BusinessToBusiness', icon: <FaBusinessTime />, key: '/BusinessToBusiness' },
  {
    label: 'Sales & Transaction Rep',
    icon: <RiBankLine />,
    children: [
      { label: 'Earning Report', icon: <GiTakeMyMoney />, key: '/EarningReport' },
      { label: 'Inhouse Sales', icon: <MdHouse />, key: '/InhouseSales' },
      { label: 'seller Sales', icon: <FaShop />, key: '/sellerSales' },
      { label: 'Transaction Report', icon: <FaMoneyBillTrendUp />, key: '/TransactionReport' },
    ],
  },
  { label: 'Signout', icon: <FaSignOutAlt />, key: '/signout' , danger : true  },
];
