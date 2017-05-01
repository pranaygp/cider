import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get } from '../redux/Actions'
import ClassList from '../components/ClassList'
import { Grid, Panel, Button } from 'react-bootstrap'
import _ from 'lodash'

class Browse extends Component {

  constructor() {
    super();
    this.filter = this.filter.bind(this);
    this.url = 'courses';
  }

  componentWillMount(){
    this.props.dispatch(get(this.url))
  }

  filter(level) {
    this.url = (level === 0) ? 'courses' : 'courses?level=' + level;
    this.props.dispatch(get(this.url));
  }

  render() {
    return (
      <Grid>
        <Panel header="Browse Classes">

        <h4>Filters:</h4>
        <Button onClick={() => this.filter(100)} bsStyle="primary">100-level</Button>
        <Button onClick={() => this.filter(200)} bsStyle="primary">200-level</Button>
        <Button onClick={() => this.filter(300)} bsStyle="primary">300-level</Button>
        <Button onClick={() => this.filter(400)} bsStyle="primary">400-level</Button>
        <Button onClick={() => this.filter(0)} bsStyle="primary">View All</Button>

        <br /><br />

        <ClassList 
          classes={_.map(this.props.classes, _.identity)}
          onClassSelected={d => this.props.history.push('/browse/' + d._id)} 
          />

        </Panel>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    classes: state.api.courses
  })
)(Browse);

