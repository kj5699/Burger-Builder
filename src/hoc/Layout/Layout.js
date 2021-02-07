import React, {Component }from 'react';
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSideDrawer:false
    }

    closeSideDrawerHandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }
    toggleSideDrawerHandler =()=>{
        console.log(this.state.showSideDrawer)
        this.setState((prevState) => ({showSideDrawer : !prevState.showSideDrawer}))}
    

    render(){
        return(
            <Aux>
             <ToolBar toggleSideDrawer={this.toggleSideDrawerHandler}/>
             <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler} />
             ackprop
            <main className={classes.content}>
            { this.props.children}
            </main>
        </Aux>
    
        )
    }

   
}

export default Layout