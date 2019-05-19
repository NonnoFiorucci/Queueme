import React, { Component } from 'react';
import { Navbar,  Nav } from 'react-bootstrap';
import {  FaUserCircle } from 'react-icons/fa';
import { IoMdContacts } from "react-icons/io";

import * as ROUTES from '../../constants/routes';
import '../../styles/style.css';
import '../../styles/btnStyle.css';


class Footer extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar fixed="bottom" expand="secondary"  >
                        <Nav.Item>                     
                        <a href={ROUTES.PROFILE} className="btnStyle one">
                            <FaUserCircle size={30}/> 
                            Profilo
                        </a>
                        </Nav.Item>
                        <Nav.Item>
                          <a href={ROUTES.QUEUES} className="btnStyle one">
                            <IoMdContacts size={30}/>
                            Code
                            </a>
                        </Nav.Item>                     
                     
                    </Navbar>
                    :
                    <></>}
            </div>
        );

    }
}

export default Footer;


