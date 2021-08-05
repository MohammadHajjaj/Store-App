import { userActions } from '../slices/user-slice';
import { messageActions } from '../slices/message-slice';

import axios from 'axios';

export const createUser = (formData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:8000/createuser",
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const userData = await fetchData();
			dispatch(
				userActions.createUser({
					username: userData.name,
				})
			);
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



			console.log(userData)

		} catch (error) {
			dispatch(
				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error.message,
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


export const loginUser = (formData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:8000/login",
				formData, { withCredentials: true }
			);
			return response.data
		};

		try {
			const userData = await fetchData();
			dispatch(
				userActions.createUser({
					username: userData.name,
				})
			);
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Logged In Sucessfully!',
				})
			);
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)


			console.log(userData)
		} catch (error) {
			dispatch(
				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error.message,
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

export const logoutUser = (formData) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:8000/logout", {},
				{ withCredentials: true }
			);
			return response.data
		};

		try {
			const userData = await fetchData();
			dispatch(
				userActions.createUser({
					username: '',
				})
			);
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Logged Out Sucessfully!',
				})
			);
			setTimeout(() => {
				dispatch(
					messageActions.hideNotification({
						status: null
					})
				);
			}, 2000)


			console.log(userData)
		} catch (error) {
			dispatch(
				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error.message,
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
// export const fetchStoreProducts = (storeId) => {
// 	return async (dispatch) => {
// 		const fetchData = async () => {
// 			const response = await axios.get(
// 				`/stores/${storeId}`, { withCredentials: true }
// 			);
// 			return response.data
// 		};

// 		try {
// 			const storeData = await fetchData();
// 			// console.log(storeData)

// 			dispatch(
// 				storeActions.fetchStoreProducts({
// 					storeProducts: storeData.products,
// 				})
// 			);
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	};
// };

// export const editStore = (storeId, formData) => {
// 	return async (dispatch) => {
// 		const fetchData = async () => {
// 			const response = await axios.patch(
// 				`/stores/${storeId}`, formData, { withCredentials: true }
// 			);
// 			return response.data
// 		};

// 		try {
// 			const storeData = await fetchData();
// 			dispatch(
// 				messageActions.showNotification({
// 					status: 'success',
// 					title: 'Success!',
// 					message: 'Edited Sucessfully!',
// 				})
// 			);

// 			// console.log(storeData)

// 		} catch (error) {
// 			console.log(error)
// 			dispatch(

// 				messageActions.showNotification({
// 					status: 'error',
// 					title: 'Error!',
// 					message: error,
// 				})
// 			);

// 		}
// 	};
// };

// export const createStore = (formData) => {
// 	return async (dispatch) => {
// 		const sendData = async () => {
// 			const response = await axios.post(
// 				"/stores",
// 				formData, { withCredentials: true }
// 			);
// 			return response.data
// 		};

// 		try {
// 			const data = await sendData();
// 			dispatch(
// 				messageActions.showNotification({
// 					status: 'success',
// 					title: 'Success!',
// 					message: 'Created Sucessfully!',
// 				})
// 			);


// 			console.log(data)
// 			// console.log(storeData)
// 		} catch (error) {
// 			console.log(error)
// 			dispatch(

// 				messageActions.showNotification({
// 					status: 'error',
// 					title: 'Error!',
// 					message: error,
// 				})
// 			);

// 		}
// 	};
// };

