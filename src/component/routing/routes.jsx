import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages components
import LoginPage from '../../pages/login-page/login-page';
import HomePage from '../../pages/home-page/home-page';
import EditPage from '../../pages/edit-page/edit-page';

const Routes = () => {
    return (
        <Switch>

            <Route exact path='/' component={LoginPage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/edit' component={EditPage} />

        </Switch>
    );
};

export default Routes;
