import { useState } from "react";
// import type { User } from "../types/types";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import type { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import {signOut} from "firebase/auth";
// import { auth } from "../firebase";


// interface PropsType {
//     user: User | null;
// }
interface propType{
    user: User | null;
}
 

const Header = ({user}:propType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const user ={_id:1264, role:"user"}
    // const user = {_id:"",role:""};
    // const user = null;
    const logoutHandler = async() => {
        try{
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setIsOpen(false);
              }catch(error){toast.error("sign out Fail")};
              
    };
  return (
    <nav className="header">
        <Link onClick={()=>setIsOpen(false)} to={"/"}>Home</Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
            <FaSearch />
        </Link>
        
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
            <FaShoppingBag />
        </Link>
        
            {user?._id?(
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {user.role === "admin" &&(
                                <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"}>
                                    Admin
                                </Link>
                            )}

                            <Link onClick={()=>setIsOpen(false)} to={"/orders"}>
                                Orders
                            </Link>
                            <button onClick={logoutHandler}>
                               <Link to={"/login"}><FaSignOutAlt /></Link>
                            </button>
                        </div>
                    </dialog>
                </>
            ):(
                <Link to={"/login"}>
                    <FaSignInAlt />
                </Link>
            )}
        
    </nav>
  )
}

export default Header;


