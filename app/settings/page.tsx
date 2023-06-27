"use client";
import { Select } from "@/components/Select/Select";
import { useDB, useLanguages } from "@/store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import styles from './settings.module.css';

export default function Settings() {
  const [languages, baseLang, learningLang,
    getAllLanguages, setBaseLanguage, setLearningLanguage] = useLanguages(
      (state) => [state.languages, state.baseLang, state.learningLang,
      state.getAllLanguages, state.setBaseLanguage, state.setLearningLanguage],
      shallow
    );
  const [source] = useDB(
    (state) => [state.source],
    shallow
  );

  useEffect(() => {
    getAllLanguages(source);
  }, [getAllLanguages, source]);

  return (
    <>
      <h2
        className={styles.h2}
      >Settings</h2>
      <div
        className={styles.row}
      ><label
        className={styles.label}
      >Select base language: <Select
            value={baseLang}
            languages={languages}
            onChange={setBaseLanguage}
          /></label></div>
      <div
        className={styles.row}
      ><label
        className={styles.label}
      >Select learning language: <Select
            value={learningLang}
            languages={languages}
            onChange={setLearningLanguage}
          /></label></div>
    </>
  )
}