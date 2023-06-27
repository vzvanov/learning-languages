'use client';
import { LangPair } from '@/common_modules/types';
import { getAllWords } from '@/services/getDictionary';
import { useDB, useLanguages } from '@/store';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import styles from './dictionary.module.css';
import { Word } from '@/components/Word/Word';

export default function Dictionary() {
  const [baseLang, learningLang] = useLanguages(
    (state) => [state.baseLang, state.learningLang],
    shallow
  );
  const [source] = useDB(
    (state) => [state.source],
    shallow
  );

  const [dic, setDictionary] = useState<LangPair[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      let words = await getAllWords(baseLang, learningLang, source);
      setDictionary(words);
    }
    fetchWords()
      .catch(console.error);
  }, [baseLang, learningLang, source]);

  return (
    <>
      <h2
        className={styles.h2}
      >Dictionary</h2>
      <div
        className={styles.words}
      >
        {dic && dic.map((word) => (
          <Word
            key={word.id}
            word={word}
          />
        ))}
      </div>
    </>
  )
}