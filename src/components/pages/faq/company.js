import React from 'react';
import {   FaStoreAlt } from 'react-icons/fa';
import '../../../styles/style.css'




function Company() {
    
    return (
      <div >
          <h3>Qual'è il compito dell'azienda?</h3>

          <p className='just'>L'azienda ha il compito di creare delle code per la propria attività ed assegnargli un operatore.
              Questa operazione può essere compiuta recandosi nella pagina di 'Manage Comapany' , o
               attraverso l'apposita opzione nel menù dell'header, o premendo sull'icona  <FaStoreAlt size={30}/> in basso.
          </p>
          <br/> <br/>
          <h3>Come si crea un operatore per la mia coda?</h3>
          <p className='just'>Una volta raggiunta la pagina di manage company, troveremo un apposito slider per la creazione di un operatore.
              Aprendo lo slider ( tramite click) avremo la possibiltà di assegnare un operatore alla nostra azienda.
         </p>
         <br/> <br/>
         <h3>Come si crea un  coda?</h3>
          <p className='just'>Una volta raggiunta la pagina di manage company, troveremo un apposito slider per la creazione di una coda.
              Aprendo lo slider ( tramite click) avremo la possibiltà di riempire il form con delle informazione necessarie ai clienti
              per determinare di quale coda si tratti, come ad esempio titolo, descrizione, e operatore delegato a tale coda.

               
          </p>
      
    </div>
    );
}

export default Company;