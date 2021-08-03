
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Button, Form, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails, editProduct } from '../../store/actions/product-actions';

const EditProduct = (props) => {
	const [Loading, setLoading] = useState(true)

	const product = useSelector((state) => state.product.productDetails);
	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProductDetails(params.productId));
		setLoading(false)
	}, [dispatch, setLoading]);

	const [editSuccessful1, seteditSuccessful1] = useState(false)

	// let thisStore;
	// if (stores.length > 0) {
	// 	thisStore = stores.filter(store => {
	// 		return store._id === params.storeId
	// 	})
	// }
	// setStoreName(thisStore[0].name)

	const editproductName = useRef(null);
	const editproductPrice = useRef(null);
	const editproductStock = useRef(null);

	const editProductHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			dispatch(editProduct(params.productId, { name: editproductName.current.value, price: editproductPrice.current.value, stock: editproductStock.current.value }))
			seteditSuccessful1(true)
		}
		catch (e) {
			seteditSuccessful1(false)
			console.log(e)
		}

	};
	return (
		!Loading &&
		< React.Fragment >


			<Row>
				<Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
					<div className="card">
						<article className="card-body">
							<h4 className="card-title mb-4 mt-1">Edit Product</h4>

							<form className="">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Product Name: </Form.Label>
									<Form.Control defaultValue={product.name} type="text" ref={editproductName} placeholder="Enter Product Name" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Product Price: </Form.Label>
									<Form.Control defaultValue={product.price} type="Number" ref={editproductPrice} placeholder="Enter Product Price" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Product Stock: </Form.Label>
									<Form.Control defaultValue={product.stock} type="Number" ref={editproductStock} placeholder="Enter Product Stock" />
								</Form.Group>
								<Button onClick={editProductHandler}>Edit Product</Button>

							</form>
						</article>
					</div>
				</Col>
			</Row>

		</React.Fragment >
	);
}

export default EditProduct

