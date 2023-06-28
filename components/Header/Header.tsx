import styles from './header.module.css';
import { Navigation } from "../Navigation/Navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dictionary", href: "/dictionary" },
  { label: "Settings", href: "/settings" },
];

const Header = () => {
  return (
    <header
      className={styles.header}
    >
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { Header };