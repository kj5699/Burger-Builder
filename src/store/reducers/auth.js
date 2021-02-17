import * as actionTypes from '../actions/actionTypes';

import { updatedObject } from '../../shared/utility';
const initialState={
    token: null ,
    userId:null,
    loading:false,
    error:null,
    authRedirectPath:'/',
}
const authStart= (state,action)=>{
    return updatedObject(state, {loading:true})
}

const authSuccess= (state,action)=>{
    return updatedObject(state, {loading: false,
         token:action.token, 
         userId:action.userId, 
         error:null})
}


const authFailed= (state,action)=>{
    return updatedObject(state, {loading:false, error:action.error})
}
const authLogout= (state,action)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return updatedObject(state, { token:null, userId:null})
}
const setAuthRedirectPath =(state,action) =>{
    return updatedObject(state, {authRedirectPath: action.path})
}

const reducer=(state = initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
        case actionTypes.AUTH_FAILED: return authFailed(state,action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH :return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default reducer;