import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={12}>
              <PageHeader>MAIN PAGE, YAY!</PageHeader>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
