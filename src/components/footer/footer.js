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
                    <Navbar bg="dark" fixed="bottom" expand="secondary"  >
                        <Nav.Item style={{marginTop:'-30px', fontSize:'13px', fontWeight: 'bold', color:'#c3c3c3'}}>                     
                        <a  href={ROUTES.PROFILE} className="btnStyle foot">
                            <FaUserCircle size={25}/><br/>
                            
                        </a>
                        PROFILO
                        </Nav.Item>
                        <Nav.Item style={{marginTop:'-30px' , fontSize:'13px', fontWeight: 'bold', color:'#c3c3c3', textAlign:'center' }}>                     
                          <a href={ROUTES.QUEUES} className="btnStyle foot">
                            <IoMdContacts size={25}/><br/>
                            
                            </a>
                            CODE
                        </Nav.Item>    
                                   
                     
                    </Navbar>
                    :
                    <></>}
            </div>
        );

    }
}

export default Footer;


