import React from 'react';
import './spinner.css';




class Spinner extends React.Component {


  
    render() {
        return this.props.isLoading? <div className="spinner"><div className="loader"/></div> :null;
    }
}

export default Spinner;
