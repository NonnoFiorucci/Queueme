import React from 'react';

import { FaUsers } from 'react-icons/fa';
import { TiPlus, TiTrash, TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import { IoMdContacts } from "react-icons/io";;




function User() {
    return (
        <div style={{marginLeft:30, marginRight:30}}>
        <h3>Qual'è il compito dell utente?</h3>

        <p className='just'>L'utente ha a disposizione la possibilità di iscriversi a delle code presenti su una determinata lista.
         Questa operazione può essere compiuta recandosi nella pagina delle code accessibile tramite l'icona   <IoMdContacts size={30}/> in basso.
        </p>
        <br/> <br/>
        <h3>Come ci si aggiunge ad Una coda?</h3>
        <p className='just'>Una volta raggiunta la pagina in cui tutte le liste sono visibili,
         troveremo un apposito bottone per l'inserimento all'interno della determinata coda.
           Il bottone da premere è il seguente : <TiPlus size={30}/>
       </p>
       <br/> <br/>
       <h3>Ops, ho sbagliato, come posso uscire da una coda?</h3>
        <p className='just'>Per uscire da una coda basterà premere il pulsante <TiTrash size={30}/> sulla coda dalla quale vogliamo uscire.
       </p>
       <br/> <br/>
       <h3>Come aggiungo una coda ai preferiti?</h3>
        <p className='just'>Semplicissimo, per aggiungere una coda ai preferiti basterà premere il pulsante <TiStarOutline size={30}/> della determinata coda.
        </p>
        <br/> <br/>
       <h3>Come tolgo una coda dai preferiti?</h3>
        <p className='just'>Per eliminare una coda dai preferiti basterà premere ancora una volta
        il pulsante dei preferiti, il quale, per indicare quali sono le code aggiunte ai preferiti, è variato in <TiStarFullOutline size={30}/>.
        </p>
        <br/> <br/>
       <h3>Come posso visualizzare le code a cui partecipo?</h3>
        <p className='just'>Per visualizzare le code a cui sei iscritto puoi recarti alla pagina delle ''Mie code'' attraverso il 
        bottone <FaUsers size={30} />
        </p>
        <br/> <br/>
       <h3>Come posso visualizzare le code preferite?</h3>
        <p className='just'>Per visualizzare le code preferite puoi recarti alla pagina dei ''Preferiti'' attraverso il 
        bottone <TiStarFullOutline size={30} />
        </p>
    
  </div>
    );
}

export default User;