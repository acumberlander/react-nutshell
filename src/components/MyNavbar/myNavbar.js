import React from 'react';
import './myNavbar.scss';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    // same as const isAuthed = this.props.isAuthed
    // same as const newThing = this.props.isAuthed
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/friends"><i class="fas fa-2x fa-user-friends"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/weather"><i class="fas fa-2x fa-sun"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/events"><i class="fas fa-2x fa-calendar-week"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/messages"><i class="fas fa-2x fa-comments"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/articles"><i class="fas fa-2x fa-newspaper"></i></NavLink>
            </NavItem>
            <NavItem className="logoutLink">
              <NavLink onClick={logoutClickEvent}>logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">React-Nutshell</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
