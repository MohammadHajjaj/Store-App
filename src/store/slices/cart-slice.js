import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [], cart: [], loading: true
	},
	reducers: {
		fetchCart(state, action) {
			state.items = action.payload.items
			state.cart = action.payload.cart
		},
		// addToCart(state, action) {
		// 	state.items.push(action.payload.item);
		// },
		updateCart(state, action) {
			state.items = action.payload.items;
			state.cart = action.payload.cart
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
