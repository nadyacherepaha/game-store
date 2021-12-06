import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types/Card";

interface ICart {
  itemInCart: ICard[];
  cartTotalAmount: number;
  cartTotalQuantity: number;
}

const initialState: ICart = {
  itemInCart: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const sliceCartName = "cart";

const cartSlice = createSlice({
  name: sliceCartName,
  initialState,
  reducers: {
    addToCart: (state: ICart, action: PayloadAction<ICard>) => {
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
    decreaseStuffQuantity: (state: ICart, action: PayloadAction<ICard>) => {
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
      state.cartTotalAmount = cost;
    },
  },
});

export default cartSlice;
