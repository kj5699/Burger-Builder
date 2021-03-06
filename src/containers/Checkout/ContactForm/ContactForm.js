import React,{ Component } from "react";
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactForm.module.css'
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from '../../../components/UI/Loader/Loader';
import {updatedObject, checkValidity} from '../../../shared/utility';



class ContactForm extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:"Your Name"
                },
                value: '',
                validations:{
                    required:true

                },
                valid:false,
                touched:false
            },
                
            street :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:"Your Street"
                },
                value: '',
                validations:{
                    required:true

                },
                valid:false,
                touched:false
            },
            zipCode : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:"Your zipCode"
                },
                value: '',
                validations:{
                    required:true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true

                },
                valid:false,
                touched:false
            },
            country : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:"Your country"
                },
                value: '',
                validations:{
                    required:true

                },
                valid:false,
                touched:false
            },
        
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:"Your EmailId"
                },
                value: '',
                validations:{
                    required:true,
                    isEmail: true

                },
                valid:false,
                touched:false
            },
            
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value :'fastest', displayValue: 'Fastest'},
                        {value :'cheapest', displayValue: 'Cheapest'}
                    ]    
                },
                value: 'fastest',
                validations:{},
                valid:true
            },


        },

        formIsValid:false
    }



    orderComfirmedHandler=(event)=>{
        event.preventDefault();
        let orderdata={}
        for (let InputKey in this.state.orderForm){
            orderdata[InputKey] = this.state.orderForm[InputKey].value
        }

        const order ={
            ingredients:this.props.ings,
            price:this.props.totalPrice,
            orderdata: orderdata,
            userId:this.props.userId
        }
        this.props.onBurgerOrdered(order, this.props.token)
        
    }



    inputChangedHandler=(event, inputIdentifier)=>{
        
        const updatedFormElement= updatedObject(this.state.orderForm[inputIdentifier],
            {
                value:event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validations),
                touched:true
            })
        const updatedOrderForm= updatedObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid=true;
        for (let InputElement in this.state.orderForm){
            formIsValid=this.state.orderForm[InputElement].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid})

    }
    
    render(){
        const formElements=[];
        for (let key in this.state.orderForm){
            formElements.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        }
        let form=(
                <form  onSubmit={this.orderComfirmedHandler}>  
                    
                    { formElements.map(element =>{
                            return <Input 
                                        key= {element.id}
                                        elementType={element.config.elementType} 
                                        elementConfig={element.config.elementConfig} 
                                        value={element.config.value}
                                        changed={(event)=>this.inputChangedHandler(event , element.id)}
                                        inValid={!element.config.valid}
                                        touched={element.config.touched}
                                        shouldValidate={element.config.validations}
                                    / >

                        })
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
        );

        if ( this.props.loading ) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactForm}>
                <h4> Enter Your Contact Data</h4>
                {form}
                
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,

        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrdered : (orderData,token) => dispatch(actions.purchaseOrder(orderData,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactForm,axios));