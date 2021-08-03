import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch, } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row } from "react-bootstrap";
import { fetchCartData, removeFromCart, addOneQty, removeOneQty, checkoutCart } from '../../store/actions/cart-actions';

import './styles.css';


const Cart = (props) => {

	const [Loading, setLoading] = useState(true)
	const history = useHistory();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCartData());
		setLoading(false);
	}, [dispatch]);

	const products = useSelector((state) => state.cart.items);
	const cart = useSelector((state) => state.cart.cart);
	let totalQuantity;

	if (products.length > 0) {
		totalQuantity = products.map(product => product.quantity).reduce((acc, next) => acc + next);
	}

	console.log(products)



	const removeFromCartHandler = async (e) => {
		e.preventDefault();
		try {
			let productId = e.target.value
			dispatch(removeFromCart(productId))
		}
		catch (e) {
			console.log(e)
		}

	};

	const addOneQtyHandler = async (e) => {
		e.preventDefault();
		try {
			let productId2 = e.target.value
			dispatch(addOneQty(productId2))
		}
		catch (e) {
			console.log(e)
		}

	};
	const removeOneQtyHandler = async (e) => {
		e.preventDefault();
		try {
			let productId3 = e.target.value
			dispatch(removeOneQty(productId3))
		}
		catch (e) {
			console.log(e)
		}

	};

	const checkoutHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(checkoutCart())
			history.push("/cart")
			history.go(0)
		}
		catch (e) {
			console.log(e)
		}

	};
	return (
		!Loading &&
		<Fragment>
			{products.length === 0 ? (
				<Row className="justify-content-center">
					<h4>There are no products in the cart yet.</h4>
				</Row>
			) : (
				<Fragment>
					<div className="card shopping-cart">
						<div className="card-header  text-primary">
							<i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
							Cart
							<div className="clearfix"></div>
						</div>
						<div className="card-body mt-3 mb-0">
							{products.map((item, i) => (
								<Fragment key={i}>
									<div className="row">
										<div className="col-12 col-sm-12 col-md-2 text-center">
											<img
												className="img-responsive cart-img-obj-fit"
												src={`http://localhost:3000/assets/images/products/image${Math.floor(Math.random() * 15) + 1}.jpg`}

												alt="preview"
												width="150"
												height="150"
											/>
										</div>
										<div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
											<h4 className="product-name">{item.productId.name}</h4>
											<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolores quos voluptas ad maiores autem, rem obcaecati enim deserunt accusamus consectetur error vitae eligendi commodi totam possimus fuga odio earum.</p>
										</div>
										<div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
											<div
												className="col-3 col-sm-3 col-md-6 text-md-right"
												style={{ paddingTop: 5 }}
											>
												<h5>
													<strong>${item.total}</strong>
												</h5>
											</div>
											<div className="col-4 col-sm-4 col-md-4">
												<div className="quantity">

													<button
														value={item.productId._id}
														onClick={addOneQtyHandler}
														className="plus"
													>
														+
													</button>
													<span
														// contentEditable='true'
														// onInput={e => { item.quantity = e.currentTarget.textContent }}

														className="quantity-number">{item.quantity}</span>
													<button
														value={item.productId._id}
														onClick={removeOneQtyHandler}
														className="minus"
													>
														-
													</button>
												</div>
											</div>
											<div className="col-2 col-sm-2 col-md-2 text-right">
												<button
													value={item.productId._id}
													type="button"
													onClick={removeFromCartHandler}

													className="btn btn-outline-danger btn-xs"
												>
													<i className="fa fa-trash" aria-hidden="true"></i>
												</button>
											</div>
										</div>
									</div>
									<hr />
								</Fragment>
							))}
						</div>
						<div className="card-footer">
							<div className="pull-left" style={{ margin: 10 }}>
								<Link to={'/products'}>
									<button className="btn btn-outline-primary pull-right">
										Continue shopping
									</button>
								</Link>
							</div>

							<div className="pull-right" style={{ margin: 10 }}>
								<a href="" className="btn btn-primary pull-right" >
									Checkout
								</a>
								<div className="pull-right" style={{ margin: 5 }}>
									Total price:
									<b>
										$
										{cart.subTotal}
									</b>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);


}
export default Cart