import React from 'react';
import {  FaUsersCog } from 'react-icons/fa';
import '../../../styles/style.css'





function Operator() {
    return (
      <div>
          <h3>Qual'è il compito dell'operatore?</h3>
          <p className='just'>L'operatore ha il compito di gestire lo scorrimento della fila alla quale è stato assegnato. Tutto ciò è molto 
              semplice, basta selezionare l'apposita voce nel menù nell'header 'Operator'  <FaUsersCog size={30}/> in basso.

               
          </p>
          <h3>Come si gestisce la coda?</h3>
          <p className='just'>Nella apposita pagina di gestione code, è possibile selezionare la coda alla quale si è stati associati dall'azienda.
              Una volta convalidata verranno mostrati tutti gli utente in coda, e sarà possibile rimuovere il cliente servito tramite l'apposito comando.

               
          </p>
    </div>
    );
}

export default Operator;