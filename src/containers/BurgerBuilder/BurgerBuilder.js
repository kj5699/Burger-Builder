import React, { Component } from "react";
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummmary';
import axios  from '../../axios-orders';
import Spinner from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES ={
    salad :0.5,
    cheese:0.4,
    meat :1.3,
    bacon :0.7,

}
class BurgerBuilder extends Component{
    state= {
        ingredients:null,
        purchasable:false,
        totalPrice:4,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('https://react-burger-builder-7754a-default-rtdb.firebaseio.com/ingredients.json').then(
            response=> {this.setState({ingredients : response.data})}
        ).catch(err=>{
            
            this.setState({error:true})
        })
    }
    updatePurchasable= (ingredients)=>{
        const sum = Object.keys(ingredients).map(
            (igkey)=> (ingredients[igkey]))
            .reduce((sum,el)=>(sum+el),0)
        
        
        this.setState({purchasable: sum > 0});

    }

    addIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        let ingredients= {...this.state.ingredients}
        ingredients[type]=oldCount+1
        let updatedPrice = this.state.totalPrice+ INGREDIENT_PRICES[type]
        this.setState({ingredients:ingredients, totalPrice:updatedPrice})
        this.updatePurchasable(ingredients)
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        let ingredients= {...this.state.ingredients}
        ingredients[type]=Math.max(oldCount-1,0)
        let updatedPrice = this.state.totalPrice- INGREDIENT_PRICES[type]
        this.setState({ingredients:ingredients, totalPrice: updatedPrice});
        this.updatePurchasable(ingredients)
    }
    purchaseHandler= ()=>{
        this.setState({purchasing:true})
    };

    cancelPurchaseHandler= ()=>{
        this.setState({purchasing:false})
    };
    
    continuePurchaseHandler= ()=>{

        let queryParams=[];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURI(i)+ '='+encodeURI(this.state.ingredients[i]))
        }
        queryParams.push(encodeURI('price')+ '='+encodeURI(this.state.totalPrice))

        this.props.history.push({
            pathname: '/checkout',
            'search': '?' + queryParams.join('&')
        })
}
    
    
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        let burger =this.state.error ? <p> Something went wrong</p> :<Spinner /> 
        let orderSummary=null;
        if (this.state.ingredients){
            burger= <Aux> 
                    <Burger ingredients={this.state.ingredients}/>
                        
                    <BuildControls 
                        removed={this.removeIngredientHandler} 
                        added ={this.addIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler} />
                </Aux> 
            orderSummary=<OrderSummary ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        purchaseCancelled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler} />
        }

        if (this.state.loading){
            orderSummary=<Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler} >
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder,axios);