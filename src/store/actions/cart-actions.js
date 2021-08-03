import { cartActions } from '../slices/cart-slice';
import axios from 'axios';
import { messageActions } from '../slices/message-slice';
import Cookies from 'js-cookie';
export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:8000/cart", { withCredentials: true }
			);
			return response.data
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.updateCart({
					items: cartData.products || [],
					cart: cartData,
				})
			);
			console.log(cartData)

		} catch (error) {
			console.log(error)
		}
	};
};

export const addToCart = (productId, formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				`http://localhost:8000/cart/${productId}/addtocart`,
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const cartData = await sendData();
			console.log(cartData.products)
			dispatch(
				cartActions.updateCart({
					items: cartData.products || [],
					cart: cartData,
				})

			);
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Added to cart!',
				})
			);

		} catch (error) {
			dispatch(

				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error,
				})
			);

			console.log(error)
		}
	};
};
export const removeFromCart = (productId, formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				`http://localhost:8000/cart/${productId}/removefromcart`,
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const cartData = await sendData();
			console.log(cartData.products)
			dispatch(
				cartActions.updateCart({
					items: cartData.products || [],
					cart: cartData,
				})
			);

			// dispatch(
			// 	cartActions.addToCart({
			// 		item: cartData.products,
			// 	})
			// );
			// console.log(cartData)
		} catch (error) {
			console.log(error)
		}
	};
};

export const addOneQty = (productId, formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				`http://localhost:8000/cart/${productId}/addoneqty`,
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const cartData = await sendData();
			const newProduct = cartData.products.filter(product => {
				return product.productId._id === productId
			})

			dispatch(
				cartActions.updateCart({
					items: cartData.products || [],
					cart: cartData,
				})
			);
			console.log(newProduct)
			// dispatch(
			// 	cartActions.addToCart({
			// 		item: cartData.products,
			// 	})
			// );
			// console.log(cartData)
		} catch (error) {
			console.log(error)
		}
	};
};

export const removeOneQty = (productId, formData) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.post(
				`http://localhost:8000/cart/${productId}/removeoneqty`,
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const cartData = await sendData();
			console.log(cartData.products)
			dispatch(
				cartActions.updateCart({
					items: cartData.products || [],
					cart: cartData,
				})
			);

			// dispatch(
			// 	cartActions.addToCart({
			// 		item: cartData.products,
			// 	})
			// );
			// console.log(cartData)
		} catch (error) {
			console.log(error)
		}
	};
};


export const checkoutCart = () => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await axios.get(
				"http://localhost:8000/cart", { withCredentials: true }
			);

			return response.data
		};

		try {
			const cartData = await sendData();
			await axios.post("http://localhost:8000/produce", { topicName: "userCart", message: { key: Cookies.get('userId'), value: cartData } }, { withCredentials: true })

			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Thank you for your order!',
				})
			);
			console.log(cartData)
		} catch (error) {
			console.log(error)
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: error,
				})
			);
		}
	};
};

