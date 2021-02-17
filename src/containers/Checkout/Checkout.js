
import React,{ Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactForm from './ContactForm/ContactForm';
import classes from './Checkout.module.css'

class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     totalPrice:null
    // }

    // UNSAFE_componentWillMount(){
    //     console.log(this.props)
    //     const query=new URLSearchParams(this.props.location.search)
    //     const ingredients={};
    //     for (let param of query.entries()){
    //         if (param[0] ==='price'){

    //             this.setState({totalPrice:+param[1]})

    //         }else{
    //             ingredients[param[0]]=+param[1]
    //         }

            
    //     }
    //     this.setState({ingredients :ingredients})
    //  }
    purchaseCancelledHandler=()=>{
        this.props.history.goBack()
    }

    purchaseContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-form')
    }
    render(){
        let summary= <Redirect to='/'></Redirect>
        if (this.props.ings){
            const purchasedRedirect= this.props.purchased ? <Redirect to='/' /> : null;
            summary=(
            <div className={classes.Checkout}>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    purchaseCancelled={this.purchaseCancelledHandler}
                    purchaseContinued={this.purchaseContinuedHandler}
                    />
                <Route path={this.props.match.path + '/contact-form' } component={ContactForm}></Route>
            </div>
            )  
        }
        return summary
    }
    

}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);

