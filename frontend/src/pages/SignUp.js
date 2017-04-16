import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

class SignUp extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }

  state = {
    invalid: false
  }

  getValidationState() {
    return this.state.invalid ? "error" : null
  }

  handleChangePassword(){
    if(this.state.invalid){
      this.setState({
        invalid: false
      })
    } 
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    if(e.target.password.value !== e.target.confirmPassword.value){
      this.setState({
        invalid: true
      })
    } else {
      // valid submission
      console.log(data)
    }
    
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={12}>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="email">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="password" validationState={this.getValidationState()}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChangePassword} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="confirmPassword" validationState={this.getValidationState()} >
                  <Col componentClass={ControlLabel} sm={2}>
                    Confirm Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChangePassword} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Sign up
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SignUp;
