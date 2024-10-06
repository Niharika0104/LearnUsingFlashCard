"use client";
import useFlashCardStore, { TopicContent, QuizQuestion } from '@/lib/store/flashcardstore';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuizQuestionComponent from '@/components/QuizQuestionComponent';

const QuizPage = () => {
  const { id } = useParams();
  const flashcards = useFlashCardStore((state) => state.flashcards);
  const [data, setData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const res: QuizQuestion[] = flashcards
      .filter((elem) => elem.id === Number(id)) // Fix filter condition to return boolean
      .flatMap((elem) => elem.quiz); // Extract quizzes from the matching topic

    setData(res); // Update the state with filtered quizzes
    if (res.length > 0) {
      setCurrentQuestionIndex(0);
       // Reset current question index to 0 if there are questions
    }
  }, [flashcards, id]); // useEffect should depend on flashcards and id, not data

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const currentQuestion = data[currentQuestionIndex];

  return (
    <div className='quiz-container'>
      {currentQuestion ? (
        <>
          <QuizQuestionComponent
            question={currentQuestion.question}
            options={currentQuestion.options}
            correctOptionId={currentQuestion.correctOptionId}
          />
          <div className='navigation-buttons'>
            <button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </button>
            <button onClick={nextQuestion} disabled={currentQuestionIndex === data.length - 1}>
              Next Question
            </button>
          </div>
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default QuizPage;
