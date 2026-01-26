import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/admin/Loader";
import ProtectedRoute from "./components/Protected-route";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import type { UserReducerInitialState } from "./types/reducer-types";



const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Products = lazy(() => import("./pages/admin/Products"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));

const NotFound = lazy(() => import("./pages/Not-found"));

// CHARTS
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));





// MANAGEMENT
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(() => import("./pages/admin/management/ProductManagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/TransactionManagement"));


// APPS

const Toss = lazy(() => import("./pages/admin/apps/Toss"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));

// HEADER ROUTES

const Header = lazy(() => import("./components/Header"));
// FrontEnd imports
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() => import("./pages/Product-details"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/Order-details"));
// const NotFound = lazy(() => import("./pages/Not-found"));
const Checkout = lazy(() => import("./pages/Checkout"));
const DiscountManagement = lazy(() => import("./pages/admin/Discount"));




const App = () => {
// const user=null;
// const user={_id:"yyeyrryty",role:"user"}
// const user=null;
//react redux se

const {user,loading} = useSelector((state: {userReducer: UserReducerInitialState})=> state.userReducer)
const dispatch = useDispatch() ;

useEffect(() => {
  onAuthStateChanged(auth, async(user)=>{
   if (user) {
     console.log("Logged in");
     const data = await getUser(user.uid)
     dispatch(userExist(data.user))
  }else dispatch(userNotExist())
  });
}, []);

  
  return loading ? <Loader /> : (
  <Router>
    
      <Suspense fallback={<Loader />} >
        
      <Header user={user} />
        <Routes>
          {/* frontEnd Header Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          

          {/* Not Logged in Routes */}
              <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

                  {/* Logged In User Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />

          </Route>




          {/* FrontEnd other Routes */}




          {/* ......................... */}


                        {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >



          
          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path="/admin/Customers" element={<Customers />}/>
          <Route path="/admin/products" element={<Products />}/>
          <Route path="/admin/Transaction" element={<Transaction />}/>

          

          {/* CHARTS */}

          <Route path="/admin/Charts/Bar" element={<BarCharts />} />
          <Route path="/admin/Charts/Pie" element={<PieCharts />} />
          <Route path="/admin/Charts/Line" element={<LineCharts />} />


          {/* MANAGEMENT */}
          <Route path="/admin/product/new" element={<NewProduct />}/>
          <Route path="/admin/product/:id" element={<ProductManagement />}/>
          <Route path="/admin/transaction/:id" element={<TransactionManagement />}/>

          {/* Apps */}

          <Route path="/admin/Apps/Toss" element={<Toss />} />
          <Route path="/admin/Apps/Coupon" element={<Coupon />} />
          <Route path="/admin/Apps/Stopwatch" element={<Stopwatch />} />

              
            {/* <Route path="/admin/discount/new" element={<NewDiscount />} /> */}

            <Route
              path="/admin/discount/:id"
              element={<DiscountManagement />}
            />
          
               </Route>

                <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
  </Router>
  );

};

export default App;
