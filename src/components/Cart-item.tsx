import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { cartItems } from "../types/types";

type CartItemProps = {
  cartItem: cartItems;
  incrementHanlder: (cartItem: cartItems) => void;
  decrementHanlder: (cartItem: cartItems) => void;
  removeHandler: (id: string) => void;
};



const CartItem = ({cartItem, decrementHanlder, incrementHanlder, removeHandler}:CartItemProps) => {
  const {photo, productId, name, price, quantity} = cartItem;
  return (
      <div className="cart-item">
        <img src={photo} alt={name} />
        <article>
          <Link to={`product/${productId}`}>{name}</Link>
          <span>{price}</span>
        </article>
        <div>
          <button onClick={() => decrementHanlder(cartItem)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => incrementHanlder(cartItem)}>+</button>
        </div>

        <button onClick={() => removeHandler(productId)}>
          <FaTrash />
        </button>
      </div>
  )
}

export default CartItem