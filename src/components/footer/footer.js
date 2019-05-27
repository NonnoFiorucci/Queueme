import React, { Component } from 'react';
import { Navbar,  Nav } from 'react-bootstrap';
import {  FaUsers } from 'react-icons/fa';
import { IoMdContacts } from "react-icons/io";

import {FaHeart} from 'react-icons/fa';

import bgimage from '../media/foot3.jpg';

import * as ROUTES from '../../constants/routes';
import '../../styles/style.css';
import '../../styles/btnStyle.css';


class Footer extends Component {
  
    render() {
       
        
        return (
            <div>
                {this.props.authenticated
                    ?
                    <Navbar className="foot" style={{ 
                    backgroundImage: "url(" +  bgimage  + ")" , 
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'100%',
                    backgroundPosition:'center',
                    height:'60px'
                    
                    }} fixed="bottom" expand="secondary"  >
                        <Nav.Item style={{marginLeft:'8%' ,marginTop:'-70px' ,marginBottom:'30px', fontSize:'13px', fontWeight: 'bold', color:'#c3c3c3'}}>                     
                        <a  href={ROUTES.FAVORITE} className="btnStyle foot">
                            <FaHeart style={{marginBottom:'-50px'}} size={25}/><br/>
                            
                        </a>
                        PREFERITI
                        </Nav.Item>
                        
                        <Nav.Item style={{marginTop:'-70px' ,marginBottom:'30px', fontSize:'13px', fontWeight: 'bold', color:'#c3c3c3', textAlign:'center' }}>                     
                          <a href={ROUTES.MYQUEUES} className="btnStyle foot">
                            <FaUsers style={{marginBottom:'-50px'}} size={30}/><br/>
                            
                            </a>
                            LE TUE CODE
                        </Nav.Item>  


                        <Nav.Item style={{marginTop:'-70px', marginRight:'8%'  ,marginBottom:'30px', fontSize:'13px', fontWeight: 'bold', color:'#c3c3c3', textAlign:'center' }}>                     
                          <a href={ROUTES.QUEUES} className="btnStyle foot">
                            <IoMdContacts style={{marginBottom:'-50px'}} size={30}/><br/>
                            
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


