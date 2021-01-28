import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = props => {
    return(
        <Aux>
        <Backdrop show={props.show} clicked= {props.clicked} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-1000vh1)',
                opacity: props.show ? '1' : '0',
                'z-index' : props.show ? '500': '-100' }}>

            
            { props.children }
        </div>
        </Aux>
    )
}

export default modal;