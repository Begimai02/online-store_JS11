import { Grid } from '@material-ui/core';
import React from 'react';
import ProductList from '../Product/ProductList';

const Content = () => {
    return (
        <Grid item md={9}>
            <ProductList/>
        </Grid>
    );
};

export default Content;