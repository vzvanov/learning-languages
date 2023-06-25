import Link from "next/link";
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer
      className={styles.footer}
    >
      <p>Coded by <Link href="https://github.com/vzvanov" target="_blank">vzvanov</Link></p>
    </footer>
  );
};

export { Footer };