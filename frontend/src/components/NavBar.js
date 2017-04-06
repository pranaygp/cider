import React from 'react';
import { Nav, NavItem } from 'react-bootstrap'

const NavBar = () => {
  function handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  }

  return (
    <Nav bsStyle="tabs" justified activeKey={1} onSelect={handleSelect}>
      <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
      <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
      <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
    </Nav>
  );
};

export default NavBar;