import React from 'react';

import * as ROUTES from '../../../constants/routes';
import '../../../styles/style.css';
import '../../../styles/btnStyle.css';
import logo from '../../media/LogoQME.png';
import { TiTickOutline } from 'react-icons/ti'
import { Row, Col } from 'react-bootstrap';

function Landing() {
    return (
        <div>
            <div className='logo'><img src={logo} alt="Logo" width='40%' height='40%' ></img></div>
            <h2 className="title">Benvenuto!</h2>
            <h4 className="text">Non sprecare il tuo tempo, la vita è troppo breve!</h4>
            <Col xl>
                <h6 className="text">
                    Prendi parte ad una coda comodamente tramite smarthpone o computer e non preoccuparti di altro!!
                </h6>
                <Row md={{offset:50}}>
                
                    <TiTickOutline size={40} />
                
                    Ci penseremo noi a notificarti quando sta  arrivando il tuo turno! Che aspetti?!
                
                </Row>
            </Col>
            
            <a href={ROUTES.LOGIN} className="btnStyle one">
                Entra
            </a>
        </div>
    );
}

export default Landing;