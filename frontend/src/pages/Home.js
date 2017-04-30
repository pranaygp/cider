import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'

const Home = ({ loggedIn }) => (
  loggedIn ? <Redirect to='/profile' /> :
    <div>
      <Grid>
        <Row>
        </Row>
        <Row>
          <Col md={12}>
            <PageHeader>Cider</PageHeader>
            <p>Login/Sign Up to Continue</p>
          </Col>
        </Row>
      </Grid>
    </div>
)

export default connect(
  state => ({
    loggedIn: state.profile.loggedIn
  })
)(Home);
