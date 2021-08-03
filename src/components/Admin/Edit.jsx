import { Button, IconButton, TextField } from '@material-ui/core';
import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

const Edit = () => {
    let {id} = useParams();
    let history = useHistory();
    const classes = useStyles()
    const {edit, editProduct, saveEditProduct} = useContext(productContext)
    const [values, setValues] = useState(null)

    useEffect(() => {
        editProduct(id)
    }, [id])

    useEffect(() => {
        setValues(edit)
    }, [edit])

    const handleEditInp = (e) => {
        let obj = {
            ...values,
            [e.target.name] : e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        saveEditProduct(values)
        history.push('/')
    }
    return (
        <Paper elevation={3} className={classes.paper}>
            <h1>Update product</h1>
            {
                values ? (
                    <div style={{display: 'flex', justifyContent: 'space-between', color: 'black'}}>
                    <div>
                        <img style={{width: '500px'}} src={values.image} alt="smartphone image"/>
                    </div>

                    <div
                        style={{
                            width: '450px',  
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            flexDirection: 'column', 
                            justifyContent: 'center'
                        }}>                           
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField name="title" onChange={handleEditInp} value={values.title} variant="outlined" label="Title"/>
                            <TextField name="image" onChange={handleEditInp} value={values.image} variant="outlined" label="Image"/>
                            <TextField name="type" onChange={handleEditInp} value={values.type} variant="outlined" label="Type"/>
                            <TextField name="price" onChange={handleEditInp} value={values.price} variant="outlined" label="Price"/>
                            <TextField name="description" 
                                onChange={handleEditInp} 
                                value={values.description} 
                                variant="outlined" label="Description" 
                                gutterBottom 
                                multiline
                                rows={4}
                            />
                        </form>
                        <IconButton aria-label="share" onClick={handleSave}>
                            <Button variant="contained" color="primary">Save</Button>
                        </IconButton>
                    </div>
                </div>
                ) : (<h1>Loading...</h1> )
            }
        </Paper>
    );
};

export default Edit;