import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { setLoggedInProfile } from '../redux/Actions'
import _ from 'lodash'

class Profile extends Component {
  constructor(props){
    super()

    if(!props.profile.loggedIn){
      const queryParams = _.fromPairs(_(props.location.search).tail().join('').split('&').map(s => s.split('=')))

      if(queryParams.token) {
        fetch("http://localhost:8080/api/profiles/" + queryParams.token)
          .then(r => r.json())
          .then(props.setLoggedInProfile)
          .catch(console.error)
      } else {
        // props.goHome()
        this.state = {
          goHome: true
        }
      }
    }
  }

  state = {
    goHome: false
  }

  render() {
    return this.state.goHome ? <Redirect to='/' /> : (
      <div>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={12}>
              <PageHeader>Profile Page</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Thumbnail src={this.props.profile.pictureURL} alt="profilePic">
                <h3>{this.props.profile.name}</h3>
                <p>{this.props.profile.about}</p>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default connect(
  state => ({
    profile: state.profile
  }),
  dispatch => ({
    setLoggedInProfile: profile => dispatch(setLoggedInProfile(profile))
  })
)(Profile);
