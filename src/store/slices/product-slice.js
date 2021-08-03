import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
		productDetails: []
	},
	reducers: {
		fetchProducts(state, action) {
			state.products = action.payload.products;
		},
		fetchProductDetails(state, action) {
			state.productDetails = action.payload.productDetails;
		},

	},
});

export const productActions = productSlice.actions;

export default productSlice;
