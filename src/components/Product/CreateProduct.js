import React, { useRef, } from 'react';
import { Form, Container, Row, Button, } from 'react-bootstrap';
import { useDispatch, } from 'react-redux';
import { createProduct } from '../../store/actions/product-actions';
import { useParams } from 'react-router-dom';

const CreateStore = () => {
	// const [StoreName, setStoreName] = useState();
	const productName = useRef(null);
	const productPrice = useRef(null);
	const productStock = useRef(null);

	const dispatch = useDispatch();
	const params = useParams();

	const createProductHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			dispatch(createProduct(params.storeId, { name: productName.current.value, price: productPrice.current.value, stock: productStock.current.value }))
		}
		catch (e) {
			console.log(e)
		}

	};

	return (
		< React.Fragment >
			<Container className="p-3">
				<Row className="justify-content-md-center mt-5" xs={1} md={3}>

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Product Name: </Form.Label>
							<Form.Control type="text" ref={productName} placeholder="Enter Product Name" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Product Price: </Form.Label>
							<Form.Control type="Number" ref={productPrice} placeholder="Enter Product Price" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Product Stock: </Form.Label>
							<Form.Control type="Number" ref={productStock} placeholder="Enter Product Stock" />
						</Form.Group>

						<Button onClick={createProductHandler}>Create Product</Button>
					</Form>				</Row>

			</Container>
		</React.Fragment >
	);
}

export default CreateStore


