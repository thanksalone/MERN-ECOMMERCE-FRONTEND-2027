import { useEffect, useState, type ChangeEvent } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";






const Shipping = () => {

  const {cartItems, total} = useSelector(
    (state: {cartReducer: CartReducerInitialState})=> 
      state.cartReducer
  );

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  
 const navigate = useNavigate();
 const dispatch  = useDispatch();

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(saveShippingInfo(shippingInfo));

      try {
        const {data} = await axios.post(`${server}/api/v1/payement/create`, {
          amount : total,
        },
        {
        headers: {
          "Content-Type": "application/json",
             },
        });
        navigate("/pay", {
          state: data.clientSecret,
        })
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }; 
    };


   useEffect(() => {
   if (cartItems.length <= 0)  {
    navigate("/cart")
   }
  }, [cartItems]);
  

  return (
    <div className="shipping">
      <button className="back-btn" onClick={()=>{navigate("/cart")}}>
        <BiArrowBack />
      </button>

      <form action="" onSubmit={submitHandler}>
        <h1>Shipping Adress</h1>
        <input required type="text" placeholder="Adress" name="address"
        onChange={changeHandler} value={shippingInfo.address} />
        
         <input required type="text" placeholder="City" name="city"
        onChange={changeHandler} value={shippingInfo.city} />

         <input required type="text" placeholder="State" name="state"
        onChange={changeHandler} value={shippingInfo.state} />

        <select name="country" required 
        value={shippingInfo.country} onChange={changeHandler} id="">
          <option value="">Choose Country</option>
          <option value="pakistan">Pakistan</option>
        </select>

         <input required type="text" placeholder="Pin Code" name="pinCode"
        onChange={changeHandler} value={shippingInfo.pinCode} />

            <button type="submit">Pay Now</button>
      </form>
    </div>
  )
}

export default Shipping