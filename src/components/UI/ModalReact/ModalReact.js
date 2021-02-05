import React, { Component } from 'react';

import './ModalReact.css';
import Backdrop from '../Backdrop/Backdrop';


class ModalReact extends Component {

    render () {
        return (
            <>
            {/* <Backdrop show={this.props.open} clicked={this.props.closed}/> */}
            <div className={this.props.show ? 'ModalReact display-block' : 'ModalReact display-none'}>
                <section className='main'>
                {this.props.children}
                </section>
            </div>
            </>
        )
    }
}

export default ModalReact;