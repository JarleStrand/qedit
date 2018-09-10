import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap'
import './login.css'



class LoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            loginAttempt: false,
            username: "",
            password: "",
            nameError: "",
            passwordError: ""
        };

        this.validateUsername = this.validateUsername.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
    }


    validateUsername(username, onSubmit){
        if(onSubmit || username!==""){
            if(username===""){
                this.setState({ nameError: "Brukernavn kan ikke være tomt" })                
                return false
            }
            else if(! /^[a-zA-Z0-9]+$/.test(username)){
                this.setState({ nameError: "Brukernavn kan kun inneholde bokstaver og tall" })
                return false
            }
            else{
                this.setState({ nameError: "" })
                return true
            }
        }  

        return true
    }


    validatePassword(password, onSubmit){
        if(onSubmit || this.state.loginAttempt){
            if(password===""){
                this.setState({ passwordError: "Passord kan ikke være tomt" })
                return false
            }
            else{                
                this.setState({ passwordError: "" })
                return true
            }
        }

        return true
    }


    handleSubmit(evt) {
        evt.preventDefault()

        this.setState({ loginAttempt: true })
        let okName = this.validateUsername(this.state.username, true)
        let okPassword = this.validatePassword(this.state.password, true)

        if(okName && okPassword)
            this.props.doAuthentication(this.state.username, this.state.password)
    }


    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        })

        this.validateUsername(evt.target.value, false)        
    }


    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });

        this.validatePassword(evt.target.password, false)
    }


    render() {
        return (
            <div>
                <Form className="form-signin">
                    <h1>Logg på</h1>

                    <FormGroup controlId="userName">
                        <Col componentClass={ControlLabel}>
                            Brukernavn
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder="brukernavn" value={this.state.username} onChange={evt => this.updateUsername(evt)} />
                        </Col>
                        {this.state.nameError !== "" ?
                            <Col className="login-error">
                                {this.state.nameError}
                            </Col>
                        : null}
                    </FormGroup>

                    <FormGroup controlId="userPassword">
                        <Col componentClass={ControlLabel}>
                            Passord
                    </Col>
                        <Col>
                            <FormControl type="password" placeholder="passord" value={this.state.password} onChange={evt => this.updatePassword(evt)} />
                        </Col>
                        {this.state.passwordError !== "" ?
                            <Col className="login-error">
                                {this.state.passwordError}
                            </Col>
                        : null}
                    </FormGroup>

                    <Button className="btn btn-lg btn-primary btn-block" type="submit" onClick={evt => this.handleSubmit(evt)}>Logg på</Button>

                </Form>
            </div>
        );

    }
}

export default LoginForm;
