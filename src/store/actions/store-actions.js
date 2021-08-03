import { storeActions } from '../slices/store-slice';
import { messageActions } from '../slices/message-slice';

import axios from 'axios';

export const fetchStoreData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:8000/stores", { withCredentials: true }
			);
			return response.data
		};

		try {
			const storeData = await fetchData();
			dispatch(
				storeActions.fetchStores({
					stores: storeData,
				})
			);
		} catch (error) {
			console.log(error)
		}
	};
};
export const fetchStoreProducts = (storeId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:8000/stores/${storeId}`, { withCredentials: true }
			);
			return response.data
		};

		try {
			const storeData = await fetchData();
			// console.log(storeData)

			dispatch(
				storeActions.fetchStoreProducts({
					storeProducts: storeData.products,
				})
			);
		} catch (error) {
			console.log(error)
		}
	};
};

export const editStore = (storeId, formData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.patch(
				`http://localhost:8000/stores/${storeId}`, formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const storeData = await fetchData();
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Edited Sucessfully!',
				})
			);

			// console.log(storeData)

		} catch (error) {
			console.log(error)
			dispatch(

				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error,
				})
			);

		}
	};
};

export const createStore = (formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				"http://localhost:8000/stores",
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const data = await sendData();
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Created Sucessfully!',
				})
			);


			console.log(data)
			// console.log(storeData)
		} catch (error) {
			console.log(error)
			dispatch(

				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error,
				})
			);

		}
	};
};

