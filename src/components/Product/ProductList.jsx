import React, { useContext, useEffect } from 'react';
import {productContext} from '../../contexts/ProductsContext' 
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
import { useHistory } from 'react-router-dom';

const ProductList = () => {
    let history = useHistory()
    const {products, getProducts} = useContext(productContext);

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <Grid container spacing={3} justify="space-evenly" style={{marginTop: '0px'}}>
                {
                    products ? (
                        products.map((item, index) => (
                            <ProductCard item={item} key={index} history={history} />
                        ))
                    ) : (<h1>Loading...</h1>)
                }
            </Grid>
        </>
    );
};

export default ProductList;