import React from 'react';

import * as ROUTES from '../../../constants/routes';
import '../../../styles/style.css';
import '../../../styles/btnStyle.css';
import logo from '../../media/LogoQME.png';

function Landing() {
    return (
        <div>
            <div className='logo'><img src={logo}  style={{width:'40%' , height:'40%'}}></img></div> 
            <h2 className="title">Benvenuto!</h2>            
            <h4 className="text">Non sprecare il tuo tempo, la vita è troppo breve!</h4>
            <a href={ROUTES.LOGIN} className="btnStyle one">
                        Entra
            </a>
        </div>
    );
}

export default Landing;