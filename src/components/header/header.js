import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes';
import logo from '../media/LogoQME.png';



class Header extends Component {

    render() {
        return (
            <div>
                <Navbar fixed="top" bg="warning" variant="warning" expand="warning">
                    <Navbar.Brand style={{ color: 'black', fontWeight: 'bold' }} href={ROUTES.LANDING}><img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle style={{ backgroundColor: 'black' }} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link style={{ color: 'black', fontWeight: 'bold' }} href={ROUTES.PROFILE}>Profilo</Nav.Link>
                            <Nav.Link style={{ color: 'black', fontWeight: 'bold' }} href={ROUTES.FAQ}>FAQ</Nav.Link>
                            <Nav.Link style={{ color: 'black', fontWeight: 'bold' }} href={ROUTES.INFO}>Info</Nav.Link>
                            <Nav.Link style={{ color: 'black', fontWeight: 'bold' }} href={ROUTES.LOGOUT}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );

    }

}

export default Header;

