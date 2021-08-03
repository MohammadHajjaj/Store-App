import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData } from '../../store/actions/cart-actions';

import Cookies from 'js-cookie';
import axios from 'axios';
const styles = {
	badge: {
		borderRadius: "30px",
		backgroundColor: "#808080",
		color: "#1d1d1d",
		padding: "0.10rem 0.3rem"
	},
};
const Header = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCartData());
	}, []);

	const products = useSelector((state) => state.cart.items);
	let totalQuantity;
	if (products.length > 0) {
		totalQuantity = products.map(product => product.quantity).reduce((acc, next) => acc + next);
	}
	const [username, setusername] = useState(null)

	useEffect(() => {
		if (Cookies.get('username'))
			setusername(Cookies.get('username'))
	}, [])
	let link;
	let link2;
	const history = useHistory();

	const logoutHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8000/logout", {},
				{ withCredentials: true }
			);
			history.push("/stores")
			history.go(0)
		} catch (error) {
			console.log(error);
		}
	};

	const cartButtonHandler = async (e) => {
		e.preventDefault();
		history.push("/cart")
		history.go(0)
	};

	if (username) {
		link = <Nav>
			<Nav.Link onClick={cartButtonHandler} ><i className="fa fa-shopping-cart"></i>Cart <span style={styles.badge}>{totalQuantity || 0}</span></Nav.Link>

			<Nav>
				<NavDropdown title={username} id="collasible-nav-dropdown2">
					<NavDropdown.Item as={Link} to="/myStores">Your Stores</NavDropdown.Item>
					<NavDropdown.Item as={Link} to="/Stores/Create">Create Store</NavDropdown.Item>

					<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		</Nav>
	} else {
		link = <Nav>
			<Nav.Link as={Link} to="/login" > <i className="fas fa-sign-in-alt"></i> Login</Nav.Link>

			<Nav.Link as={Link} to="/CreateUser" > <i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
		</Nav>
	}


	return (
		<React.Fragment>

			<header>
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top"
				>
					<Navbar.Brand as={Link} to="/" >Store-App</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="m-auto">
							<Nav.Link as={Link} to="/stores" >
								<i className="fas fa-store"></i> Stores
							</Nav.Link>
							<Nav.Link as={Link} to="/products" >
								<i className="fab fa-product-hunt"></i> Products
							</Nav.Link>
						</Nav>
						{link}

					</Navbar.Collapse>
				</Navbar>
			</header >


		</React.Fragment >
	)
}
export default Header;

