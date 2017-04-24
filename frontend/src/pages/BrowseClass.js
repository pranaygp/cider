import React from 'react';
import { connect } from 'react-redux'
import { addClass } from '../redux/Actions'
import { Grid, Col, Thumbnail, PageHeader } from 'react-bootstrap'
import _ from 'lodash'

const BrowseClass = ({ match: { params: { classID }}, classes, me, dispatch}) => {
  const classData = classes[classID];
  if(classData === undefined){
    fetch('http://localhost:8080/api/courses/' + classID)
      .then(r => r.json())
      .then(addClass)
      .then(dispatch)
      .catch(console.error)

      return (
        <Grid>
          <PageHeader>Loading</PageHeader>
        </Grid>
      )
  }

  if(classData.people === undefined){
    fetch('http://localhost:8080/api/enrollment/' + classID)
      .then(r => r.json())
      .then(people => ({_id: classID, people}))
      .then(addClass)
      .then(dispatch)

      return (
        <Grid>
          <PageHeader>{classData.name}</PageHeader>
          Loading Profiles...
        </Grid>
      )
  }

  return (
    <Grid>
      <PageHeader>{classData.name}</PageHeader>
      {
        _.filter(classData.people, d => d._id !== me._id).map(p => (
          <Col xs={6} md={4}>
            <Thumbnail src={p.pictureURL} alt="profilePic">
              <h3>{p.name}</h3>
              <p>{p.about}</p>
            </Thumbnail>
          </Col>
        ))
      }
    </Grid>
  );
};


export default connect(
  state => ({
    me: state.profile,
    classes: state.classes
  })
)(BrowseClass);