import axios from 'axios'
import React,  { useReducer } from 'react'
import {API} from '../helpers/constants'

export const productContext = React.createContext()

const INIT_STATE = {
    products: [],
    edit: null,
    paginatedPages: 1,
    detail: {}
}

const reducer = (state = INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS": 
            return {
                ...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 6)
            };
        case "GET_EDIT_PRODUCT": 
            return {...state, edit: action.payload}
        case "GET_DETAIL_PRODUCT": 
            return {...state, detail: action.payload}
        default: return state
    }
}

const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 6)
        history.push(`${history.location.pathname}?${search.toString()}`)
        let data = await axios(`${API}/products${window.location.search}`)
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

    const getDetail = async (id) => {
        const {data} = await axios.get(`${API}/products/${id}`)
        dispatch({
            type: "GET_DETAIL_PRODUCT",
            payload: data
        })
    }


     return (
         <productContext.Provider value={{
             products: state.products,
             edit: state.edit,
             paginatedPages: state.paginatedPages,
             detail: state.detail,
             getProducts,
             addProduct,
             deleteProduct,
             editProduct,
             saveEditProduct,
             getDetail
         }}>
             {children}
         </productContext.Provider>
     )
}
export default ProductContextProvider