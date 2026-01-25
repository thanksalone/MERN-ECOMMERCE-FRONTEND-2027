import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartReducerInitialState } from "../../types/reducer-types";
import type { cartItems, shippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax:0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItems>) => {
            state.loading = true;
            const index = state.cartItems.findIndex(
                (i) => i.productId === action.payload.productId
            );

            if (index !== -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);
            state.loading = false;
        },

        removeCartItem: (state, action:PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i)=>i.productId !== action.payload)
            state.loading = false;
        },

        calculatePrice: (state) => {
            // let subTotal = 0;
            // for (let i = 0; i < state.cartItems.length; i++){
            //     const items = state.cartItems[i];

            //     subTotal += items.price * items.quantity;
            // };

            const subTotal = state.cartItems.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );

            state.subTotal = subTotal;
            state.shippingCharges = state.subTotal > 1000? 0 : 200;
            state.tax = Math.round(state.subTotal * 0.18);
            state.total = state.subTotal + state.tax + state.shippingCharges - state.discount;
        },
          discountApplied: (state, action:PayloadAction<number>) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action:PayloadAction<shippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: ()=> initialState,

    },
});




export const {addToCart, removeCartItem, calculatePrice, discountApplied, saveShippingInfo, resetCart} = cartReducer.actions;