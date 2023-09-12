import { Header } from './index'
import Link from 'next/link';
import Layout from '../components/layout';
import NavigationBar from '../components/navbar';

export default function LeaderBoard() {
  const names = ['Lorenzo: 1', 'Mario: 2'];
  return (
    <Layout>
      <Header title="Classifica" />
      <h2>E tu a che punto sei?</h2>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </Layout>
  );
}