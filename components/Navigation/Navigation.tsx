"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './navigation.module.css';

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

let getClassName = (isActive: boolean): string => {
  return isActive ? styles.a + " " + styles.active : styles.a;
}

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();

  return (
    <nav>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={getClassName(isActive)}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export { Navigation };
