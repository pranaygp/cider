import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { connect } from 'react-redux' 


const Navigation = (props) => {
  
  function handleSelect(selectedKey) {
    props.changePage(selectedKey)
    // push('/about')
    // console.log(props.location)
  }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a onClick={handleSelect.bind({}, '/')}>Cider</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav activeKey={props.path} onSelect={handleSelect}>
        <NavItem eventKey="/" title="Item">Home</NavItem>
        <NavItem eventKey="/about" title="Item">About</NavItem>
      </Nav>
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  path: state.router.location.pathname
})

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(push(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);