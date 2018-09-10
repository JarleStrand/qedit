import React from 'react';
import MainPageContainer from '../mainpage/mainpage.container'
import Spinner from '../spinner/spinner.container'




class Gateway extends React.Component {




  render() {
    return (
      <div>
        <Spinner />
       <MainPageContainer /> 
      </div>
    );
  }
}



export default Gateway;


