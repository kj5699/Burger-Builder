import React, { Component } from "react";
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummmary';
import axios  from '../../axios-orders';
import Spinner from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";


class BurgerBuilder extends Component{
    state= {
        purchasing: false,
    }

    updatePurchasable= (ingredients)=>{
        const sum = Object.keys(ingredients).map(
            (igkey)=> (ingredients[igkey]))
            .reduce((sum,el)=>(sum+el),0) 
        return sum > 0

    }


    componentDidMount(){
        this.props.onInitIngredient()
    }

    // addIngredientHandler =(type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     let ingredients= {...this.state.ingredients}
    //     ingredients[type]=oldCount+1
    //     let updatedPrice = this.state.totalPrice+ INGREDIENT_PRICES[type]
    //     this.setState({ingredients:ingredients, totalPrice:updatedPrice})
    //     this.updatePurchasable(ingredients)
    // }

    // removeIngredientHandler =(type) =>{
    //     const oldCount = this.props.ingredients[type];
    //     let ingredients= {...this.state.ingredients}
    //     ingredients[type]=Math.max(oldCount-1,0)
    //     let updatedPrice = this.state.totalPrice- INGREDIENT_PRICES[type]
    //     this.setState({ingredients:ingredients, totalPrice: updatedPrice});
    //     this.updatePurchasable(ingredients)
    // }

    purchaseHandler= ()=>{
        if (this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    };

    cancelPurchaseHandler= ()=>{
        this.setState({purchasing:false})
    };
    


    continuePurchaseHandler =() =>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }
    
    
    render(){
        const disabledInfo={
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        let burger =this.props.error ? <p> Something went wrong</p> :<Spinner /> 
        let orderSummary=null;
        if (this.props.ings){
            burger= <Aux> 
                    <Burger ingredients={this.props.ings}/>
                        
                    <BuildControls 
                        removed={this.props.onIngredientRemoved} 
                        added ={this.props.onIngredientAdded}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        purchasing={this.purchaseHandler} 
                        isAuth= {this.props.isAuthenticated}/>
                </Aux> 
            orderSummary=<OrderSummary ingredients={this.props.ings} 
                        price={this.props.totalPrice}
                        purchaseCancelled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler} />
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

const mapStateToProps = state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null,
        burgerBuilding: state.burgerBuilder.burgerBuilding
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingType) => dispatch(actions.addIngredient(ingType) ),
        onIngredientRemoved: (ingType) => dispatch(actions.removeIngredient(ingType)),
        onInitIngredient: ()=> dispatch(actions.initIngredients()),
        onInitPurchase: ()=> dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));