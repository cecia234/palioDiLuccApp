import useSWR from 'swr';
import { Header } from './index';
import {Table} from 'react-bootstrap';
import Layout from '../components/layout';
import NavigationBar from '../components/navbar';

interface IUserScore {
  username: string;
  bronze: number;
  silver: number;
  gold: number;
  total?: number;
  score?: number;
  pos?: number;
}

enum EMedalsPoints {
  GOLD = 6,
  SILVER = 3,
  BRONZE = 1
}

const fetcher = (...args) => fetch(...[(args as any)]).then((res) => res.json())
/*const userScores: IUserScore[] = [
  {
    username: "mario",
    bronze: 2,
    silver: 1,
    gold: 1
  },
  {
    username: "lorenzo",
    bronze: 5,
    silver: 1,
    gold: 2
  },
  {
    username: "nupas",
    bronze: 3,
    silver: 3,
    gold: 3
  },
  {
    username: "mara",
    bronze: 3,
    silver: 3,
    gold: 2
  },
  {
    username: "fra",
    bronze: 6,
    silver: 6,
    gold: 2
  },
  {
    username: "gio",
    bronze: 4,
    silver: 1,
    gold: 5
  },
  {
    username: "ciccio",
    bronze: 2,
    silver: 3,
    gold: 2
  },
  {
    username: "cecia",
    bronze: 1,
    silver: 3,
    gold: 2
  },
];*/
export default function LeaderBoard() {
  let userFetch = useSWR('/api/achievements/leaderBoard', fetcher)
  let userScores = [];
  if(userFetch.data) {
    userScores = userFetch.data.users
  } else {
    return <h1>Loading...</h1>
  }
  const sortedUsers = getOrderedUsers(userScores);
  sortedUsers.forEach((user, index) => {
    user.pos = index + 1
  });


  return (
    <Layout>
      <Header title="Classifica" />
      <h2>E tu a che punto sei?</h2>
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>#</th>
            <th>Utente</th>
            <th>Totale Punti</th>
            <th>🥉</th>
            <th>🥈</th>
            <th>🥇</th>
            <th> Totale Medaglie</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => {
            return (
              <tr>
                <td>{user.pos}</td>
                <td>{user.username === 'marione' ? <b>{user.username}</b> : user.username}</td>
                <td>{user.score}</td>
                <td>{user.bronze}</td>
                <td>{user.silver}</td>
                <td>{user.gold}</td>
                <td>{user.total}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Layout>
  );
}

function getOrderedUsers(users: IUserScore[]) {
  const sortedUsers = users.map((user) => { return { ...user, total: calcTotalMedals(user), score: calcTotalScore(user) } });
  return sortedUsers.sort((a, b) => b.score - a.score);
}

function calcTotalMedals(userScore: IUserScore) {
  return userScore.bronze + userScore.silver+ userScore.gold
}
function calcTotalScore(userScore: IUserScore) {
  return userScore.bronze * EMedalsPoints.BRONZE + userScore.silver * EMedalsPoints.SILVER + userScore.gold * EMedalsPoints.GOLD
}