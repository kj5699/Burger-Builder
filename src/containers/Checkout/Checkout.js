
import React,{ Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactForm from '../ContactForm/ContactForm';
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
        this.props.history.push(this.props.match.path+'/contact-form')
    }
    render(){
        return(
            <div className={classes.Checkout}>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    purchaseCancelled={this.purchaseCancelledHandler}
                    purchaseContinued={this.purchaseContinuedHandler}
                    />
                <Route path={this.props.match.path + '/contact-form' } component= {ContactForm}></Route>
            </div>
        )
    }
    

}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);

