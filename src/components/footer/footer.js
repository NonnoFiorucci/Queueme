import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUsers, FaUserCircle, FaStoreAlt, FaQuestionCircle, FaUsersCog } from 'react-icons/fa';
import { IoMdContacts } from "react-icons/io";

import { TiStarFullOutline } from 'react-icons/ti';

import bgimage from '../media/foot3.jpg';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../../styles/style.css';
import '../../styles/btnStyle.css';


class Footer extends Component {

    render() {


        return (
            <div>
                <Navbar className="foot" style={{
                    backgroundImage: "url(" + bgimage + ")",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    height: '60px'

                }} fixed="bottom" expand="secondary"  >
                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?

                        <Nav.Item style={{ marginLeft: '8%', marginTop: '-70px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3' }}>
                            <a href={ROUTES.FAVORITE} className="btnStyle foot">
                                <TiStarFullOutline style={{ marginBottom: '-50px' }} size={25} /><br />

                            </a>
                            PREFERITI
                        </Nav.Item> : null}
                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.MYQUEUES} className="btnStyle foot">
                                <FaUsers style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            LE TUE CODE
                        </Nav.Item> : null}

                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginRight: '8%', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.QUEUES} className="btnStyle foot">
                                <IoMdContacts style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            CODE
                        </Nav.Item> : null}


                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?

                        <Nav.Item style={{ marginLeft: '8%', marginTop: '-70px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3' }}>
                            <a href={ROUTES.PROFILE} className="btnStyle foot">
                                <FaUserCircle style={{ marginBottom: '-50px' }} size={25} /><br />

                            </a>
                            PROFILO
    </Nav.Item> : null}



                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginBottom: '30px', fontSize: '10px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.COMPANY} className="btnStyle foot">
                                <FaStoreAlt style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            MANAGE COMPANY
    </Nav.Item> : null}


                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginBottom: '30px', fontSize: '10px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.FAQ + '/company'} className="btnStyle foot">
                                <FaQuestionCircle style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            GUIDE COMPANY
    </Nav.Item> : null}

                    {((this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.OPERATOR} className="btnStyle foot">
                                <FaUsersCog style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            MANAGE QUEUES
        </Nav.Item> : null}


                    {((this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item style={{ marginTop: '-70px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center' }}>
                            <a href={ROUTES.FAQ + '/operatro'} className="btnStyle foot">
                                <FaQuestionCircle style={{ marginBottom: '-50px' }} size={30} /><br />

                            </a>
                            GUIDE OPERATOR
        </Nav.Item> : null}

                </Navbar>

                <></>
            </div>
        );

    }
}



export default Footer;


