import { configureStore } from '@reduxjs/toolkit';

// import uiSlice from './ui-slice';
import storeSlice from './slices/store-slice';
import productSlice from './slices/product-slice';
import cartSlice from './slices/cart-slice';
import messageSlice from './slices/message-slice';
import userSlice from './slices/user-slice';


const store = configureStore({
	reducer: { store: storeSlice.reducer, product: productSlice.reducer, cart: cartSlice.reducer, message: messageSlice.reducer, user: userSlice.reducer },
});

export default store;
