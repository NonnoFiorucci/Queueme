import React  from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Collapse } from 'react-bootstrap';
import { GoogleLoginButton } from "react-social-login-buttons";
import { fire, providerGoogle } from '../../../config/FirebaseConfig';

import * as ROLES from '../../../constants/roles';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null,
      userId: null,
      role: ROLES.USER,

      userAuthProvider: null,

      openAccesso: false,
      openRegistrazione: false,
    }
    this.authGoogleProvider = this.authGoogleProvider.bind(this)
    this.authEmailPassword = this.authEmailPassword.bind(this)
    this.registrationEmailPassword = this.registrationEmailPassword.bind(this)
    this.updateStateUser = this.updateStateUser.bind(this)
  }

  updateStateUser() {
    this.props.updateUserSession(this.state.userId, this.state.email, this.state.role, this.state.name)
  }


  mergeRealTimeDb() {
    const rootUtente = fire.database().ref("users/" + this.state.userAuthProvider.uid)
    .on("value",snap => {
      if (!snap.exists()) {
          rootUtente.set({     
            name: this.state.userAuthProvider.displayName,
            email: this.state.userAuthProvider.email,
            role: this.state.role
          }).then((data) => {
            console.log('data ', data)
          }).catch((error) => {
            console.log('error ', error)
          })   
          this.setState({
            userId: this.state.userAuthProvider.uid,
            name: this.state.userAuthProvider.displayName,
            email: this.state.userAuthProvider.email,
            role: this.state.role
          })     
      }else {
        console.log("moesiste")
      this.setState({
        userId: this.state.userAuthProvider.uid,
        name: snap.val().displayName,
        email: snap.val().email,
        role: snap.val().role
      })
      }

    });  
   
  }

  authGoogleProvider() {
    fire.auth().signInWithPopup(providerGoogle)
      .then((result) => {
        this.setState({
          userAuthProvider: result.user
        })
        this.mergeRealTimeDb()  //aggiungo l'utente al db
        this.updateStateUser()
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          alert("Credenziali di accesso  collegate ad un altro account");
        } else alert("Errore login:" + error)
      })
  }

  authEmailPassword(event) {
    const email = this.refs.emailLogin.value
    const password = this.refs.pwdLogin.value
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setState({
          userAuthProvider: result.user
        })
        this.mergeRealTimeDb()
        this.updateStateUser()
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
    const email = this.refs.regEmail.value
    const password = this.refs.regPwd.value
    const role = this.ref.regRole.value
    
    console.log(email,password,role)
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setState({
          userAuthProvider: result.user,
          role: role
        })
        this.mergeRealTimeDb()
        this.updateStateUser()
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
          <GoogleLoginButton style={{ fontWeight: 'bold' }} onClick={() => this.authGoogleProvider()}>Accedi con Google</GoogleLoginButton>
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
              <option value={ROLES.USER}>Users</option>
              <option value={ROLES.COMPANY}>Company</option>
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
    if (this.props.authenticated) {
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