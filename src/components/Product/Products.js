import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsData } from '../../store/actions/product-actions';
import { addToCart } from '../../store/actions/cart-actions';
import './styles.css';

const Products = (props) => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		dispatch(fetchProductsData());
	}, [dispatch]);

	const addToCartHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			let productId = e.target.value
			dispatch(addToCart(productId))
		}
		catch (e) {
			console.log(e)
		}

	};

	// useEffect(() => {
	// 	dispatch(addToCart());
	// }, [dispatch]);


	return (
		<Fragment>
			<Row>
				{products.map((product, i) => (
					<Fragment key={i}>
						<Col
							xs={12}
							sm={6}
							xl={3}
							lg={4}
							className="mb-3"
							style={{ display: 'block' }}
						>
							<Link style={{ textDecoration: 'none', color: 'black' }} to={`/products/${product._id}/`}>

								<Card className="product-card">
									<Card.Img
										className="product-img"
										variant="top"
										src={`http://localhost:3000/assets/images/products/image${Math.floor(Math.random() * 15) + 1}.jpg`}

									/>
									<Card.Body>
										<h4 className="card-title">{product.name}</h4>
										<h6 className="card-subtitle mb-2 text-muted">
											Stock: {product.stock}
										</h6>

										<Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Card.Text>

										<div className="buy d-flex justify-content-between align-items-center">
											<div className="price text-success">
												<h5 className="mt-4">${product.price}</h5>
											</div>
											<Button
												value={product._id} onClick={addToCartHandler}
												variant={'outline-primary'}
												// onClick={toggleAddProduct}
												className="add-to-cart mt-3"
											>
												<i className="fa fa-shopping-cart"></i>{' '}
												{'Add to Cart'}
											</Button>
										</div>
									</Card.Body>

								</Card>
							</Link>

						</Col>
					</Fragment>
				))}
			</Row>
		</Fragment>

	);
}

export default Products