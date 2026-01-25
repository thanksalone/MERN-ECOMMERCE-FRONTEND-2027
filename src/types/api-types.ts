import type {
  Bar,
  cartItems,
  Line,
  OrderType,
  Pie,
  Product,
      shippingInfo,
      Stats,
      User,
} from "./types";


export type AllUsersResponse = {
  success: boolean;
  user: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllProductResponse = {
  success: boolean;
  product: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  category: string[]; 
};


export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};



export type customErrorType = {
  status : number;
  data : {
    message: string;
    success: boolean;
  };
};


// export type SearchProductResponse = {
//   success: boolean;
//   product: Product[];
//   totalPage: number;
// };

export type SearchProductResponse = AllProductResponse & {
  totalPage: number;
};

export type SearchProductRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};


export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type deleteProductRequest = {
  userId: string;
  productId: string;
};


export type NewOrderRequest = {
  shippingInfo: shippingInfo;
  orderItems: cartItems[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string
};

export type UpdateOrderRequest = {
 userId: string;
 orderId: string;
};

export type AllOrderResponse = {
  success: boolean;
  order: OrderType[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: OrderType;
};


export type deleteUserRequest = {
  userId: string;
  adminUserId: string;
};


