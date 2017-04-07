import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'

class About extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={12}>
              <PageHeader>ABOUT PAGE, YAY!</PageHeader>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default About;
