import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import {  FaUserCircle } from 'react-icons/fa';
import { IoMdContacts } from "react-icons/io";

import * as ROUTES from '../../constants/routes';


import '../style.css';


class Footer extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar fixed="bottom" bg="secondary"  expand="secondary"  >
                        <Nav.Item>
                            <Button href= {ROUTES.MYQUEUE} variant="secondary">
                                <FaUserCircle/>
                                <p className="footerText" >Le mie Code</p>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button  href= {ROUTES.QUEUES} variant="secondary">
                                <IoMdContacts/>
                                <p className="footerText" style={{fontWeight:'bold'}}>Lista Code</p>
                            </Button>
                        </Nav.Item>                     
                     
                    </Navbar>
                    :
                    <></>}
            </div>
        );

    }
}

export default Footer;


