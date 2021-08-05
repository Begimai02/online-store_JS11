import axios from 'axios';
import React, {useReducer} from 'react';
import { AUTH_API } from '../helpers/constants';

export const authContext = React.createContext()

const INIT_STATE = {}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        default:return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function registerUser(e, history){
        e.preventDefault();
        const newUser = {
            email: e.target[4].value,
            password: e.target[6].value
        }
        try{
            const res = await axios.post(`${AUTH_API}/registration`, newUser) 
            console.log(res)
            if(res.data && res.data.token){
                storeToken(res.data.token)
            }
            alert(res.status)
            history.push('/login')
        }catch(e){
            console.log(e.response)
            alert(e.response.statusText)
        }
    }

    async function loginUser(e, history) {
        e.preventDefault();
        const loginUser = {
            email: e.target[0].value, 
            password: e.target[2].value
        }
        try{
            const res = await axios.post(`${AUTH_API}/login`, loginUser) 
            console.log(res)
            alert(res.status)
            history.push('/')
        }catch(e){
            console.log(e.response)
            alert(e.response.data.message);
        }

    }

    const storeToken = (token) => {
        localStorage.setItem('jwt-token', token);
    }

    return (
        <authContext.Provider value={{
            registerUser,
            loginUser
        }}>
           {children} 
        </authContext.Provider>
    );
};

export default AuthContextProvider;