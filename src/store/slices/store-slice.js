import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
	name: 'store',
	initialState: {
		stores: [],
		storeProducts: []
	},
	reducers: {
		fetchStores(state, action) {
			state.stores = action.payload.stores;
		},
		fetchStoreProducts(state, action) {
			state.storeProducts = action.payload.storeProducts;
		},

	},
});

export const storeActions = storeSlice.actions;

export default storeSlice;
