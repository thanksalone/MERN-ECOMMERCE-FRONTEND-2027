import type { cartItems, shippingInfo, User } from "./types";



export interface UserReducerInitialState {
    user: User | null;
    loading: boolean;
}


export interface CartReducerInitialState {
    // cartReducer: any;
    loading: boolean;
    cartItems: cartItems[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfo;
};