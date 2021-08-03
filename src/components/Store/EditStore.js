import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Row, Button, Alert, Form, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStoreData, editStore } from '../../store/actions/store-actions';

const EditStore = () => {
	const [Loading, setLoading] = useState(true)

	const stores = useSelector((state) => state.store.stores);
	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchStoreData());
		setLoading(false)
	}, [dispatch, setLoading]);


	let thisStore;
	if (stores.length > 0) {
		thisStore = stores.filter(store => {
			return store._id === params.storeId
		})
	}
	// setStoreName(thisStore[0].name)

	const editInput = useRef(null);
	const editStoreHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			dispatch(editStore(params.storeId, { name: editInput.current.value }))
		}
		catch (e) {
			console.log(e)
		}

	};
	return (
		!Loading &&
		< React.Fragment >
			<Container className="p-3">
				<Row className="justify-content-md-center mt-5" xs={1} md={3}>

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Store Name: </Form.Label>
							<Form.Control type="text" defaultValue={stores.length > 0 ? thisStore[0].name : "test"} ref={editInput} />
						</Form.Group>
						<Button onClick={editStoreHandler}>Edit Store</Button>
					</Form>				</Row>

			</Container>
		</React.Fragment >
	);
}

export default EditStore

