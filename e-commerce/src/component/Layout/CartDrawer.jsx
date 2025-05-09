


import { IoMdClose } from 'react-icons/io'
import CartContent from '../Cart/CartContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartDrawer = ({ draweOpen, toggleCartdrawer }) => {

  const navigate = useNavigate()
  const {user,guestId}= useSelector((state) => state.auth);
  const { cart } = useSelector((state)=> state.cart);
  const userID = user? user._id : null;
  const handleCheckOut = () =>{
    toggleCartdrawer();
    if(!user){
      navigate("/login?redirect =checkout")
    } else {
      navigate("/checkout");
    }
    
  };

  return (
    <div className={` fixed top-0 right-0 w-3/4 md:w-[30rem] sm:w-1/2 h-full bg-white shadow-lg
     transform transition-transform duration-300 flex flex-col z-50 ${draweOpen ? "translate-x-0": "translate-x-full"} `}>


     {/* Close Button  */}
     <div onClick={toggleCartdrawer} className=' flex justify-end p-4'>
        <IoMdClose className=' w-6 h-6 text-gray-600 cursor-pointer'/>
     </div>

     {/* Cart content with scrollable area */}
     <div className=' flex-grow overflow-y-auto p-4'>
        <h2 className=' font-semibold text-xl mt-4'>Your Cart</h2>
        {cart && cart?.products?. length > 0 ? (<CartContent cart={cart} userID={userID} guestId={guestId}/>) 
        : (
          <p>Your cart is empty</p>
        )}
        
        {/* Component for the cart content */}
     </div>

     {/* checkOut buttton */}
     <div className=' p-4 bg-white sticky bottom-0'>
      {cart && cart?.products?. length > 0 && (
        <>
      <button onClick={handleCheckOut}
      className='w-full bg-black text-white py-3 font-semibold rounded-lg hover:bg-gray-800 transition'>Checkout</button>
     <p className='text-sm tracking-tight text-gray-500 mt-2 text-center'>
      Shipping, Tax and discount codes calculated checkout.
      </p>
        </>
      )}
    
     </div>
    </div>
  )
}

export default CartDrawer