import { Grid } from '@material-ui/core';
import React from 'react';
import Content from './Content';

const Home = () => {
    return (
        <div style={{padding: '20px'}}>
            <Grid container spacing-md={3} spacing-sm={3}>
                <Content/>
            </Grid>
        </div>
    );
};

export default Home;