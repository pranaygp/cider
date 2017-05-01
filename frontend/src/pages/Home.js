import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

const Home = ({ loggedIn }) => (
  loggedIn ? <Redirect to='/profile' /> :
    <div>
      <Grid>
        <Panel header="Home">
          <Row>
            <Col md={12}>
              <h2>Welcome to Cider!</h2>
              <p>Please Login/Sign Up to Continue</p>
              <p>You may browse our classes directory without logging in.</p>
            </Col>
          </Row>
        </Panel>
      </Grid>
    </div>
)

export default connect(
  state => ({
    loggedIn: state.profile.loggedIn
  })
)(Home);
