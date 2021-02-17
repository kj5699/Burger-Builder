import { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from '../../components/UI/Loader/Loader';
import { Redirect } from "react-router-dom";
import {checkValidity } from '../../shared/utility';
class Auth extends Component{
    state={
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:"Email Id"
                    },
                value: '',
                validations:{
                    required:true,
                    isEmail : true
                    },
                valid:false,
                touched:false
            
            },

               password : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:"Password"
                    },
                value: '',
                validations:{
                    required:true,
                    minLength: 6
                    },
                valid:false,
                touched:false
            
            }
        },
        isSignUp:true
    }


    componentDidMount(){
        if (!this.props.burgerBuilding && this.props.authRedirectPath !=='/'){
            console.log('setting the path to home/');
            this.props.onSetRedirectPath()
        }
    }

    inputChangedHandler=(event, controlName)=>{
        const updatedControls ={
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validations ),
                touched: true
            }
        }
        this.setState({controls: updatedControls})


    }
    
    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    switchSignModeHandler=()=>{
        this.setState((prevState)=> { return{isSignUp: !prevState.isSignUp}})
        
    }
    
    
    render(){
        const formElements=[];
        for (let key in this.state.controls){
            formElements.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        }
        let errorMessage=null;
        if (this.props.error){
            errorMessage=(
                <div>
                    {this.props.error.message}
                </div>
            )
        }
        let authenticateRedirect=null;
        if (this.props.isAuthenticated){
            authenticateRedirect=(<Redirect to={this.props.authRedirectPath} />)
        }
        let form=(
                
                <form  onSubmit={this.submitHandler}> 
                    {errorMessage}
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
                    <Button btnType="Success" >SUBMIT</Button>
                    
                </form>
                );
        if (this.props.loading){
            form=<Spinner />
        }
        


        return(
            <div className={classes.Auth}>
                
                {authenticateRedirect}
                {form}
                <Button btnType="Danger" clicked={this.switchSignModeHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' :'SIGN UP'}</Button>

            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        
        error:state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath :state.auth.authRedirectPath,
        burgerBuilding: state.burgerBuilder.burgerBuilding
    }
}
const mapDispatchToProps= dispatch =>{
    return{
        onAuth :(email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp)),
        onSetRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);