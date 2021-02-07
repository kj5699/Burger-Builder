import React from 'react';
import classes from './Order.module.css';


const Order = props => {
    const ingredients= [];
    for (let ingName in props.ingredients){

        ingredients.push({
            name:ingName,
            amount: props.ingredients[ingName]
        })
    }
    const ingredientsOutput = ingredients.map(ig=>{
        return <span>{ig.name} {ig.amount}</span>
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>
            <p>Amount : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;