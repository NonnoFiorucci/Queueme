import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Collapse } from 'react-bootstrap';
import { GoogleLoginButton } from "react-social-login-buttons";
import { fire, providerGoogle } from '../../../config/FirebaseConfig';

import * as ROLES from '../../../constants/roles';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      name: null,
      userId: null,
      role: null,

      openAccesso: false,
      openRegistrazione: false,
    }
    this.authGoogleProvider = this.authGoogleProvider.bind(this)
    this.authEmailPassword = this.authEmailPassword.bind(this)
    this.registrationEmailPassword = this.registrationEmailPassword.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
  }

  setRedirect(param) {
    this.setState({
      redirect: param
    })
  }

  getUserDetailsFromAuth(name,email) {
    this.setState({
      name: name,
      email: email
    })
  }

  setUserInfo() {
    this.props.updateUserSession(this.state.userId, this.state.email, this.state.role, this.state.name)
  }

  addUser() {
    fire.database().ref('users/' + this.state.user.uid).set({
      nome: this.state.user.nome,
      email: this.state.user.email,
      role: this.state.user.role
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }
  matchAuthWithDB(userId) {

  }

  addUserGoogle() {
    const rootUtente = fire.database().ref("users/" + this.props.user.uid);
    rootUtente.on("value", snap => {
      //verifico se utente esiste
      if (snap.val()) {
        //se non esiste lo aggiungo nel database
        fire.database().ref('users/' + this.state.user.uid).set({
          nome: this.state.user.displayName,
          email: this.state.user.email,
          /* Appena registrato l'utente google ha il ruolo di utente semplice, successivamente su profilo potra cambiare */
          role: ROLES.USER
        }).then((data) => {
          console.log('data ', data)
        }).catch((error) => {
          console.log('error ', error)
        })
      } else { 
        alert("Esiste giá un account") 
      }
    })
  }

  authGoogleProvider() {
    fire.auth().signInWithPopup(providerGoogle)
      .then((result) => {
        // console.log(result.user.displayName)
        this.getUserDetailsFromAuth(result.user.displayName, result.user.email)
        this.setUserInfo()
        this.props.setAuthenticated(true)
        this.addUserGoogle()  //aggiungo l'utente al db
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          alert("Credenziali di accesso  collegate ad un altro account");
        } else alert("Errore login:" + error)
      });
     
  }

  // getUserType() {
  //   const rootUtente = fire.database().ref('users/' + this.state.user.uid);
  //   rootUtente.on('value', snap => {
  //     if (snap.val().role) {
  //       this.setState({

  //       })
  //     }

  //   })
  // }

  authEmailPassword(event) {
    const email = this.refs.emailLogin.value
    const password = this.refs.pwdLogin.value
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.getUserDetailsFromAuth(result.user)
        this.setUserInfo()
        this.props.setAuthenticated(true)
      }).catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          alert("Email collegata ad un altro account");
        } else if (error.code === 'auth/wrong-password') {
          alert("Password errata");
        } else if (error.code === 'auth/user-not-found') {
          alert("Account inesistente");
        } else alert("Errore login: " + error)
      })
    event.preventDefault()
  }

  registrationEmailPassword(event) {
    const email = this.refs.emailLogin.value
    const password = this.refs.pwdLogin.value
    // this.setState({
    //   tipo: this.tipoInputRegistrazione.value
    // })
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.getUserDetailsFromAuth(result.user)
        this.setUserInfo()
        this.props.setAuthenticated(true)
        this.addUser()  //aggiungo l'utente al db
        // alert(this.state.tipo + " aggiunto correttamente")
      }).catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert("La password deve contenere almeno 6 caratteri");
        } else if (error.code === 'auth/invalid-email') {
          alert("Email non valida");
        } else alert("Errore creazione account: " + error)
      })
    event.preventDefault()
  }

  formAccesso() {
    return (
      <div className="formAccesso">
        <Form onSubmit={this.authEmailPassword}>
          <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Inserisci Email" ref='emailLogin' required />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Inserisci Password" ref='pwdLogin' required />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
          </Form.Group>
          <Button type="submit" bsPrefix="btnStyle one">
            Accedi
            </Button>
        </Form>
        <p>Oppure</p>
        <div className="googleCentrato">
          <br />
          <GoogleLoginButton style={{ fontWeight: 'bold' }} onClick={() => {this.authGoogleProvider()}}>Accedi con Google</GoogleLoginButton>
          <br />
        </div>
      </div>
    )
  }

  formRegistrazione() {
    return (
      <div>
        <Form className="formLogin" onSubmit={this.registrationEmailPassword}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Inserisci Email" ref='regEmail' require />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Inserisci Password" ref='regPwd' required />
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Sono uno</Form.Label>
            <Form.Control id="sltForm" as="select" ref='regRole' required>
              <option>users</option>
              <option>company</option>
            </Form.Control>
          </Form.Group>
          <br></br>
          <Button type="submit" bsPrefix="btnStyle one">
            Registrati
          </Button>
        </Form>
      </div>
    )
  }

  render() {
    if (this.props.authenticated === true) {
      return <Redirect to='/profile' />
    }
    const { openAccesso, openRegistrazione } = this.state;
    return (
      <div className="">
        <h2 className="title">Login/Registrazione</h2>
        <h4 className="text">Hai già un account QueueMe?</h4>
        <Button bsPrefix="btnStyle one"
          onClick={() => this.setState({ openRegistrazione: false, openAccesso: !openAccesso })}
          aria-controls="collapse-accedi"
          aria-expanded={openAccesso}>
          Accedi
        </Button>
        <Collapse in={this.state.openAccesso}>
          {this.formAccesso()}
        </Collapse>
        <h4 className="text">Oppure Registrati, ci vuole un attimo!</h4>
        <Button bsPrefix="btnStyle one"
          onClick={() => this.setState({ openAccesso: false, openRegistrazione: !openRegistrazione })}
          aria-controls="collapse-registrazione"
          aria-expanded={openRegistrazione}>
          Registrati ora
        </Button>

        <Collapse in={this.state.openRegistrazione}>
          {this.formRegistrazione()}
        </Collapse>
      </div>
    );
  }
}

export default Login;