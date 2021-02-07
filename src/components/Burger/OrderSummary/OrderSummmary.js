import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientsSummary =Object.keys( props.ingredients).map(igkey => {
        return <li key={igkey}> <span>{igkey} </span>:{props.ingredients[igkey]}</li>
    })

    return(
        <Aux>
            <h3> Your Order</h3>
            <p> A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked ={props.purchaseCancelled}> CANCEL</Button>
            <Button btnType="Success" clicked ={props.purchaseContinued}> CONTINUE</Button>

        </Aux>

    )
}

export default orderSummary;