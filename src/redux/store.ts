import { configureStore } from "@reduxjs/toolkit";
// import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";
// import { userReducer } from "./reducer/userReducer";
// import { cartReducer } from "./reducer/cartReducer";
// import { orderApi } from "./api/orderAPI";
// import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;






// export const store = configureStore({
//   reducer: {
//     [userAPI.reducerPath]: userAPI.reducer,
//     [userReducer.name]: userReducer.reducer,
//   },
//   middleware: (mid) => [...mid(), userAPI.middleware],

// });









export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },

  middleware: (mid) => [...mid(), userAPI.middleware, productAPI.middleware, orderApi.middleware, dashboardApi.middleware],
  // middleware: (getDefaultMiddleware) => 
  //   getDefaultMiddleware()
  //     .concat(userAPI.middleware)
  //     .concat(productAPI.middleware)
  //     .concat(orderApi.middleware)
  //     .concat(dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;