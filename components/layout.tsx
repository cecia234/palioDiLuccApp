import styles from './layout.module.css';
import NavigationBar from './navbar';


export default function Layout({ simplified = false, children }) {
  return (
    <>
      <NavigationBar simplified={simplified}></NavigationBar>
      <div className={styles.container}>{children}</div>
    </>
  );
}