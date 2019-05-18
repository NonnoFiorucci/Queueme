import React from 'react';

import * as ROUTES from '../../../constants/routes';
import '../../../styles/style.css';
import '../../../styles/btnStyle.css';

function Landing() {
    return (
        <div>
            <h2 class="title">Benvenuto!</h2>            
            <h4 class="text">Non sprecare il tuo tempo, la vita è troppo breve!</h4>
            <a href={ROUTES.LOGIN} class="btnStyle one">
                        Entra
            </a>
        </div>
    );
}

export default Landing;