import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label: "Salad" , type:"salad"},
    {label: "Meat" , type:"meat"},
    {label: "Cheese" , type:"cheese"},
    {label: "Bacon" , type:"bacon"},

]

const buildControls = props => {
    return(
        <div className={classes.BuildControls}>
            <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(item => <BuildControl 
            key= {item.label} 
            label= {item.label} 
            added= {()=> props.added(item.type)} 
            removed={()=> props.removed(item.type)}
            disabled={props.disabled[item.type]}/>)}

            <button className={classes.OrderButton} disabled ={ !props.purchasable } onClick={props.purchasing}>  ORDER NOW</button>

            
        </div>
    )
}

export default buildControls