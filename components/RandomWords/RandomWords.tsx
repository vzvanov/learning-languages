'use client';
import { useDB, useLanguages } from '@/store';
import { shallow } from 'zustand/shallow';
import { getNextWordToLearn } from '@/services/getDictionary';
import { useEffect, useState } from 'react';
import { Variations } from '@/components/Variations/Variations';
import { LearningWord } from '@/components/LearningWord/LearningWord';
import { WordToLearn } from '@/common_modules/types';
import styles from './randomwords.module.css';

type TestWord = {
  id: number,
  value: string
};

type Props = {
  option: string;
};

const RandomWords = ({ option }: Props) => {
  const [source] = useDB(
    (state) => [state.source],
    shallow
  );
  const [startLearning, setStartLearning] = useState(false);
  const [direction, setDirection] = useState(false);
  const [baseLang, learningLang] = useLanguages(
    (state) => [state.baseLang, state.learningLang],
    shallow);
  const [wordToLearn, setWordToLearn] = useState('');
  const [words, setWords] = useState<TestWord[]>([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [testResult, setTestResult] = useState({
    right: 0,
    wrong: 0
  });
  const [freeze, setFreeze] = useState(false);

  useEffect(() => {
    handleNext();
  }, []);

  function getWordsToLearn(word: WordToLearn, direction: boolean) {
    const result: TestWord[] = [
      {
        id: word.id,
        value: direction ? word.learningLang : word.baseLang
      }
    ];

    for (let item of word.variation) {
      result.push({
        id: item.id,
        value: direction ? item.learningLang : item.baseLang
      });
    }
    return result;
  }

  function shuffle(array: TestWord[]): void {
    array.sort(() => Math.random() - 0.5);
  }

  const handleNext = async () => {
    const wordWithVariatons: WordToLearn = await getNextWordToLearn(baseLang, learningLang, source, option);

    setWordToLearn(direction ? wordWithVariatons.baseLang : wordWithVariatons.learningLang);
    setStartLearning(true);
    setRightAnswer(wordWithVariatons.id);
    setTestResult({
      right: 0,
      wrong: 0
    });
    setFreeze(false);
    setDirection(!direction);

    const wordToLearn = getWordsToLearn(wordWithVariatons, direction);
    shuffle(wordToLearn);
    setWords(wordToLearn);
  }

  const handleAnswer = (answer: number) => {
    if (answer === rightAnswer) {
      setTestResult({
        right: answer,
        wrong: 0
      });
    } else {
      setTestResult({
        right: rightAnswer,
        wrong: answer
      });
    }
    setFreeze(true);
  }

  return (
    <>
      <LearningWord
        word={wordToLearn}
      />
      <Variations
        words={words}
        onAnswer={handleAnswer}
        testResult={testResult}
        freeze={freeze}
      />
      <div className={styles.buttons}>
        <button
          className={styles.button}
          name='startLearning'
          onClick={handleNext}
        >{startLearning ? 'Next' : 'Start learning'}</button>
      </div>
    </>
  );
};

export { RandomWords };