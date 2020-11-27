import React, { Component } from 'react';

import './ModalReact.css';
import Backdrop from '../Backdrop/Backdrop';


class ModalReact extends Component {

    render () {
        return (
        
            <div className={this.props.show ? 'ModalReact display-block' : 'ModalReact display-none'}>
                <section className='main'>
                {this.props.children}
                    <button>
                        Close
                    </button>
                </section>
            </div>
        )
    }
}

export default ModalReact;