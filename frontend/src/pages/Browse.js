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
    this.state = {
      url: 'courses'
    }
  }

  componentWillMount(){
    this.props.dispatch(get(this.state.url))
  }


  filter(level) {
    if(level === 0)
      this.setState({ url: 'courses' })
    else
      this.setState({ url: 'courses?level=' + level })
    this.props.dispatch(get(this.state.url));
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
          classes={_.map(this.props.api[this.state.url], _.identity)}
          onClassSelected={d => this.props.history.push('/browse/' + d._id)} 
          allMyClasses={this.props.loggedIn}
          />

        </Panel>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.profile.loggedIn,
    api: state.api
  })
)(Browse);

