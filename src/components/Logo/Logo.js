import React from 'react';
import logoImg from '../../assets/Images/27.1 burger-logo.png.png';
import classes from './Logo.module.css';
const logo = props => {
    return(
        <div className={classes.Logo}>
            <img src={logoImg} alt="My Burger"></img>
        </div>
    )
}

export default logo;