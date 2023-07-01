'use client'
import styles from './home.module.css';
import Link from 'next/link';

const items = [
  {
    id: '1',
    name: 'Random words',
    href: '/stages/random-words'
  },
  {
    id: '2',
    name: 'to be',
    href: '/stages/to-be'
  },
  {
    id: '3',
    name: 'pronoun',
    href: '/stages/pronoun'
  },
];

export default function Home() {

  return (
    <>
      <div
        className={styles.items}
      >
        {items.map(item => {
          const { id, href, name } = item;
          return (
            <Link
              key={id}
              id={id}
              className={styles.item}
              href={href}
            >
              {name}
            </Link>
          )
        }
        )}
      </div>
    </>
  )
}
