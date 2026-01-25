export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};


export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};


export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
 
};

export type cartItems = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
 
};

export type OrderItem = Omit<cartItems, "stock"> & {_id: string};

export type OrderType = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  _id:string;
  user: {
    name: string;
    _id: string
  }

};


type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    orderMonthCount: number[];
    orderMonthlyRevenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransaction[];
};

type OrderFullfillment = {
  Processing: number;
  Shipped : number;
  Delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  OrderFullFillment: OrderFullfillment;
  ProductCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  user: number[];
  product: number[];
  orders: number[];
};
export type Line = {
  user: number[];
  product: number[];
  discount: number[];
  revenue: number[];
};

export type CouponType = {
  code: string;
  amount: number;
  _id: string;
};




