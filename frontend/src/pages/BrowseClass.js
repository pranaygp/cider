import React from 'react';
import { connect } from 'react-redux'
import { get } from '../redux/Actions'
import { Grid, Col, Thumbnail, PageHeader, Button } from 'react-bootstrap'
import _ from 'lodash'

const BrowseClass = ({ match: { params: { classID }}, api, classes, me, dispatch}) => {
  let classData = undefined, people = undefined

  if(classID === "all"){
    classData = { name: "My Classes" }

    const peopleToFetch = 
      me.classes
        .filter(classID => api['enrollment/' + classID] === undefined)

    if(peopleToFetch.length > 0){
      peopleToFetch
        .forEach(classID => dispatch(get('enrollment/' + classID)))
      return (
          <Grid>
            <PageHeader>{classData.name}</PageHeader>
            Loading Profiles...
          </Grid>
        )
    } else {
      people = 
        _(me.classes)
          .map(classID => api['enrollment/' + classID])
          .map(peopleObj => _.map(peopleObj, _.identity))
          .flatten()
          .uniqBy('_id')
          .value()
    }

  } else {
    classData = _.find(classes, c => c._id === classID) || api['courses/' + classID]

    if(classData === undefined){
      dispatch(get('courses/' + classID))
        return (
          <Grid>
            <PageHeader>Loading</PageHeader>
          </Grid>
        )
    }

    people = api['enrollment/' + classID]
    if(people === undefined){
      dispatch(get('enrollment/' + classID))

        return (
          <Grid>
            <PageHeader>{classData.name}</PageHeader>
            Loading Profiles...
          </Grid>
        )
    }
  }

  people = _(people)
            .map(p => ({...p, friend: me.friends.map(f => f.id).indexOf(p.facebookId) > -1}))
            .value()

  return (
    <Grid>
      <PageHeader>{classData.name}</PageHeader>
      {
        _.filter(people, d => d._id !== me._id).map(p => (
          <Col key={p._id} xs={6} md={4}>
            <Thumbnail src={p.pictureURL} alt="profilePic">
              <h3>{p.name}</h3>
              { p.friend ? <p style={{color: "green"}}>Friend!</p> : null }
              <p>{p.about}</p>
              <a href={`https://www.facebook.com/messages/t/${p.facebookId}`}>
                { !p.friend ? <Button bsStyle="primary"
              >Connect</Button> : null }
              </a>
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