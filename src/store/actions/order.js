import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'; 

export const purchaseOrderSuccess =(id, orderData)=>{
    return{
        type:actionTypes.PURCHASE_ORDER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseOrderFailed =(error)=>{
    return{
        type:actionTypes.PURCHASE_ORDER_FAILED,
        error:error
    }
}
export const purchaseOrderStart =()=>{
    return{
        type:actionTypes.PURCHASE_ORDER_START,
    }
}

export const purchaseOrder =(orderData,token) =>{
    return dispatch=>{
        dispatch(purchaseOrderStart())
        axios.post('/orders.json/?auth='+token, orderData).then(
            response=>{ 
                console.log(response.data)
                dispatch(purchaseOrderSuccess(response.data.name, orderData)) 
        }).catch(
            err=>{dispatch(purchaseOrderSuccess(err))}
            )
    }
}

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess =(fetchedOrders)=>{
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        fetchedOrders: fetchedOrders
    }

}

export const fetchOrderFailed =(error)=>{
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error:error
    }

}
export const fetchOrderStart =()=>{
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}


export const fetchOrders =(token,userId)=>{
    return dispatch =>{
        dispatch(fetchOrderStart)
        const queryParams= '?auth=' +token + '&orderBy="userId"&equalTo="' +userId + '"'
        axios.get('/orders.json/'+ queryParams).then(
            res=> {
                const fetchedOrders=[]
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })}
                dispatch(fetchOrderSuccess(fetchedOrders))
            }
        ).catch(
            err=> dispatch(fetchOrderFailed(err))
            )

    }
}

