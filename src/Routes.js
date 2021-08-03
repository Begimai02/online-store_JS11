import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Add from './components/Admin/Add';
import Edit from './components/Admin/Edit';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import ProductContextProvider from './contexts/ProductsContext';

const Routes = () => {
    return (
        <ProductContextProvider>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/add" component={Add} />
                    <Route exact path="/edit/:id" component={Edit} />
                </Switch>
            </BrowserRouter>
        </ProductContextProvider>
    );
};

export default Routes;