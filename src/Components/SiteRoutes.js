import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Homepage from './Homepage';
import Loginhere from './Loginhere';
import Thanks from './Thanks';
import ViewMember from './ViewMember';
import Searchuser from './Searchuser';
import Managecategory from './Managecategory';
import Managesubcat from './Managesubcat';
import ManageProd from './ManageProd';
import UpdateSubCat from './UpdateSubCat';
import UpdateProduct from './UpdateProd';
import ChangePassword from './ChangePassword';
import ShowSubCategory from './ShowSubCategory';
import Showproducts from './Showproducts';
import ShowCategory from './Showcategory';
import ProductDetails from './ProductDetails';
import ShowCart from './ShowCart';
import OrderSummary from './OrderSummary';
import Checkout from './Checkout';
import ViewOrders from './ViewOrders';
import OrderProducts from './OrderProducts';
import UpdateStatus from './UpdateStatus';
import SearchProducts from './SearchProducts';
import AdminHomepage from './AdminHomepage';
import CreateAdmin from './CreateAdmin';
import UserOrders from './UserOrders';
import UserRoutesProtector from './UserRoutesProtector';
import ContactUs from './ContactUs';


const SiteRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/homepage" />} />
            <Route path='/homepage' element={<Homepage />} />
            <Route path='/login' element={<Loginhere />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/thanks' element={<Thanks />} />
            <Route path='/viewmembers' element={<ViewMember />} />
            <Route path='/managecategory' element={<Managecategory />} />
            <Route path='/managesubcategory' element={<Managesubcat />} />
            <Route path='/manageprod' element={<ManageProd />} />
            <Route path='/searchmembers' element={<Searchuser />} />
            <Route path='/updatesubcategory' element={<UpdateSubCat />} />
            <Route path='/updateproduct' element={<UpdateProduct />} />
            <Route path='/changepassword' element={<UserRoutesProtector MyComp={ChangePassword} />} />
            <Route path='/cart' element={<ShowCart />} />
            <Route path='/subcategories' element={<ShowSubCategory />} />
            <Route path='/products' element={<Showproducts />} />
            <Route path='/showcategory' element={<ShowCategory />} />
            <Route path='/details' element={<ProductDetails />} />
            <Route path='/ordersummary' element={<OrderSummary />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/vieworders' element={<ViewOrders />} />
            <Route path='/orderproducts' element={<OrderProducts />} />
            <Route path='/updatestatus' element={<UpdateStatus />} />
            <Route path='/orderhistory' element={<UserOrders />} />
            <Route path='/searchproducts' element={<SearchProducts />} />
            <Route path='/adminhome' element={<AdminHomepage />} />
            <Route path='/createadmin' element={<CreateAdmin />} />
            <Route path='/ordersummary' element={<UserRoutesProtector MyComp={OrderSummary} />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/*' element={<h1>Page Not Found</h1>} />
        </Routes>
    )
}
export default SiteRoutes;