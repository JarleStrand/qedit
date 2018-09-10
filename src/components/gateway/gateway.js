import React from 'react';
import LoginContainer from '../login/login.container'
import MainPageContainer from '../mainpage/mainpage.container'
import Spinner from '../spinner/spinner.container'




class Gateway extends React.Component {


  constructor(props, context) {
    super(props, context);

    props.tryLoginOnStart(); // try login from persistent storage
  }

  render() {
    return (
      <div>
        <Spinner />
        {this.props.loggedIn ? <MainPageContainer /> : <LoginContainer />}
      </div>
    );
  }
}



export default Gateway;


