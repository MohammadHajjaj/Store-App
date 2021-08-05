import { productActions } from '../slices/product-slice';
import { messageActions } from '../slices/message-slice';

import axios from 'axios';

export const fetchProductsData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:8000/products", { withCredentials: true }
			);
			return response.data
		};

		try {
			const productsData = await fetchData();
			// console.log(productsData)

			dispatch(
				productActions.fetchProducts({
					products: productsData,
					productDetails: []
				})
			);
		} catch (error) {
			console.log(error)
		}
	};
};

export const fetchProductDetails = (productId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:8000/products/${productId}`, { withCredentials: true }
			);
			return response.data


		};

		try {
			const productData = await fetchData();
			console.log(productData)

			dispatch(
				productActions.fetchProductDetails({
					productDetails: productData,
				})
			);
		} catch (error) {
			console.log(error)
		}
	};
};


export const createProduct = (storeId, formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				`http://localhost:8000/stores/${storeId}/product`,
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
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)


			console.log(data)
			// console.log(storeData)
		} catch (error) {
			dispatch(

				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Creation failed!',
				})
			);
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)


			console.log(error)
		}
	};
};

export const editProduct = (productId, formData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.patch(
				`http://localhost:8000/products/${productId}`, formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const productData = await fetchData();
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Edited Sucessfully!',
				})
			);
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)



			// console.log(storeData)

		} catch (error) {
			console.log(error)
			dispatch(

				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Editing failed!',
				})
			);
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)


		}
	};
};
