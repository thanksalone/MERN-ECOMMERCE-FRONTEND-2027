import {  useEffect, useState, type ReactElement } from "react";
import { FaTrash } from "react-icons/fa";
import { type Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userAPI";
import type { customErrorType } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";


interface DataType {
  photo: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}


const columns: Column<DataType>[] =[
   {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Customers = () => {

 const {user} = useSelector(
    (state: RootState) => state.userReducer
  );

  const {isLoading,isError, error, data} = useAllUsersQuery(user?._id!);
  const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async(userId: string) => {
    const res =  await deleteUser({
      userId,
      adminUserId: user?._id!,
    });
    responseToast(res, null, "")
  };


  const [rows, setRows] = useState<DataType[]>([]);

    if(isError) {
      const err = error as customErrorType;
      toast.error(err.data.message);
    };

    useEffect(() => {
  if(data)
    setRows(
      data.user.map((i)=> ({
        photo: (<img src={i.photo} alt="" style={{borderRadius: "50%",}} />),
        name: i.name,
        email: i.email,
        gender: i.gender,
        role: i.role,
        action: (
          <button onClick={() => deleteHandler(i._id)}>
            <FaTrash />
          </button>
        ),

      }))
    )
}, [data]);



//  const Table= useCallback(
//     TableHOC<DataType>(
//       columns,
//       rows,
//       "dashboard-product-box",
//       "Customers",
//       true
//     ),[]
//   );



  const Table= 
    TableHOC<DataType>(
      columns,
      rows,
      "dashboard-product-box",
      "Customers",
      true,
    )();
 

  return (
  <div className="adminContainer">
    <AdminSidebar />
   <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
  </div>
  );
};

export default Customers;