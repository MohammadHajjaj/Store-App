import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { messageActions } from '../../store/slices/message-slice';
import { createCartFromSession } from '../../store/actions/cart-actions'
import { createUser } from '../../store/actions/user-actions'

import { Form, Row, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const CreateUser = () => {
	const dispatch = useDispatch();

	// const [username, setusername] = useState();
	// const [email, setemail] = useState();
	const nameInput = useRef(null);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const history = useHistory();
	// const dispatch = useDispatch();

	const createUserHandler = async (e) => {
		e.preventDefault();
		// setusername(nameInput.current.value)
		// setemail(emailInput.current.value)
		// console.log(username)
		try {
			dispatch(
				createUser({ name: nameInput.current.value, email: emailInput.current.value, password: passwordInput.current.value })
			);
			dispatch(
				createCartFromSession()
			);
			history.push("/stores")
			// history.go(0)
		} catch (error) {
			console.log(error);
		}
		// dispatch(createStore(formData))


	};

	return (
		< React.Fragment >
			<Row>
				<Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
					<div className="card">
						<article className="card-body">
							<h4 className="card-title mb-4 mt-1">Sign Up</h4>

							<form className="">
								<Form.Group className="mb-3" controlId="formBasicName">
									<Form.Label>Username: </Form.Label>
									<Form.Control type="text" ref={nameInput} placeholder="Enter Your Name" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email: </Form.Label>
									<Form.Control type="email" ref={emailInput} placeholder="Enter Your Email" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Password: </Form.Label>
									<Form.Control type="password" ref={passwordInput} placeholder="Enter Your Password" />
								</Form.Group>
								<Button onClick={createUserHandler} >Create User</Button>

							</form>
						</article>
					</div>
				</Col>
			</Row>

		</React.Fragment >
	);
}

export default CreateUser


