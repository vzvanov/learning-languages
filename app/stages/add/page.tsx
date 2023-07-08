'use client'
import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './add.module.css';
import { shallow } from 'zustand/shallow';
import { useDB, useLanguages } from '@/store';
import { LangPart, LangValue, Word } from '@/common_modules/types';
import { sendWord } from '@/services/sendWord';

export default function AddWord() {
  const [info, setInfo] = useState('');
  const ref = useRef<HTMLFormElement>(null);
  const [languages, getAllLanguages] = useLanguages(
    (state) => [state.languages, state.getAllLanguages],
    shallow
  );
  const [source] = useDB(
    (state) => [state.source],
    shallow
  );

  const langPartOptions: LangPart[] = [LangPart.noun, LangPart.pronoun, LangPart.adjective,
  LangPart.verb, LangPart.adverb, LangPart.preposition, LangPart.conjunction, LangPart.interjection];

  useEffect(() => {
    getAllLanguages(source);
  }, [getAllLanguages, source]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let inputs = ref.current?.querySelectorAll('input[type=text]');
    let select = ref.current?.querySelector('select');

    if (!select) return;
    if (!inputs) return;

    const inputData: LangValue[] = [];

    for (let i = 0; i < inputs.length; i++) {
      let item = (inputs[i] as HTMLInputElement);
      if (!item.value) continue;
      let date: LangValue = {
        lang: item.id,
        value: item.value
      };
      inputData.push(date);
    }

    if (inputData.length !== languages.length) {
      setInfo('input data wrong');
      return;
    };

    const newWord: Word = {
      id: 0,
      meanings: inputData,
      part: +select.value as LangPart,
      images: [],
      description: []
    }
    const result = await sendWord(newWord);
    setInfo(result ? 'word added to dictionary' : 'the word is already in the dictionary');
  }

  return (
    <>
      <h3 className={styles.h3}>Add new word</h3>
      {info && <p className={styles.info}>{info}</p>}
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className={styles.inputs}>
          <label
            className={styles.lebel}
          >
            Type:
            <select>
              {langPartOptions.map(item => (
                <option
                  key={item}
                  value={item}
                >{LangPart[item]}</option>
              ))}
            </select>
          </label>
          {languages.map((item) => (
            <label
              className={styles.lebel}
              key={item.id}
            >
              {item.abbreviation + ':'}
              <input
                type='text'
                id={item.abbreviation}
              />
            </label>
          ))}
        </div>
        <input
          className={styles.btn}
          type="submit" value="Add" />
      </form>
    </>
  )
}
