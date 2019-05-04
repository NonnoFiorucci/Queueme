import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';




class Header extends Component {

    render() {
        return (
            <div>                
                <Navbar fixed="top" bg="warning" variant="warning" expand="warning">
                    <Navbar.Brand style={{color:'black', fontWeight:'bold'}} href="/">QueueMe</Navbar.Brand>
                    <Navbar.Toggle style={{backgroundColor:'black'}} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link style={{color:'black', fontWeight:'bold'}} href="/profile">Profilo</Nav.Link>
                            <Nav.Link style={{color:'black', fontWeight:'bold'}} href="/faq">FAQ</Nav.Link>
                            <Nav.Link style={{color:'black', fontWeight:'bold'}} href="/info">Info</Nav.Link>
                            <Nav.Link style={{color:'black', fontWeight:'bold'}} href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>            
            </div>
        );

    }

}

export default Header;

