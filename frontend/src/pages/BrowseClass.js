import React from 'react';
import { connect } from 'react-redux'
import { addClass } from '../redux/Actions'
import { Grid, PageHeader } from 'react-bootstrap'

const BrowseClass = ({ match: { params: { classID }}, classes, dispatch}) => {
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

  return (
    <Grid>
      <PageHeader>{classData.name}</PageHeader>
    </Grid>
  );
};


export default connect(
  state => ({
    classes: state.classes
  })
)(BrowseClass);