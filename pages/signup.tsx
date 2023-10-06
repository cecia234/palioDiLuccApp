import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebaseConfig';
import { Button, Container, Form, Row } from 'react-bootstrap';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = event => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if(passwordOne === passwordTwo)
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
    <Form onSubmit={onSubmit}>
      <input onChange={(event) => setEmail(event.target.value)}></input>
      <input onChange={(event) => setPasswordOne(event.target.value)}></input>
      <input onChange={(event) => setPasswordTwo(event.target.value)}></input>
      <Button type="submit">Sign Up</Button>
    </Form>
  )
}

export default SignUp;