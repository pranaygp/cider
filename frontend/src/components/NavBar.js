import React from 'react';
import { Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { connect } from 'react-redux' 


const NavBar = (props) => {
  
  function handleSelect(selectedKey) {
    props.changePage(selectedKey)
    // push('/about')
  }

  return (
    <Nav bsStyle="tabs" justified activeKey={1} onSelect={handleSelect}>
      <NavItem eventKey="/" title="Item">Home</NavItem>
      <NavItem eventKey="/about" title="Item">NavItem 2 content</NavItem>
    </Nav>
  );
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(push(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);