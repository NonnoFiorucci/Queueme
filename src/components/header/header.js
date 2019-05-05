import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes';
import logo from '../media/LogoQME.png';

import { TiThMenu } from "react-icons/ti";


class Header extends Component {

    render() {
        return (
            <div>
                <Navbar fixed="top" bg="secondary" variant="secondary" expand="secondary">
                    <Navbar.Brand  href={ROUTES.LANDING}>
                    <img src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle >
                        <TiThMenu/>
                    </Navbar.Toggle>
                    <Navbar.Collapse  >
                        <Nav className="headNavBar">
                            <Nav.Link style={{ color: 'white', fontWeight: 'bold' }} href={ROUTES.PROFILE}>Profilo</Nav.Link>
                            <Nav.Link style={{ color: 'white', fontWeight: 'bold' }} href={ROUTES.FAQ}>FAQ</Nav.Link>
                            <Nav.Link style={{ color: 'white', fontWeight: 'bold' }} href={ROUTES.INFO}>Info</Nav.Link>
                            <Nav.Link style={{ color: 'white', fontWeight: 'bold' }} href={ROUTES.LOGOUT}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );

    }

}

export default Header;

