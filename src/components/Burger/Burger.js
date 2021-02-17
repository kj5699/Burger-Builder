import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'
const burger = props => {
    // console.log(props.ingredients)
    let transformedIngredient = Object.keys(props.ingredients).map(
        (igkey)=> [...Array(props.ingredients[igkey])].map(
            ( _ , index) => {
                return (<BurgerIngredient key={igkey+index} type={igkey} />)
            }
        )
    ).reduce((arr, el)=>{ return arr.concat(el)},[])

    if (transformedIngredient.length===0){
        transformedIngredient= <p>Please Add Some Ingredients</p>
    }

    return(<div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredient }

        <BurgerIngredient type="bread-bottom"/>

    </div>)
}

export default burger;