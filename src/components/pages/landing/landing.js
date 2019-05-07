import React from 'react';
import { Button } from 'react-bootstrap';

import * as ROUTES from '../../../constants/routes';


function Landing() {
    return (
        <div>
            <h3 >Benvenuto!</h3>
            
            <h2>Non sprecare il tuo tempo, la vita è troppo breve!</h2>
            
            <Button variant="secondary" type="submit" href={ROUTES.LOGIN}>
                ENTRA !
            </Button>
        </div>
    );
}

export default Landing;