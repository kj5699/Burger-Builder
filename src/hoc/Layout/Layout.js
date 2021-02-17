import React, {Component }from 'react';
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

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
             <ToolBar toggleSideDrawer={this.toggleSideDrawerHandler} isAuth={this.props.isAuth}/>
             <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler} isAuth={this.props.isAuth}/>
             ackprop
            <main className={classes.content}>
            { this.props.children}
            </main>
        </Aux>
    
        )
    }

   
}
const mapStateToProps = state =>{
    return {
        isAuth : state.auth.token !==null,
    }
}

export default connect(mapStateToProps)(Layout);