import  React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './hoc/Layout/Layout'
import {Route} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class  App extends Component {
  
  render(){
    return (
      <div className="App">
        <Layout> 
          <Route path='/checkout' component={Checkout}></Route>
          <Route path='/orders' exact component={Orders}></Route>
          <Route path='/' exact component={BurgerBuilder}></Route>
          
        </Layout>

      </div>
        
    );
  }
}

export default App;
