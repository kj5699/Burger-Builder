import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authFailed=(error)=>{
    return{
        type: actionTypes.AUTH_FAILED,
        error:error,
    }
}

export const authSuccess=(token, userId)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        
    }
}
export const logout=()=>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout =expirationTime=>{
    return dispatch =>{
        setTimeout(() => { dispatch(logout()) }
            ,expirationTime*1000)
    }
}

 
export const auth =(email,password, isSignUp)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true

        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7PJWjwZXrywf7WruT19ZlKtl8eiZtSMk'
        if (!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7PJWjwZXrywf7WruT19ZlKtl8eiZtSMk'
        }


        axios.post(url, authData ).then(
            response=>{
                console.log(response.data)
                const expirationTime =new Date(new Date().getTime() + (response.data.expiresIn*1000))
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationTime', expirationTime)
                localStorage.setItem('userId',response.data.localId)
                dispatch(authSuccess(response.data.idToken ,response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
                
            }
        ).catch(
            err=>{
                console.log(err)
                dispatch(authFailed(err.response.data.error))
            }
        )    
    }
}

export const setAuthRedirectPath =(path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthStatus =()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        const expirationTime=new Date(localStorage.getItem('expirationTime'))
        const userId=localStorage.getItem('userId')

        if (!token){
            dispatch(logout())
        }else{
            if (expirationTime<= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000))
            }
            
        }
    }
}

