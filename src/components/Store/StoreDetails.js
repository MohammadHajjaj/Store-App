import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles.css';

import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStoreProducts } from '../../store/actions/store-actions';
import Cookies from 'js-cookie';
import AddIcon from "@material-ui/icons/Add";
import Fab from '@material-ui/core/fab'
import { addToCart } from '../../store/actions/cart-actions';

const StoreDetails = () => {
	const [Loading, setLoading] = useState(true)

	const stores = useSelector((state) => state.store.stores);
	const storeProducts = useSelector((state) => state.store.storeProducts);
	console.log(storeProducts)
	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchStoreProducts(params.storeId));
		setLoading(false);
	}, []);

	const userStores = stores.filter((store) => {
		return store.owner === Cookies.get('userId')
	})
	let link;
	let link2;

	userStores.map((store) => {
		if (params.storeId === store._id)
			link = <Row className="justify-content-md-center mt-5">
				<Link to={`/Stores/${params.storeId}/createproduct`}>
					<Fab color="primary" aria-label="add">
						<AddIcon />
					</Fab>
				</Link>
			</Row>


	})

	userStores.map((store) => {
		if (params.storeId === store._id)
			link2 = <Button className="ml-2" variant="primary" >
				Edit
			</Button>
	})

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


	return (
		!Loading &&
		< React.Fragment >

			<Container className="p-3">
				<Row className="justify-content-md-center" xs={1} md={3}>

					{storeProducts.map((product, i) => (
						<Fragment key={i}>
							<Col
								xs={12}
								sm={6}
								xl={3}
								lg={4}
								className="mb-3"
								style={{ display: 'block' }}
							>

								<Card className="product-card">
									<Link style={{ textDecoration: 'none', color: 'black' }} to={`/products/${product._id}/`}>
										<Card.Img

											className="product-img"
											variant="top"

											src={product.image}

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
									</Link>

								</Card>

							</Col>
						</Fragment>

					))}
				</Row>

				{storeProducts.length === 0 && <Row className="justify-content-center">
					<h4>This store does not have any products at this moment.</h4>
				</Row>

				}
				<Row className="justify-content-md-center mt-5" xs={1} md={3}>
					{link}
				</Row>

			</Container>

		</React.Fragment >
	);
}

export default StoreDetails

