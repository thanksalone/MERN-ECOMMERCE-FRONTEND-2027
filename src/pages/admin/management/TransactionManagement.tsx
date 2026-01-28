import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import type { UserReducerInitialState } from "../../../types/reducer-types";
import type { OrderItem, OrderType } from "../../../types/types";
import { responseToast } from "../../../utils/features";


const defaultData: OrderType = {
    shippingInfo: {
        address: "ddd",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    status: "ddd",
    _id: "",
    user: {
        name: "ddd",
        _id: "",
    },
    orderItems: [],

};




 


  const TransactionManagement = () => {
const {user} = useSelector(
    (state: {userReducer: UserReducerInitialState}) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);
  console.log("newAli");
  console.log(data);
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    // tax,
    // subtotal,
    // total,
    // discount,
    // shippingCharges,
  } = data?.order || defaultData;
  
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
      

    


    const updateHandler = async()=> {
        const res = await updateOrder({
            userId: user?._id!,
            orderId: data?.order._id!,
        });
        responseToast(res, navigate, "/admin/transaction");
    };
    const deleteHandler = async()=> {
        const res = await deleteOrder({
            userId: user?._id!,
            orderId: data?.order._id!,
        });
        responseToast(res, navigate, "/admin/transaction");
    };


    if (isError) return <Navigate to= {"404"} />


    return(
        <div className="adminContainer">
            <AdminSidebar />
            <main className="product-management">
               {
                isLoading ? <Skeleton length={20}/> :
                <>
                 <section style={{padding: "2rem"}}>
                    <h2>Order Items</h2>

                    {orderItems.map((i)=>(
                        <ProductCard
                        key={i._id}
                        name={i.name}
                        photo={photo}
                        productId={i.productId}
                        _id={i._id}
                        quantity={i.quantity}
                        price={i.price}
                        />
                    ))}
                </section>

                    <article className="shipping-info-card">
                    <button className="product-delete-btn" onClick={deleteHandler}>
                    <FaTrash />
                    </button>

                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>Adress: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}</p>
                    {/* <p>ShippingCharges: {shippingCharges}</p> */}
                    <h5>status Info</h5>
                    <p>
                        Status : {" "}
                        <span className={
                            status === "Delivered"? "purple" 
                            : status === "Shipped" ? "green" : "red"
                        }>
                            {status}
                        </span>
                    </p>

                    <button onClick={updateHandler}>{status === "Processing" ? "Shipped": status === "Shipped" ? "Delivered" : "Order Closed"}</button>
                </article>
                </>
               }

            </main>
        </div>
    )




  };

  const ProductCard = ({name, photo, price, quantity, _id}:OrderItem) => (
    <div className="transaction-product-card">
        <img src={photo} alt="name" />

        <Link to={`product/${_id}`}>{name}</Link>

        <span>
            ${price} * {quantity} = ${price * quantity}
        </span>
    </div>

  );

export default TransactionManagement;