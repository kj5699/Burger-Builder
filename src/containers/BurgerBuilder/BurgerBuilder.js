import React, { Component } from "react";
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummmary';

const INGREDIENT_PRICES ={
    salad :0.5,
    cheese:0.4,
    meat :1.3,
    bacon :0.7,

}
class BurgerBuilder extends Component{
    state= {
        ingredients:{
            salad:0,
            bacon :0,
            cheese:0,
            meat:0
        },
        purchasable:false,
        totalPrice:4,
        purchasing: false,
    }
    updatePurchasable= (ingredients)=>{
        const sum = Object.keys(ingredients).map(
            (igkey)=> (ingredients[igkey]))
            .reduce((sum,el)=>(sum+el),0)
        
        
        this.setState({purchasable: sum > 0});
        console.log(sum,this.state.purchasable)

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
        alert("You Continue")
 
    };
    
    
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler} >
                    <OrderSummary ingredients={this.state.ingredients} 
                                price={this.state.totalPrice}
                                purchaseCancelled={this.cancelPurchaseHandler}
                                purchaseContinued={this.continuePurchaseHandler} />
                </Modal>
                <div><Burger ingredients={this.state.ingredients}/></div>
                
                <div><BuildControls 
                removed={this.removeIngredientHandler} 
                added ={this.addIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                purchasing={this.purchaseHandler} /></div>
                
                
                
            </Aux>

        );
    }
}

export default BurgerBuilder;