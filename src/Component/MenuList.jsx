
import { Menu } from 'antd';
import { DashboardOutlined,  LogoutOutlined } from '@ant-design/icons';
import './Menu.css';
import { useNavigate } from 'react-router-dom';

import { MdBrandingWatermark, MdCategory, MdProductionQuantityLimits } from 'react-icons/md';


const MenuList = () => {

  const navigate = useNavigate();
  return (
   
<Menu 
    style={{
      backgroundColor: '#fff',
      marginTop: '40px'
    
    }}
    onClick={({ key }) => {
      navigate(key);
    }}
    mode="inline"
    items={[
      { label: 'Dashboard', icon: <DashboardOutlined />, key: '/' },
      // category starts here
      {
        label: 'Category Setup',
        icon: <MdCategory />,
        children: [
          { label: 'Category', icon: <MdCategory />, key: '/Category' },
          { label: 'Subcategory', icon: <MdCategory />, key: '/Subcategory' },
          { label: 'SubSubCategory', icon: <MdCategory />, key: '/SubsubCategory' },
       
        ],
      },
      //category ends here



      // brand starts here
      {label:'Brands',icon:<MdBrandingWatermark/>,children:[
        { label: 'Add new', icon: <MdCategory />, key: '/AddnewBrand' },
        { label: 'BrandList', icon: <MdCategory />, key: '/BrandList' }

      ]}
      // brand ends here
      ,
   
      { label: 'ProductAttribute', icon: <LogoutOutlined />, key: '/ProductAttribute' },
      // inhouse products starts
      {label:'In-house Products',icon:<MdProductionQuantityLimits/>,children:[
        { label: 'AddnewProduct', icon: <MdProductionQuantityLimits />, key: '/AddnewProduct' },
        { label: 'ProductList', icon: <MdProductionQuantityLimits />, key: '/ProductList' },
        { label: 'BulkInsert', icon: <MdProductionQuantityLimits />, key: '/BulkInsert' }
      ]},
      // inhouse product ends

      // sellere products starts
        {label:'Seller Products',icon:<MdBrandingWatermark/>,children:[
        { label: 'NewProductRequest', icon: <MdCategory />, key: '/NewProductRequest' },
        { label: 'ApprovedProducts', icon: <MdCategory />, key: '/ApprovedProducts' },
        { label: 'DeniedProduct', icon: <MdCategory />, key: '/DeniedProduct' }

      ]},
      { label: 'Banner', icon: <MdCategory />, key: '/Banner' },

      // product management starts here
      {label:'Offers & Deals',icon:<MdBrandingWatermark/>,children:[
        { label: 'Coupon', icon: <MdCategory />, key: '/Coupon' },
        { label: 'Dealoftheday', icon: <MdCategory />, key: '/Dealoftheday' },
        { label: 'Featureddeal', icon: <MdCategory />, key: '/Featureddeal' },
        { label: 'Flashdeals', icon: <MdCategory />, key: '/Flashdeals' },

      ]},
      // notification starts here

      {label:'Notifications',icon:<MdBrandingWatermark/>,children:[
        { label: 'SendNotification', icon: <MdCategory />, key: '/SendNotification' },
        { label: 'PushNotification', icon: <MdCategory />, key: '/PushNotification' },
      
      ]},
      // notification ends herec v                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        
      { label: 'Testimonial', icon: <MdCategory />, key: '/Testimonial' },
      // product management ends here


      // helps and support starts
      { label: 'Message', icon: <MdCategory />, key: '/Message' },
      { label: 'SupportTicket', icon: <MdCategory />, key: '/SupportTicket' },
      { label: 'Service', icon: <MdCategory />, key: '/Service' },
      { label: 'BusinessToBusiness', icon: <MdCategory />, key: '/BusinessToBusiness' },


      // helps and support ends


      // report Analysis start
      {label:'Sales & Transaction Rep',icon:<MdBrandingWatermark/>,children:[
        { label: 'EarningReport', icon: <MdCategory />, key: '/EarningReport' },
        { label: 'InhouseSales', icon: <MdCategory />, key: '/InhouseSales' },
        { label: 'sellerSales', icon: <MdCategory />, key: '/sellerSales' },
        { label: 'TransactionReport', icon: <MdCategory />, key: '/TransactionReport' },
       
      
      ]},

      // report analysis ends






      // seller products ends
      { label: 'Signout', icon: <LogoutOutlined />, key: '/signout' },
      { label: 'Login', icon: <LogoutOutlined />, key: '/login' },
    ]}
  />

  );

};

export default MenuList;

