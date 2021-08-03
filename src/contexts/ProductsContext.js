import axios from 'axios'
import React,  { useReducer } from 'react'
import {API} from '../helpers/constants'

export const productContext = React.createContext()

const INIT_STATE = {
    products: [],
    edit: null,
}

const reducer = (state = INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS": 
            return {...state, products: action.payload};
        case "GET_EDIT_PRODUCT": 
            return {...state, edit: action.payload}
        default: return state
    }
}

const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async () => {
        let {data} = await axios(`${API}/products`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
     }

    const addProduct = async (newProduct) => {
        try{
            let res = await axios.post(`${API}/products`, newProduct)
            return res
        } catch(err){
            console.log(err)
            return err
        }
    }

    const deleteProduct = async (id, history) => {
        await axios.delete(`${API}/products/${id}`)
        getProducts(history)
    }

    const editProduct = async (id) => {
        const {data} = await axios.get(`${API}/products/${id}`)
        dispatch({
            type: "GET_EDIT_PRODUCT",
            payload: data
        })
    }


    const saveEditProduct = async (updatedProduct) => {
        try {
            let res = await axios.patch(`${API}/products/${updatedProduct.id}`, updatedProduct)
            return res 
        } catch (error) {
            console.log(error)
            return error
        }
    }


     return (
         <productContext.Provider value={{
             products: state.products,
             edit: state.edit,
             getProducts,
             addProduct,
             deleteProduct,
             editProduct,
             saveEditProduct
         }}>
             {children}
         </productContext.Provider>
     )
}
export default ProductContextProvider