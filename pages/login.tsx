import { signInWithEmailAndPassword } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useRouter } from 'next/router'

import Layout from "../components/layout";
import { auth } from '../firebaseConfig';
import Link from "next/link";


export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const onEmailInput = ({ target: { value } }) => setEmail(value);
  const onPwdInput = ({ target: { value } }) => setPwd(value);

  const onFormSubmit = e => {
    e.preventDefault()

    console.log(`${email + ' ' + pwd}`)

    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`${user} Signed In!!`)

        router.push('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Hai sbagliato qualcosa. Ricontrolla le credenziali.')
        console.error(errorCode + ' ' + errorMessage)
      });

  }

  return (<>
    <h1>Ben tornato al Palio, effettua il login per cominciare</h1>
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={onEmailInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={onPwdInput} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in
      </Button>

      <div>Oppure <Link href="/signup">registrati</Link></div>
    </Form>
  </>)
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout simplified={true}>
      {page}
    </Layout>
  )
}