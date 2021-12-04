import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../types/Card";

interface ICart {
  itemInCart: Card[];
  cartTotalAmount: string;
  cartTotalQuantity: number;
}

const initialState: ICart = {
  itemInCart: [],
  cartTotalAmount: "0",
  cartTotalQuantity: 0,
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
    removeFromCart: (state: ICart, action) => {
      state.itemInCart = state.itemInCart.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state: ICart, action: PayloadAction<Card>) => {
      const cartItem = state.itemInCart.find((item) => item.id === action.payload.id);
      cartItem && cartItem.amount--;
    },
    clearCart: (state) => {
      state.itemInCart = [];
    },
    getTotals: (state: ICart) => {
      const { cost, quantity } = state.itemInCart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.cost += itemTotal;
          cartTotal.quantity += amount;

          return cartTotal;
        },
        { cost: 0, quantity: 0 }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = cost.toFixed(2);
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
