
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload 
            const existing = state.list.find(i => i.productID === item.productID)

            if (existing) {
                existing.quantity = item.quantity
                existing.price = item.price
            } else {
                state.list.push(item)
            }
        },
        setCartList: (state, action) => {
            state.list = action.payload
        },
        removeCartItem: (state, action) => {
            state.list = state.list.filter((item) => item._id !== action.payload)
        },
        clearCartState: (state) => {
            state.list = []
        },
        updateCartItemQty: (state, action) => {
            const{ productID, quantity} = action.payload
            const item = state.list.find((i) => i.productID === productID || i._id === productID)
            if(item) {
                item.quantity = quantity
            }
        },
        
    },
});

export const { addItemToCart, setCartList, removeCartItem, clearCartState, updateCartItemQty} = cartSlice.actions;
export default cartSlice.reducer;



// ----------------- Selectors -----------------
// total number of items (sum of quantities)
export const selectCartCount = (state) =>
    (state.cart?.list ?? []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

// optional: total price (grand total)
export const selectCartTotal = (state) =>
  (state.cart?.list ?? []).reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 0) * (Number(item.discountPrice ?? item.price ?? 0) || 0),
    0
  );