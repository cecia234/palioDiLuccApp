import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

import { auth } from '../firebaseConfig';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onEmailInput = ({ target: { value } }) => setEmail(value);
  const onPwd1Input = ({ target: { value } }) => setPasswordOne(value);
  const onPwd2Input = ({ target: { value } }) => setPasswordTwo(value);


  const onFormSubmit = event => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in Firebase")
          router.push("/home");
        })
        .catch(error => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message)
        });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
    <>
      <h1>C'è sempre una prima volta al Palio, registrati pure</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={onEmailInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onPwd1Input} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Ripeti la password</Form.Label>
          <Form.Control type="password" placeholder="Ripeti la password" onChange={onPwd2Input} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </>
  )
}

export default SignUp;