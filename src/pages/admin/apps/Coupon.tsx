import { useEffect, useState, type FormEvent } from "react";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import axios from "axios";
import { server } from "../../../redux/store";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../../types/reducer-types";


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";


const Coupon = () => {
   const {user} = useSelector((state: {userReducer: UserReducerInitialState})=>
           state.userReducer
      );

  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [incluedNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied]= useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon : string) =>{
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!incluedNumbers && !includeCharacters && !includeSymbols)
      return alert("plz select one AT leats");

    let result: string = prefix || "";
    const loopLenght: number= size - result.length;

    for (let i=0; i < loopLenght; i++) {
      let entireString : string = "";
      if (includeCharacters) entireString += allLetters;
      if (incluedNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
       result += entireString[randomNum];
    }

    setCoupon(result);

      const createCoupon = async () => {
     try {
       await axios.post(`${server}/api/v1/payement/coupon/new?id=${user?._id}`, { 
      coupon : result,
      amount : amount,
     });
   } catch (error) {
    console.error(error);
   }
  };
  createCoupon();


  };

  useEffect(() => {
    setIsCopied(false);
  },[coupon]);

  // useEffect(() => {


  // }, []);



  return(
<div className="adminContainer">
  <AdminSidebar />
  <main className="dashboard-app-container">
    <h1>Coupon</h1>
      <section>
        <form action="" onSubmit={submitHandler} className="coupon-form">
          <input type="text" placeholder="Text to INclued"
          value={prefix} onChange={(e) => setPrefix(e.target.value)} maxLength={size}
          />

           <input type="number" placeholder="Plz enter coupon discount Value"
          value={amount} onChange={(e) => setAmount(Number(e.target.value))} maxLength={size}
          />

           <input type="number" placeholder="Coupon Lenght"
          value={size} onChange={(e) => setSize(Number (e.target.value))} 
          min={8} max={25}
          />

                <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={incluedNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            <button type="submit">Generate</button>
        </form>

        {coupon && (
          <code>
            {coupon}{" "}
            <span onClick={(() => copyText(coupon))}>
               {isCopied ? "Copied" : "Copy"}
            </span>
          </code>
        )}
      </section>
    
  </main>
</div>


  );


};




export default Coupon;