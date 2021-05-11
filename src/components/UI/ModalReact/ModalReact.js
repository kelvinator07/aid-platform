import React, { Component } from 'react';

import './ModalReact.css';

class ModalReact extends Component {

    render () {
        return (
            <>
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