import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addClass } from '../redux/Actions'
import ClassList from '../components/ClassList'
import { Grid, PageHeader } from 'react-bootstrap'
import _ from 'lodash'

class Browse extends Component {
  componentWillMount(){
    fetch('http://localhost:8080/api/courses')
      .then(r => r.json())
      .then(classes => classes.map(addClass))
      .then(actions => actions.forEach(this.props.dispatch))
  }

  render() {
    return (
      <Grid>
        <PageHeader>
          Browse Classes
        </PageHeader>
        <ClassList 
          classes={_.map(this.props.classes, _.identity)}
          onClassSelected={d => this.props.history.push('/browse/' + d._id)} 
          />
      </Grid>
    );
  }
}

export default connect(
  state => ({
    classes: state.classes
  })
)(Browse);

