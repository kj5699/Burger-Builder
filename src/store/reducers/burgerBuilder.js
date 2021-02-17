import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';
const initialState={
    ingredients:null,
    totalPrice:4,
    error: false,
    burgerBuilding:false

}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient =( state, action)=>{
    const updatedIngredient={[action.ingredientType] : state.ingredients[action.ingredientType]+1}
    const ingredients=updatedObject(state.ingredients, updatedIngredient)
    const updatedState={
            ingredients:ingredients, 
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
            burgerBuilding: true
            }
    return updatedObject(state, updatedState)
}

const removeIngredient =( state, action)=>{
    const updatedIngredient={[action.ingredientType] : state.ingredients[action.ingredientType]-1}
    const ingredients=updatedObject(state.ingredients, updatedIngredient)
    const updatedState={
            ingredients:ingredients, 
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
            burgerBuilding: true

            }
    return updatedObject(state, updatedState)
}

const setIngredient= (state, action)=>{
    return updatedObject(state, {ingredients: {
                                        salad: action.ingredients.salad,
                                        bacon: action.ingredients.bacon,
                                        cheese: action.ingredients.cheese,
                                        meat: action.ingredients.meat
                                    }, 
                                totalPrice: 4, 
                                error: false,
                                burgerBuilding: false
                            })
}
const fetchIngredientsFailed =(state,action)=>{
    return updatedObject(state, {error:true})
}


const reducer=(state = initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return  addIngredient(state, action)
            
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action)   

        case actionTypes.SET_INGREDIENT:
            return setIngredient( state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)
            
        default:
            return state;
        
    }

}
export default reducer;