import { useState, type ChangeEvent, type FormEvent } from "react"
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";



const NewProduct = () => {


    const {user} = useSelector((state: {userReducer: UserReducerInitialState})=>
         state.userReducer
    );
   


    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [photo, setPhoto] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [photoFile, setPhotoFile] = useState<File>();

    const [newProduct] = useNewProductMutation();
    const navigae = useNavigate()
    

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file){
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") setPhoto(reader.result);
                setPhotoFile(file);
            };
        }
    };

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !price || !stock || !category || !photo)
            return;

       const formData = new FormData();

       formData.set("name", name);
       formData.set("price", price.toString());
       formData.set("stock", stock.toString());
       formData.set("photo", photo);
       formData.set("category", category);
       if(photoFile) formData.set("photo", photoFile);

       const res = await newProduct({id: user?._id!, formData});
       
       responseToast(res, navigae, "/admin/Products");


    };

    return(
        <div className="adminContainer">
            <AdminSidebar />

            <main className="product-management">
                <article>
                    <form action="" onSubmit={submitHandler}>
                        <h2>New Product</h2>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="">Price</label>
                            <input type="number" required placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

                        </div>

                        <div>
                            <label htmlFor="">Stock</label>
                            <input type="number" required placeholder="Stok" value={stock} onChange={(e) => setStock(Number(e.target.value)) } />
                        </div>

                        <div>
                            <label htmlFor="">Category</label>
                            <input type="text" required placeholder="category" value={category} onChange={(e) => setCategory(e.target.value) } />
                        </div>

                        <div>
                            <label htmlFor="">Photo</label>
                            <input type="file" required onChange={changeImageHandler} />
                        </div>

                        {photo && <img  src={photo} alt="New Image" />}

                        <button type="submit">Create</button>
                    </form > 
                </article>
            </main>
        </div>
    );


};


export default NewProduct;



