import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { messageActions } from '../../store/slices/message-slice';
import { useDispatch } from 'react-redux';
import { Form, Row, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { loginUser } from '../../store/actions/user-actions'

import { createCartFromSession } from '../../store/actions/cart-actions'
const LoginUser = () => {
	// const [username, setusername] = useState();
	// const [email, setemail] = useState();
	const emailLoginInput = useRef(null);
	const passwordLoginInput = useRef(null);
	const history = useHistory();
	// const dispatch = useDispatch();
	const dispatch = useDispatch();

	const loginUserHandler = async (e) => {
		e.preventDefault();
		try {
			dispatch(
				loginUser({ email: emailLoginInput.current.value, password: passwordLoginInput.current.value })
			);

			dispatch(
				createCartFromSession()
			);
			history.push("/stores")
		} catch (error) {

			console.log(error.message);
		}
		// dispatch(createStore(formData))


	};

	return (
		< React.Fragment >

			<Row>
				<Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
					<div className="card">
						<article className="card-body">
							<h4 className="card-title mb-4 mt-1">Sign in</h4>
							<form className="">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email: </Form.Label>
									<Form.Control type="email" ref={emailLoginInput} placeholder="Enter Your Email" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Password: </Form.Label>
									<Form.Control type="password" ref={passwordLoginInput} placeholder="Enter Your Password" />
								</Form.Group>
								<Button onClick={loginUserHandler} >Login</Button>

							</form>
							<p>Test account : email : admin@test.com password : 123</p>
						</article>
					</div>
				</Col>
			</Row>
		</React.Fragment >
	);
}

export default LoginUser


