import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: ''
	},
	reducers: {
		createUser(state, action) {
			state.username = action.payload.username;
		},
		loginUser(state, action) {
			state.username = action.payload.username;
		},
		// fetchStoreProducts(state, action) {
		// 	state.storeProducts = action.payload.storeProducts;
		// },

	},
});

export const userActions = userSlice.actions;

export default userSlice;
