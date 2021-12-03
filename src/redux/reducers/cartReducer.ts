import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../types/Card";

interface ICart {
  itemInCart: Card[];
}

const initialState: ICart = {
  itemInCart: [],
};

const sliceCart = "cart";

export const cartSlice = createSlice({
  name: sliceCart,
  initialState,
  reducers: {
    addToCart: (state: ICart, action: PayloadAction<Card>) => {
      const cartItem = state.itemInCart.find((item) => item.id === action.payload.id);
      if (cartItem) {
        cartItem.amount++;
      } else {
        state.itemInCart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.itemInCart = state.itemInCart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const cartItem = state.itemInCart.find((item) => item.id !== action.payload.id);
      cartItem && cartItem.amount++;
    },
    decreaseQuantity: (state, action) => {
      const cartItem = state.itemInCart.find((item) => item.id !== action.payload.id);
      cartItem && cartItem.amount--;
    },
    clearCart: (state) => {
      state.itemInCart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
