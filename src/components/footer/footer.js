import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import {  FaUserCircle } from 'react-icons/fa';
import qIcon from '../media/queue1.png';

import * as ROUTES from '../../constants/routes';

//eslint-disable-next-line
import Style from '../style.css';


class Footer extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar fixed="bottom" bg="warning" variant="warning" expand="warning" className="navbar">

                        <Nav.Item>
                            <Button className="footerButton" href= {ROUTES.MYQUEUE} variant="warning">
                                <FaUserCircle className="footericon" />
                                <p className="footerText" style={{fontWeight:'bold'}}>Le mie Code</p>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button style={{marginRight:30}} className="footerButton" href= {ROUTES.QUEUES} variant="warning">
                                <img style={{width:25, height:25}} src={qIcon} alt="a" />
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


