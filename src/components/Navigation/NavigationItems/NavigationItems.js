import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = props => {
    return(
        <div className= {classes.NavigationItems}> 
            <NavigationItem link= '/' active>BurgerBuilder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link='/orders' >Orders</NavigationItem> :null }
            {!props.isAuthenticated ?
            <NavigationItem link='/auth' >Authenticate</NavigationItem> : 
            <NavigationItem link='/logout'>Logout</NavigationItem>}

        </div>
    )
}

export default navigationItems;