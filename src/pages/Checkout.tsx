import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { NewOrderRequest } from '../types/api-types';
import { useDispatch, useSelector } from 'react-redux';
import type { CartReducerInitialState } from '../types/reducer-types';
import { useNewOrderMutation } from '../redux/api/orderAPI';
// import { userAPI } from '../redux/api/userAPI';
import { resetCart } from '../redux/reducer/cartReducer';
import { responseToast } from '../utils/features';
import type { RootState } from '../redux/store';




const stripePromise =  loadStripe(import.meta.env.VITE_STRIPE_KEY);


  

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const {user} = useSelector(
      (state: RootState) => state.userReducer
    );
  const  {shippingInfo,cartItems,subTotal,tax,discount,shippingCharges,
    total
  } = useSelector(
      (state: {cartReducer: CartReducerInitialState}) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [newOrder] = useNewOrderMutation();

  const submitHanlder = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);
// shippingInfo,orderItems,user,subTotal,tax,total,discount,shippingCharges
    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subTotal,
      tax,discount,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHanlder}>
        <PaymentElement />
        <button type='submit' disabled={isProcessing}>{isProcessing ? "Processing..." : "Pay"}</button>
      </form>
    </div>
  );
};

const Checkout = () => {

    const location = useLocation();
    const clientSecret: string | undefined = location.state;

    if (!clientSecret)  return <Navigate to={"/shipping"} />;

  return (
    <Elements
    options={{
      clientSecret,
    }}
    stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout


