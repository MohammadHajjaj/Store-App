import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../../store/actions/product-actions';
import Cookies from 'js-cookie';

import { addToCart } from '../../store/actions/cart-actions';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/fab'

import './styles.css';


const ProductDetails = () => {
	const [Qty, setQty] = useState(1);
	const productDetails = useSelector((state) => state.product.productDetails);
	const [Loading, setLoading] = useState(true)

	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProductDetails(params.productId));
		setLoading(false);

	}, [dispatch, params.productId]);




	console.log(productDetails)
	// console.log(productDetails.store)
	const addToCartHandler = async (e) => {
		e.preventDefault();
		// setStoreName(textInput.current.value)
		try {
			dispatch(addToCart(params.productId, { quantity: Qty }))

		}
		catch (e) {
			console.log(e)
		}

	};
	let stockArray = [...Array(productDetails.stock).keys()].map(i => i + 1);
	console.log(stockArray)
	let link2
	if (productDetails.length !== 0) {
		if (Cookies.get('userId') === productDetails.store.owner) {
			link2 = <Link to={`/products/${params.productId}/edit`}>
				<Fab className="ml-2" color="primary" aria-label="add">
					<EditIcon />
				</Fab>
			</Link>

		}
	}


	return (
		!Loading &&

		< React.Fragment >

			<div className="card mb-3">
				<div className="row no-gutters">
					<aside className="col-sm-5 border-right">
						<div>
							<img
								className="main-img"
								src={productDetails.image}

							/>

						</div>
					</aside>
					<aside className="col-sm-7">
						<article className="p-5">
							<h3 className="title mb-3">{productDetails.name}</h3>

							<div className="mb-3">
								<var className="price h3 text-success">
									<span className="currency">US $</span>
									<span className="num">{productDetails.price}</span>
								</var>
							</div>
							<dl>
								<dt>Description</dt>
								<dd>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, inventore odit labore blanditiis eveniet quasi aliquam assumenda impedit alias ducimus aperiam. Iure voluptate dolor placeat eos nobis tenetur blanditiis?</p>
								</dd>
							</dl>
							<hr />
							<div className="row">
								<div className="col-sm-5">
									<dl className="dlist-inline">
										<dt>Stock: </dt>
										<dd className="pl-2">
											<span className="form-check-label">{`${productDetails.stock} `}</span>
										</dd>
									</dl>
								</div>

							</div>
							<hr />
							<Form.Group controlId="formBasicSelect">
								<Form.Label><dt>Quantity: </dt></Form.Label>
								<Form.Control as="select" value={Qty}
									onChange={e => {
										setQty(e.target.value);
									}}
								>
									{
										stockArray.map(n => (<option value={n}>{n}</option>))
									}
								</Form.Control>
							</Form.Group>

							<button
								onClick={addToCartHandler}
								className={'btn  btn-outline-primary'}
							>
								<i className="fa fa-shopping-cart"></i>
								{'Add to Cart'}
							</button>
							{link2}

						</article>
					</aside>
				</div>
			</div>

		</React.Fragment >
	);
}

export default ProductDetails

