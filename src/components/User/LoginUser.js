import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { messageActions } from '../../store/slices/message-slice';
import { useDispatch } from 'react-redux';
import { Form, Row, Button, Col } from 'react-bootstrap';
import axios from 'axios';

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
			const response = await axios.post(
				"http://localhost:8000/login",
				{ email: emailLoginInput.current.value, password: passwordLoginInput.current.value }, { withCredentials: true }
			);
			history.push("/stores")
			history.go(0)
			dispatch(
				messageActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Logged in Sucessfully!',
				})
			);
			console.log(response);
		} catch (error) {
			dispatch(
				messageActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: error.message,
				})
			);

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
						</article>
					</div>
				</Col>
			</Row>
		</React.Fragment >
	);
}

export default LoginUser


