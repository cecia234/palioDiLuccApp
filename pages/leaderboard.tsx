import { Header } from './index'
import Table from 'react-bootstrap/table';
import Layout from '../components/layout';
import NavigationBar from '../components/navbar';

interface IUserScore {
  username: string;
  bronzes: number;
  silvers: number;
  golds: number;
  total?: number;
  score?: number;
  pos?: number;
}

enum EMedalsPoints {
  GOLD = 6,
  SILVER = 3,
  BRONZE = 1
}
const userScores: IUserScore[] = [
  {
    username: "mario",
    bronzes: 2,
    silvers: 1,
    golds: 1
  },
  {
    username: "lorenzo",
    bronzes: 5,
    silvers: 1,
    golds: 2
  },
  {
    username: "nupas",
    bronzes: 3,
    silvers: 3,
    golds: 3
  },
  {
    username: "mara",
    bronzes: 3,
    silvers: 3,
    golds: 2
  },
  {
    username: "fra",
    bronzes: 6,
    silvers: 6,
    golds: 2
  },
  {
    username: "gio",
    bronzes: 4,
    silvers: 1,
    golds: 5
  },
  {
    username: "ciccio",
    bronzes: 2,
    silvers: 3,
    golds: 2
  },
  {
    username: "cecia",
    bronzes: 1,
    silvers: 3,
    golds: 2
  },
];
export default function LeaderBoard() {

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
                <td>{user.username}</td>
                <td>{user.score}</td>
                <td>{user.bronzes}</td>
                <td>{user.silvers}</td>
                <td>{user.golds}</td>
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
  return userScore.bronzes + userScore.silvers + userScore.golds
}
function calcTotalScore(userScore: IUserScore) {
  return userScore.bronzes * EMedalsPoints.BRONZE + userScore.silvers * EMedalsPoints.SILVER + userScore.golds * EMedalsPoints.GOLD
}