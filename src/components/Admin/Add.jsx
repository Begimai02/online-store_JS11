import { IconButton, Paper, makeStyles, TextField, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { productContext } from '../../contexts/ProductsContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '40px auto',
        maxWidth: 1000,
        height: 'auto'
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '40ch',
        }}
}))

const Add = () => {
    const classes = useStyles()
    let history = useHistory()
    const [values, setValues] = useState({
        title: '',
        image: '',
        price: '',
        type: '',
        description: ''
    })

    const { addProduct } = useContext(productContext)

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name] : e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        if(!values.image) values.image = "https://content.onliner.by/news/1100x5616/472baa6904f365c4bae96d6b77c13010.jpeg"
        addProduct(values)
        history.push('/')
    }
    return (
        <Paper elevation={3} className={classes.paper}>
            <h1 style={{textAlign: 'center'}}>Add product</h1>
                <div style={{display: 'flex', justifyContent: 'space-around', color: 'black'}}>
                    <div>
                        <img style={{width: '400px'}} src={values.image ? values.image : "https://content.onliner.by/news/1100x5616/472baa6904f365c4bae96d6b77c13010.jpeg"} alt="smartphone image"/>
                    </div>

                    <div 
                        style={{ 
                            width: '450px',
                            display: 'flex', 
                            alignItems: 'center', 
                            flexDirection: 'column', 
                            justifyContent: 'center'
                        }}>
                        <form className={classes.root} noValidate autoComplete='off'>
                            <TextField name='title' onChange={handleInp} value={values.title} variant='outlined' label='Title' />
                            <TextField name='image' onChange={handleInp} value={values.image} variant='outlined' label='Image' />
                            <TextField name='type' onChange={handleInp} value={values.type} variant='outlined' label='Type' />
                            <TextField name='price' onChange={handleInp} value={values.price} variant='outlined' label='Price' />
                            <TextField name='description' onChange={handleInp} value={values.description} variant='outlined' label='Description' />
                        </form>
                        <IconButton aria-label="share" onClick={handleSave}>
                            <Button variant="contained" color="secondary">Add</Button>
                        </IconButton>
                    </div>
                </div>
        </Paper>
    );
};

export default Add;