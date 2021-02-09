import * as actionTypes from '../action';
const initialState={
    ingredients:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
    }

}

const reducer=(state = initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                [action.ingredientType]:state.ingredients[action.ingredientType]+1
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                [action.ingredientType]:state.ingredients[action.ingredientType]-1
            }
        default:
            return state;
        
    }

}
export default reducer;