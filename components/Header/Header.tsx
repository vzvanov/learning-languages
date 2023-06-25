import Link from "next/link";
import styles from './header.module.css'

const Header = () => {
  return (
    <header
      className={styles.header}
    >
      <Link className={styles.a} href="/">Home</Link>
      <Link className={styles.a} href="/dictionary">Dictionary</Link>
      <Link className={styles.a} href="/settings">Settings</Link>
    </header>
  );
};

export { Header };