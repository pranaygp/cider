import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { connect } from 'react-redux' 
import { logout } from '../redux/Actions'
import _ from 'lodash'


const Navigation = (props) => {
  
  function handleSelect(selectedKey) {
    if(_.startsWith(selectedKey, "http"))
      document.location.href = selectedKey
    else
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
        {
            props.loggedIn ? null : <NavItem eventKey="/" >Home</NavItem>
        }
        { 
          props.loggedIn ? <NavItem eventKey="/profile" >Profile</NavItem> : null
        }
      </Nav>
      <Nav pullRight activeKey={props.path} onSelect={handleSelect}>
        { 
          props.loggedIn ? null : <NavItem eventKey="http://localhost:8080/auth/facebook">Login</NavItem>
        }
        {
          props.loggedIn ? null : <NavItem eventKey="http://localhost:8080/auth/facebook">Sign Up</NavItem>
        }
        {
          props.loggedIn ? <NavItem onClick={props.logout} eventKey="/">Logout</NavItem> : null // make logout
        }
      </Nav>
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  path: state.router.location.pathname,
  loggedIn: state.profile.loggedIn
})

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(push(page)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);