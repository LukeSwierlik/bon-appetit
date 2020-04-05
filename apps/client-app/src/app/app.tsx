import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/home.container';
import { Layout } from './containers/layout.container';
import { LoginContainer } from './containers/login.container';
import { Register } from './containers/register.container';
import Restaurant from './containers/restaurant.container';
import { Orders } from './containers/orders.container';
import { useDispatch } from 'react-redux';
import { checkLoginAction } from './+state/auth/auth.actions';
import { UserDetails } from './containers/user-details.container';

export const App = (props) => {
    console.log('app props', props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLoginAction());
    }, []);

    return (
        <Layout>
            <Switch>
                <Route path="/" component={HomeContainer} exact/>
                <Route path="/login" component={LoginContainer} exact/>
                <Route path="/register" component={Register} exact/>
                <Route path="/restaurant/:id" component={Restaurant} exact/>
                <Route path="/orders" component={Orders} exact/>
                <Route path="/user" component={UserDetails}/>
            </Switch>
        </Layout>
    );
};

export default App;
