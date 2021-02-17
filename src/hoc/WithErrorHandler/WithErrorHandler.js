import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state={
            error: null
        }
        confirmedErrorHandler=()=>{
            this.setState({error:null})
        }
        UNSAFE_componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(request=>{
                this.setState({error:null})
                return request
            })
            this.resInterceptor=axios.interceptors.response.use(res=>res , 
                error=>{this.setState({error:error
                })
            }) 
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} clicked={this.confirmedErrorHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default WithErrorHandler;