import { Route, Switch, Redirect } from 'react-router-dom';
import React, { Fragment } from 'react'
import { useSelector, } from 'react-redux';
import Notification from './components/UI/Notification';
import Container from 'react-bootstrap/Container';
import Layout from './components/Layout/Layout';
import GetStores from './pages/Store/GetStores'
import EditStorePage from './pages/Store/EditStorePage'
import EditProductPage from './pages/Product/EditProductPage'
import GetStoreDetails from './pages/Store/GetStoreDetails'
import GetProducts from './pages/Product/GetProducts'
import GetProductDetails from './pages/Product/GetProductDetails'
import CreateStorePage from './pages/Store/CreateStorePage'
import CreateUserPage from './pages/User/CreateUserPage'
import LoginUserPage from './pages/User/LoginUserPage'

import UserStoresPage from './pages/User/UserStoresPage'
import CreateProductPage from './pages/Product/CreateProductPage'
import CartPage from './pages/Cart/CartPage'
// import './index.css';

function App() {
  const notification = useSelector((state) => state.message.notification);

  return (
    <Fragment>
      <Layout>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}

        <div>
          <main>
            <Container className="margin-top">
              <Switch>
                <Route path='/Stores' exact>
                  <GetStores />
                </Route>
                <Route path='/Stores/create' exact>
                  <CreateStorePage />
                </Route>
                <Route path='/Stores/:storeId/createproduct' exact>
                  <CreateProductPage />
                </Route>
                <Route path='/Stores/:storeId/edit'>
                  <EditStorePage />
                </Route>

                <Route path='/Stores/:storeId'>
                  <GetStoreDetails />
                </Route>

                <Route path='/Products' exact>
                  <GetProducts />
                </Route>

                <Route path='/Products/:productId/edit'>
                  <EditProductPage />
                </Route>

                <Route path='/Products/:productId'>
                  <GetProductDetails />
                </Route>
                <Route path='/mystores'>
                  <UserStoresPage />
                </Route>
                <Route path='/cart'>
                  <CartPage />
                </Route>

                <Route path='/login'>
                  <LoginUserPage />
                </Route>
                <Route path='/CreateUser'>
                  <CreateUserPage />
                </Route>
                <Route path='*'>
                  <Redirect to='/stores' />
                </Route>

              </Switch>
            </Container>

          </main>
        </div>
      </Layout>
    </Fragment>

  );
}


export default App;

