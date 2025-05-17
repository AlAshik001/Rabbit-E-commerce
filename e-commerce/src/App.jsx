import { BrowserRouter, Routes,Route } from "react-router-dom"
import { UserLayout } from "./component/Layout/UserLayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from "./component/Products/ProductDetails"
import CheckOut from "./component/Cart/CheckOut"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import MyOrderPage from "./pages/MyOrderPage"
import AdminLayout from "./component/Admin/AdminLayout"
import AdminHomePage from "./pages/AdminHomePage"
import UserManagement from "./component/Admin/UserManagement"
import ProductManagement from "./component/Admin/ProductManagement"
import EditProductPage from "./component/Admin/EditProductPage"
import OrderManagement from "./component/Admin/OrderManagement"


import {Provider} from "react-redux";
import Store from "./redux/Store";
import ProtectedRoute from "./component/Common/ProtecedRoute"

function App() {
  

  return (
    <>
    <Provider store={Store}>
    <BrowserRouter>
    
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="collections/:collection" element={<CollectionPage/>}/>
      <Route path="product/:id" element={<ProductDetails/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route 
      path="order-confirmation" 
      element={<OrderConfirmationPage/>}/>
      <Route path="order/:id" element={<OrderDetailsPage/>}/>
      <Route path="my-orders" element= {<MyOrderPage/>}/>
      </Route>
      

      <Route path="/admin"
       element={<ProtectedRoute role="admin">
         <AdminLayout/>
         </ProtectedRoute>}>
      <Route index element={<AdminHomePage/>}/>
      <Route path="users" element={<UserManagement/>}/>
      <Route path="products" element={<ProductManagement/>}/>
      <Route path="products/:id/edit" element={<EditProductPage/>}/>
      <Route path="orders" element={<OrderManagement/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
