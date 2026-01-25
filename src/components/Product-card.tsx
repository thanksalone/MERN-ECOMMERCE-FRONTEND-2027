import { FaExpandAlt, FaPlus } from "react-icons/fa";
// import type { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import type { cartItems } from "../types/types";

type ProductProps = {
  productId : string;
  photo : string;
  name : string;
  price : number;
  stock : number;
  handler? : (cartItem: cartItems) => string | undefined;

};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductProps)=> {
return (
  <><div className="product-card">
    <img src={`${server}/${photo}`} alt="" />
    <p>{name}</p>
    <span>{price}</span>

    <div>
      <button onClick={() => handler!({
        productId,
        price,
        name,
        photo,
        stock,
        quantity: 1,
      })}>
      <FaPlus />
    </button>
{/* 
     <button
          // onClick={() =>
          //   handler({
          //     productId,
          //     price,
          //     name,
          //     photo: photo[0],
          //     stock,
          //     quantity: 1,
          //   })
          // }
        > */}
          {/* <FaPlus />
        </button> */}
        
   <Link to={`/product/${productId}`}>
          <FaExpandAlt />
    </Link>
    </div>
  </div>
 </>
)}

export default ProductCard