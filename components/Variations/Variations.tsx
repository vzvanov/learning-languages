'use client';
import styles from './variations.module.css'

type Word = {
  id: number,
  value: string
};

type Props = {
  words: Word[];
  onAnswer: (answer: number) => void;
  testResult: {
    right: number;
    wrong: number;
  };
  freeze: boolean;
};

const Variations = ({ words, onAnswer, testResult, freeze }: Props) => {

  const handleButtonsClick = (e: any) => {
    e.stopPropagation();
    if (freeze) return;
    let answer = e.target.getAttribute("data-answer");
    onAnswer(+answer);
  }

  const getClassName = (id: number) => {
    let name = styles.item;
    if (id === testResult.right) name += ' ' + styles.right;
    if (id === testResult.wrong) name += ' ' + styles.wrong;
    if (!freeze) name += ' ' + styles.answer;

    return name;
  }

  return (
    <>
      <div className={styles.variations}
        onClick={handleButtonsClick}
      >
        {words.map((item, index) => (
          <div
            className={getClassName(item.id)}
            key={index}
            data-answer={item.id}>{item.value}</div>
        ))}
      </div>
    </>
  );
};

export { Variations };