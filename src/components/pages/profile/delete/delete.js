import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Button } from 'react-bootstrap';
import {FaAngleLeft} from 'react-icons/fa';



import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


class deleteProfile extends Component{

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
           // AGGIUNGERE ROBA

           
            ruolo: null
          }      

          this.deleteaccount = this.deleteaccount.bind(this);
      }

      readUserData() {
        const rootUtente = fire.database().ref('users/'+this.props.userID);
        const rootAzienda = fire.database().ref('company/'+this.props.userID);        
        
        rootUtente.on('value', snap => {  //verifico se utente
            if (snap.val() !== null) {  //utente
              this.setState({
                nome: snap.val().nome,
               
                ruolo: 'Utente'
              })
              //imposto ruolo e state App
              
              this.props.setLocalRole(this.state.ruolo)
              this.props.setStateUser()
            } else if (snap.val() === null) {  //se non è utente
              rootAzienda.on('value', snapshot => { //verifico se aziendao
                if (snapshot.val() !== null) {  //se azienda
                  this.setState({
                    nome: snapshot.val().nome,
                    email: snapshot.val().email,
                   
                    ruolo: 'Azienda'
                  })
                  //imposto ruolo e state App
                  this.props.setLocalName(this.state.nome)
                 
                  
                  this.props.setLocalRole(this.state.ruolo)
                  this.props.setStateUser()
                } else if (snapshot.val() === null) {  //altrimenti nulla
                  alert('problemi lettura dati account')
                }
            })  
            }
        })
      }

      deleteaccount()
      {
        fire.database().ref('users/'+this.props.userID).remove();
        
        
        


        //logout
        fire.auth().signOut()
        this.deleteStorage()
    }

    deleteStorage() {
      let keysToRemove = ["userID", "email", "role", "username",];
      keysToRemove.forEach(k => localStorage.removeItem(k))
    }

      componentDidMount() {
        this.readUserData();
      }

      render () {        
        return (
            <div>
                <div style={{display:"flex", justifyContent:"left"}}><Button variant="info" href="/profile"> <FaAngleLeft    /> </Button></div>
                
               <h1>Elimina il tuo profilo</h1>
               <br/>
               <h4><strong>Una volta eliminato l'account non potrai più leggere alcuna delle tue conversazioni.</strong></h4>

               <br/>
               <br/>
               <br/>

               <OverlayTrigger
      trigger="click"
      key='bottom'      placement='bottom'
      overlay={
        <Popover
          id={`popover-positioned-bottom`}
          title={`Elimina`}
        >
          <strong>Eliminare Definitivamnte ?</strong>  <br/>
          <br/>
          <br/>         
          <div className="btn-toolbar" style={{display:'felx'}}>
          
        <Button  variant="danger" onClick={this.deleteaccount} > Elimina</Button>  {   }
        <Button style={{marginLeft:50}} href="/deleteProfile "variant="secondary">Annulla</Button>
        </div>
        </Popover>
      }
    >
      <Button variant="secondary">Elimina account </Button>
    </OverlayTrigger>
            </div>
        );
      }    
}

export default deleteProfile;