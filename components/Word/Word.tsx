'use client';
import { LangPair } from '@/common_modules/types';
import styles from './word.module.css';

type Props = {
  word: LangPair;
}

const Word = ({ word }: Props) => {
  const { id, baseLang, learningLang } = word;

  return (
    <div
      className={styles.row}
      key={id}
    >
      <div
        className={styles.left}
      >{baseLang}</div>
      <div
        className={styles.right}
      >{learningLang}</div>
    </div>
  );
};

export { Word };