import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../../types/reducer-types";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useDeleteProductMutation, useProductDetailQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import { responseToast } from "../../../utils/features";
import { FaTrash } from "react-icons/fa";




// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";



const ProductManagement = () => {
  const {user} = useSelector(
    (state: {userReducer: UserReducerInitialState}) => state.userReducer
  );

  const params = useParams()
  const navigate = useNavigate();

  const {isError, data, isLoading} = useProductDetailQuery(params.id!);

  const {photo, category, name, stock, price} = data?.product || {
     photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  // const [name, setName] = useState<string>("puma Shoes");
  // const [price, setPrice] = useState<number>(2000);
  // const [stock, setStock] = useState<number>(10);
  // const [photo, setPhoto] = useState<string>(img);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [StockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setphotoUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  


  const changeImageHanler = (e: ChangeEvent<HTMLInputElement>) => {
    const file : File | undefined = e.target.files?.[0];

    const reader : FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload= () => {
        if (typeof reader.result === "string"){
           setphotoUpdate(reader.result);
           setPhotoFile(file);
        }
           
      };
    }
  };

  const submitHandler =  async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setName(nameUpdate);
    // setPrice(priceUpdate);
    // setStock(StockUpdate);
    // setPhoto(photoUpdate);

    const formData = new FormData();

    if(nameUpdate) formData.set("name", nameUpdate);
    if(priceUpdate) formData.set("price", priceUpdate.toString());
    if(StockUpdate != undefined) formData.set("stock", StockUpdate.toString());
    if(photoFile) formData.set("photo", photoFile);
    if(categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/products");
    // responseToast(res, navigate, "/admin/products");


  };

  const deleteHandler =  async() => {
 

    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/products");

  };



  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      // setphotoUpdate(data.product.photo);
      setStockUpdate(data.product.stock);
      setPriceUpdate(data.product.price);
      setCategoryUpdate(data.product.category);
    }
  }, [data])
  

      if (isError) return <Navigate to= {"1404"} />
  


  return (
    <div className="adminContainer">
      <AdminSidebar />

      <main className="product-management">
      {
        isLoading? <Skeleton length={20} /> : (
          <>
                   <section>
          <strong>ID - {data?.product._id}</strong>

          <img src={photo} alt="product" />          
          <p>{name}</p>
          {stock > 0 ? (<span className="green">{stock} Available</span>)
          : <span className="red">Not Available</span>  
        }
        <h3>${price}</h3>
        </section>

        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>

          <form action="" onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" required placeholder="Name" value={nameUpdate} onChange={(e)=> setNameUpdate(e.target.value)}/>
            </div> 

            <div>
              <label htmlFor="">Category</label>
              <input type="text" required placeholder="category" value={categoryUpdate} onChange={(e)=> setCategoryUpdate(e.target.value)}/>
            </div> 

            <div>
              <label htmlFor="">Price</label>
              <input type="number" required placeholder="Price" value={priceUpdate} onChange={(e) => setPriceUpdate(Number(e.target.value))} />
            </div>

            <div>
              <label htmlFor="">Stock</label>
              <input type="number" required placeholder="Stock" value={StockUpdate} onChange={(e) => setStockUpdate(Number(e.target.value))}/>
            </div>
            
            <div>
              <label htmlFor="">Photo</label>
              <input type="file" onChange={changeImageHanler} />
            </div>

              {photoUpdate && <img src={photoUpdate} alt="New IMage" />}

              <button type="submit">Update</button>

          </form>
        </article>

          </>
        )
      }
      </main>
    </div>
  )

}

export default ProductManagement;