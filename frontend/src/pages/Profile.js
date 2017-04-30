import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { setLoggedInProfile, addClass, get } from '../redux/Actions'
import ClassList from '../components/ClassList'
import _ from 'lodash'

class Profile extends Component {
  constructor(props){
    super()

    if(!props.profile.loggedIn){
      const queryParams = _.fromPairs(_(props.location.search).tail().join('').split('&').map(s => s.split('=')))

      if(queryParams.token) {
        setTimeout(() => {
          fetch("http://localhost:8080/api/profiles/" + queryParams.token)
            .then(r => r.json())
            .then(props.setLoggedInProfile)
            .catch(console.error)
        }, 1000);
      } else {
        // props.goHome()
        this.state = {
          goHome: true
        }
      }
    }

    this.getOrFetchClass = this.getOrFetchClass.bind(this)
    this.removeClassFromProfile = this.removeClassFromProfile.bind(this)
    this.addClassToProfile = this.addClassToProfile.bind(this)
  }

  state = {
    goHome: false
  }

  getOrFetchClass(classID, tempID){
    const classData= _.find(this.props.api.courses, c => c._id === classID) || this.props.api['courses/' + classID]
    
    if(classData)
      return classData

    this.props.dispatch(get('courses/' + classID))
    
    return ({
      code: 'XXX',
      name: 'Fetching Class...',
      _id: tempID
    })
  }

  addClassToProfile(classArray){
    const newClassList = _.uniq(this.props.profile.classes.concat(classArray.map(c => c._id)))

    fetch('http://localhost:8080/api/profiles/' + this.props.profile._id, {
      method: 'PUT',
      headers: new Headers({
		    'Content-Type': 'application/json'
	    }),
      body: JSON.stringify({
        classes: newClassList
      })
    })
    .then(r => r.json())
    .then(this.props.setLoggedInProfile)
    .catch(console.error)
  }

  removeClassFromProfile(classObject){
    const newClassList = _.without(this.props.profile.classes, classObject._id)

    fetch('http://localhost:8080/api/profiles/' + this.props.profile._id, {
      method: 'PUT',
      headers: new Headers({
		    'Content-Type': 'application/json'
	    }),
      body: JSON.stringify({
        classes: newClassList
      })
    })
    .then(r => r.json())
    .then(this.props.setLoggedInProfile)
    .catch(console.error)
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
            <Col xs={12} md={8}>
              <ClassList 
                classes={this.props.profile.classes.map(this.getOrFetchClass)} 
                onClassSelected={this.removeClassFromProfile} 
                addClass
                allClasses={_.map(this.props.api['courses'], _.identity)}
                onClassAdded={this.addClassToProfile}
                />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default connect(
  state => ({
    profile: state.profile,
    classHash: state.classes,
    api: state.api
  }),
  dispatch => ({
    setLoggedInProfile: profile => dispatch(setLoggedInProfile(profile)),
    addClass: classData => dispatch(addClass(classData)),
    dispatch
  })
)(Profile);
