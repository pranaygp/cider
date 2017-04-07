import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

class Login extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={12}>
              <Form horizontal>
                <FormGroup controlId="email">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="password">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Sign in
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

export default Login;
