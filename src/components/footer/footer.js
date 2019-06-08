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
                <Navbar className="foot"  fixed="bottom" expand="secondary"  >
                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?

                        <Nav.Item className="FootItem">
                            <a href={ROUTES.FAVORITE} className="btnStyle foot">
                                <TiStarFullOutline className="footIcon" size={25} /><br />

                            </a>
                            PREFERITI
                        </Nav.Item> : null}
                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.MYQUEUES} className="btnStyle foot">
                                <FaUsers className="footIcon" size={30} /><br />

                            </a>
                            LE TUE CODE
                        </Nav.Item> : null}

                    {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.QUEUES} className="btnStyle foot">
                                <IoMdContacts className="footIcon" size={30} /><br />

                            </a>
                               LISTA CODE
                        </Nav.Item> : null}


                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?

                        <Nav.Item className="FootItem">
                            <a href={ROUTES.PROFILE} className="btnStyle foot">
                                <FaUserCircle className="footIcon" size={25} /><br />

                            </a>
                            PROFILO
    </Nav.Item> : null}



                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.COMPANY} className="btnStyle foot">
                                <FaStoreAlt className="footIcon" size={30} /><br />

                            </a>
                            MANAGE COMPANY
    </Nav.Item> : null}


                    {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.FAQ + '/company'} className="btnStyle foot">
                                <FaQuestionCircle className="footIcon" size={30} /><br />

                            </a>
                            GUIDE COMPANY
    </Nav.Item> : null}

                    {((this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.OPERATOR} className="btnStyle foot">
                                <FaUsersCog className="footIcon" size={30} /><br />

                            </a>
                            MANAGE QUEUES
        </Nav.Item> : null}


                    {((this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN)) ?
                        <Nav.Item className="FootItem">
                            <a href={ROUTES.FAQ + '/operatro'} className="btnStyle foot">
                                <FaQuestionCircle className="footIcon"
                                 size={30} /><br />

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


