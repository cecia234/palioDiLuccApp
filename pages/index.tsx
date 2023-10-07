import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './about';
import Home from './home';


export function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}


export default function HomePage() {
  const loggedIn = true;
  return (
    <>
      <Head>
        <title>Palio di LuccApp</title>
      </Head>
      {
        loggedIn ? <Home></Home> : <About></About>
      }
    </>
  );
}