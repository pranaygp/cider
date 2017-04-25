import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get } from '../redux/Actions'
import ClassList from '../components/ClassList'
import { Grid, PageHeader } from 'react-bootstrap'
import _ from 'lodash'

class Browse extends Component {
  componentWillMount(){
    this.props.dispatch(get('courses'))
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
    classes: state.api.courses
  })
)(Browse);

