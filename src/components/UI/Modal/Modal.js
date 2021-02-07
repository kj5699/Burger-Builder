import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component {
    shouldComponentUpdate(prevProps,prevState){
        return ( prevProps.show!== this.props.show || prevProps.children!==this.props.children)
    }
    
    render(){
    return(
        <Aux>
        <Backdrop show={this.props.show} clicked= {this.props.clicked} />
        <div className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-1000vh1)',
                opacity: this.props.show ? '1' : '0',
                'zIndex' : this.props.show ? '500': '-100' }}>

            
            { this.props.children }
        </div>
        </Aux>
    )
}
}

export default Modal;