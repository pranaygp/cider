import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap'
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
          <a id="logo" onClick={handleSelect.bind({}, '/')}><Glyphicon glyph="apple" /> Cider</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav activeKey={props.path} onSelect={handleSelect}>
        {
            props.loggedIn ? null : <NavItem eventKey="/" ><Glyphicon glyph="home" /> Home</NavItem>
        }
        { 
          props.loggedIn ? <NavItem eventKey="/profile" ><Glyphicon glyph="user" /> Profile</NavItem> : null
        }
        <NavItem eventKey="/browse" active={_.startsWith(props.path, '/browse')} ><Glyphicon glyph="search" /> Browse</NavItem>
      </Nav>
      <Nav pullRight activeKey={props.path} onSelect={handleSelect}>
        { 
          props.loggedIn ? null : <NavItem eventKey="http://localhost:8080/auth/facebook"><Glyphicon glyph="off" /> Login</NavItem>
        }
        {
          props.loggedIn ? null : <NavItem eventKey="http://localhost:8080/auth/facebook"><Glyphicon glyph="edit" /> Sign Up</NavItem>
        }
        {
          props.loggedIn ? <NavItem onClick={props.logout} eventKey="/"><Glyphicon glyph="off" /> Logout</NavItem> : null // make logout
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