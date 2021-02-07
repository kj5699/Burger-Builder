import React,{ Component } from "react";
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import classes from './ContactForm.module.css'
import Input from '../../components/UI/Input/Input';


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
                    required:true

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
                    required:true

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
                value: '',
                validations:{},
                valid:true
            },


        },
        loading:true,
        formIsValid:false
    }



    orderComfirmedHandler=(event)=>{
        event.preventDefault();

        console.log(this.props.ingredients)
        this.setState({loading : true})
        let orderdata={}
        for (let InputKey in this.state.orderForm){
            orderdata[InputKey]=this.state.orderForm[InputKey].value
        }

        const order ={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderdata: orderdata

        }
        axios.post('/orders.json', order).then(
            response=>{ 
                console.log(response)
                this.setState({loading:false}) 
                this.props.history.replace('/')   
        }).catch(
            err=>{ this.setState({loading:false})
        })
    }

    checkValidity=(value,rules)=>{
        let isValid=true;
        if (rules.required){
            isValid=(value.trim()!=='' && isValid)
        }
        return isValid
    }

    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedOrderForm={...this.state.orderForm}
        const updatedFormElement={...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value=event.target.value
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validations)
        updatedFormElement.touched=true
        updatedOrderForm[inputIdentifier]=updatedFormElement

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
        return(
            <div className={classes.ContactForm}>
                <h4> Enter Your Contact Data</h4>
                <form  onSubmit={this.orderComfirmedHandler}>  
                    
                    {
                        formElements.map(element =>{
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
            </div>

        )
    }
}

export default ContactForm;