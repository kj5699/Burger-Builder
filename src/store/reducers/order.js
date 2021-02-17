
import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    orders:[],
    loading: false,
    purchased:false,
}

const reducer= (state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:    
            return updatedObject(state,{purchased:false}) 

        case actionTypes.PURCHASE_ORDER_START:
            return updatedObject(state,{loading:true}) 
                
        case actionTypes.PURCHASE_ORDER_SUCCESS:
            const newOrder = updatedObject(action.orderData , {id:action.orderId})    
            return updatedObject(state,{loading:false, purchased:true, orders: state.orders.concat(newOrder)}) 
        
        case actionTypes.PURCHASE_ORDER_FAILED:
            return updatedObject(state,{loading:false})

        case actionTypes.FETCH_ORDER_START:
            return updatedObject(state,{loading:true}) 
        
        case actionTypes.FETCH_ORDER_FAILED:
                return updatedObject(state,{loading:false})
        
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updatedObject(state,{loading:false ,orders:action.fetchedOrders}) 

        default:
            return state;
    }

}


export default(reducer)