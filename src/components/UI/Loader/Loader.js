import React from 'react';

import './Loader.css';

const loader = (props) => (
    props.show ? <div className="Loader" ></div> : null
);

export default loader;