import styles from './layout.module.css';
import NavigationBar from '../components/navbar';


export default function Layout({ children }) {
  return (
    <>
      <NavigationBar ></NavigationBar>
      <div className={styles.container}>{children}</div>
    </>
  );
}