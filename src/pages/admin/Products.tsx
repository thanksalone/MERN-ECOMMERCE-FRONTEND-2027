import { useEffect, useState, type ReactElement } from "react"
import { Link } from "react-router-dom";
import type { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import type { customErrorType } from "../../types/api-types";
import { CLOUD_SERVER} from "../../redux/store";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";






interface DataType {
  photo: ReactElement;
  name:  string;
  price: number;
  stock: number;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {Header: "Photo", accessor: "photo"},
  {Header: "Name", accessor: "name"},
  {Header: "Price", accessor: "price"},
  {Header: "Stock", accessor: "stock"},
  {Header: "Action", accessor: "action"},

];


const Products = () => {
  const {user} = useSelector(
    (state: {userReducer: UserReducerInitialState}) => state.userReducer
  );

  const [rows, setRows] = useState<DataType[]>([]);

  const {isLoading, isError, error, data} = useAllProductsQuery(user?._id!);

  if (isError) {
    const err = error as customErrorType;
    toast.error((err).data.message);
  };

  useEffect(() => {
    if (data) 
    setRows(
      data.product.map((i) => ({
        photo: <img src= "https://res.cloudinary.com/drhsmyekn/image/upload/v1769632294/mern_uploads/fljive7lwpf0wvc3nnnk"/>,
        name: i.name,
        price: i.price,
        stock: i.stock,
        action: <Link to= {`/admin/product/${i._id}`}>Manage</Link>,
      }))
    );

   
  }, [data]);
  

 





  const Table =  TableHOC<DataType>(
      columns,
      rows,
      "dashboard-product-box",
      "Products",
      true
    
  )();

  return (
    <div className="adminContainer">
      <AdminSidebar />
      
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
      <FaPlus />
      </Link>
    </div>
  )

}




export default Products