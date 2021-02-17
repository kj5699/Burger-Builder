import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';


const toolbar = props => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggler clicked={props.toggleSideDrawer}></DrawerToggler>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated = {props.isAuth}/>
            </nav>
        </header>
    )
}

export default toolbar;