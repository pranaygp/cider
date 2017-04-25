import React from 'react';
import { connect } from 'react-redux'
import { get } from '../redux/Actions'
import { Grid, Col, Thumbnail, PageHeader } from 'react-bootstrap'
import _ from 'lodash'

const BrowseClass = ({ match: { params: { classID }}, api, classes, me, dispatch}) => {
  const classData = _.find(classes, c => c._id === classID) || api['courses/' + classID]

  if(classData === undefined){
    dispatch(get('courses/' + classID))
      return (
        <Grid>
          <PageHeader>Loading</PageHeader>
        </Grid>
      )
  }

  const people = api['enrollment/' + classID]
  if(people === undefined){
    dispatch(get('enrollment/' + classID))

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
        _.filter(people, d => d._id !== me._id).map(p => (
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
    classes: state.api.courses || [],
    api: state.api
  })
)(BrowseClass);