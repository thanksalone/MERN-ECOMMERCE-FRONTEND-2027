import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart-item";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import type { CartReducerInitialState } from "../types/reducer-types";
import type { cartItems } from "../types/types";





const Cart = () => {
  const dispatch = useDispatch();
  const  {cartItems, subTotal, tax, total, shippingCharges, discount} = useSelector(
    (state: {cartReducer: CartReducerInitialState}) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  

    const incrementHanlder = (cartItem: cartItems)=> {
      if(cartItem.quantity >= cartItem.stock) return toast.error("No more stock available");
        dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
    };

    const decrementHanlder = (cartItem: cartItems)=> {
      if(cartItem.quantity <= 1) return toast.error("Quantity can't be less than 1");

        dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
    };

    const removeHandler = (productId: string)=> {
        dispatch(removeCartItem(productId));
    };




  useEffect(()=> {
    const {token: cancelToken, cancel} = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {

      if(couponCode) {
        axios
        .get(`${server}/api/v1/payement/discount?coupon=${couponCode}`,{cancelToken})
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(()=> {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
      }
      }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  }, [couponCode]);


  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  

  return (
  <div className="cart">
    <main>
     {
      cartItems.length > 0 ? (
         cartItems.map((i, idx) => (
        <CartItem 
        incrementHanlder={incrementHanlder}
        decrementHanlder={decrementHanlder}
        removeHandler={removeHandler}
        key={idx} cartItem={i} />
      ))
      ):(
        <h1>NO ITEMS FOUND</h1>
      )
     }
    </main>
    <aside>
      <p>Subtotal : Rs{subTotal}</p>
      <p>Shipping Charges : Rs{shippingCharges}</p>
      <p>Tax : Rs {tax}</p>
      <p>Discount : <em> - Rs {discount}</em></p>
      <p><b>Total : Rs {total}</b></p>

      <input type="text"
      placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>

      {couponCode && (
        isValidCouponCode ? (
          <span className="green">
            Rs {discount} off using the <code>{couponCode}</code>
          </span>
        ):(
          <span className="red">
            Invalid Coupon <VscError />
          </span>
        )
      )

      }

      
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
    </aside>


  </div>
  )
}

export default Cart