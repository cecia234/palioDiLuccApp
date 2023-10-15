import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

import { auth } from '../firebaseConfig';

async function createPgUser(user) {
  const resp = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })

  if (resp.status >= 200 && resp.status < 400) {
      alert('Richiesta inviata con successo!');
  } else {
      alert("Si è verificato stato un problema con l'invio della richiesta")
      throw (resp.body)
  }
}

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [propic, setPropic] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onUsernameInput = ({ target: { value } }) => setUsername(value);
  const onEmailInput = ({ target: { value } }) => setEmail(value);
  const onPwd1Input = ({ target: { value } }) => setPasswordOne(value);
  const onPwd2Input = ({ target: { value } }) => setPasswordTwo(value);
  const onNameInput = ({ target: { value } }) => setName(value);
  const onSurnameInput = ({ target: { value } }) => setSurname(value);
  const onPropicInput = ({ target: { value } }) => setPropic(value);


  const onFormSubmit = event => {
    event.preventDefault();
    setError(null)
    // check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo) {
      return createUserWithEmailAndPassword(auth, email, passwordOne)
      .then((authUser) => createPgUser({username, email, password: passwordOne, name, surname, propic, uid: authUser.user.uid}))
      .then(() => {
        router.push("/home");
      })
      .catch((err) =>  {
        setError(err && err.message ? err.message : err)
        alert(error)
      })
    } else {
      setError("Passwords do not match")
      alert(error)
    }
  };

  return (
    <>
      <h1>C'è sempre una prima volta al Palio, registrati pure</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUSername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Inserisci username" onChange={onUsernameInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Inserisci email" onChange={onEmailInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onPwd1Input} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Ripeti la password</Form.Label>
          <Form.Control type="password" placeholder="Ripeti la password" onChange={onPwd2Input} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci nome" onChange={onNameInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Cognome (non obbligatorio)</Form.Label>
          <Form.Control type="text" placeholder="Inserisci cognome" onChange={onSurnameInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPropic">
          <Form.Label>Icona profilo</Form.Label>
          <Form.Control type="text" placeholder="Inserisci icona profilo" onChange={onPropicInput} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrati
        </Button>
      </Form>
    </>
  )
}

export default SignUp;