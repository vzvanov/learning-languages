
import styles from './learning.module.css'

type Props = {
  word: string;
};

const LearningWord = ({ word }: Props) => {

  return (
    <>
      <div className={styles.word}>
        {word}
      </div>
    </>
  );
};

export { LearningWord };