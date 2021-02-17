import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = ingType=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientType: ingType
    
    }
}

export const removeIngredient = ingType=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingType
    }
}

const setIngredients = (ingredients) =>{
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients

    }
}
export const fetchIngredientsFailed =()=>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients =()=>{
    return dispatch =>{
        axios.get('https://react-burger-builder-7754a-default-rtdb.firebaseio.com/ingredients.json').then(
            response=> dispatch(setIngredients(response.data))
        ).catch(err=> dispatch(fetchIngredientsFailed()))

    }
}

