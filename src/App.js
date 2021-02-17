import  React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './hoc/Layout/Layout'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout =asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

const asyncOrders =asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth =asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

class  App extends Component {

  componentDidMount(){
    this.props.onCheckAuthStatus()
  }
  
  render(){
    
    
    let routes=(
      <Switch>
        <Route path='/auth' component={asyncAuth}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to ='/' />
      </Switch>
      )
    
      if (this.props.isAuth){
      routes=(
        <Switch>
            <Route path='/checkout' component={asyncCheckout}></Route>
            <Route path='/orders'  component={asyncOrders}></Route>
            <Route path='/logout' component={Logout}></Route>
            <Route path='/auth'  component={asyncAuth}></Route>
            <Route path='/' exact component={BurgerBuilder}></Route>
            <Redirect to ='/' />
         
          </Switch>
      )
    }
    
    return (
      <div className="App">
        <Layout> 
          {routes}
          
        </Layout>

      </div>
        
    );
  }
}
const mapStateToProps = state =>{
  return {
      isAuth : state.auth.token !== null,
  }
}
const mapDispatchToProps =dispatch=>{
  return{
    onCheckAuthStatus :()=>dispatch(actions.checkAuthStatus())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(App));
