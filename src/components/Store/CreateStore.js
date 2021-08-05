import React, { useRef, } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createStore } from '../../store/actions/store-actions';




const CreateStore = (props) => {
	// const [StoreName, setStoreName] = useState();
	const textInput = useRef(null);
	const imageInput = useRef(null);
	const dispatch = useDispatch();
	const createStoreHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			if (imageInput.current.value.trim() !== '') {
				dispatch(createStore({ name: textInput.current.value, image: imageInput.current.value }))
			}
			else {
				dispatch(createStore({ name: textInput.current.value }))
			}


		}
		catch (e) {
			console.log(e)
		}

	};

	return (
		< React.Fragment >
			<Row>
				<Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
					<div className="card">
						<article className="card-body">
							<h4 className="card-title mb-4 mt-1">Create A Store</h4>

							<form className="">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Store Name: </Form.Label>
									<Form.Control type="text" ref={textInput} placeholder="Enter Store Name" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Store Image: </Form.Label>
									<Form.Control type="text" ref={imageInput} placeholder="Optional Image!" />
								</Form.Group>

								<Button onClick={createStoreHandler}>Create Store</Button>
							</form>
						</article>
					</div>
				</Col>
			</Row>

		</React.Fragment >
	);
}

export default CreateStore


