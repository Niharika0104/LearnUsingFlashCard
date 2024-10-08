"use client";
import useFlashCardStore, { TopicContent, QuizQuestion } from '@/lib/store/flashcardstore';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuizQuestionComponent from '@/components/QuizQuestionComponent';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { QuizResultProps } from '../result/page';
import { useTheme } from 'next-themes';
interface Quiz extends QuizQuestion{
  selectedOption: number; // Optional property to store the user's selected option
  isMarkedForReview: boolean;
}
const QuizPage = () => {
  const { theme, setTheme } = useTheme();
  const { id } = useParams();
  const [marked,setmaked]=useState(false);
  const router=useRouter();
  const flashcards = useFlashCardStore((state) => state.flashcards);
  const [data, setData] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rev,setRev]=useState(0);
  const handleOptionSelect = (optionId: number) => {
    setData((prevData) =>
      prevData.map((q, index) =>
       index === currentQuestionIndex ? { ...q, selectedOption: optionId } : q
      
      )
    );
    console.log(data,"data")
  };
  useEffect(() => {
    const res: Quiz[] = flashcards
      .filter((elem) => elem.id === Number(id)) // Fix filter condition to return boolean
      .flatMap((elem) => 
        elem.quiz.map((quiz) => ({
          ...quiz,
          selectedOption: -1, 
          isMarkedForReview: false 
        }))); 
    setData(res); 
    if (res.length > 0) {
      setCurrentQuestionIndex(0); 
    }
  }, [flashcards, id]);

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const currentQuestion = data[currentQuestionIndex];

  const processresult = (): QuizResultProps => {
    const correct = data.filter((ques) => (ques.correct === ques.options[ques.selectedOption] && ques.selectedOption!=-1)).length; // Count correct answers
    const unans=data.filter((ques) => ques.selectedOption ===-1).length; 
    const wrong = data.length - correct-unans; // Count wrong answers
    const total = data.length; // Total questions
    const review=data.filter((ques) => ques.isMarkedForReview === true).length;
    
    setRev(review) 
    const res: QuizResultProps = {
      correctAnswers: correct,
      wrongAnswers: wrong,
      totalQuestions: total,
      reviewedQuestions:review,
      unAnsweredQuestions:unans
     
    };
    localStorage.setItem('result',JSON.stringify(res));
    return res;
  };
  const markReview=()=>{
    const val=currentQuestionIndex;
    currentQuestion.isMarkedForReview= !currentQuestion.isMarkedForReview;
    setmaked(!marked);
  }
 const endTest=()=>{
  const review=data.filter((ques) => ques.isMarkedForReview === true).length;
  if(review>0){ if(window.confirm(`You have marked ${review} questions for review.Are you sure you want to end test?`)){
    {processresult();router.push(`result`)}}
}
  else{
    if(window.confirm(`Are you sure you want to end test?`)){
      processresult();router.push(`result`)
    }
  }
 }
  return (
    <div className="flex justify-center items-center h-[80%] my-auto">
      {currentQuestion ? (
        <div className={`w-full max-w-3xl  p-8 rounded-lg shadow-lg object-contain ${(theme=="light" || theme=="system")?' ':'bg-white text-black'}`}>
          <QuizQuestionComponent
            question={currentQuestion.question}
            options={currentQuestion.options}
            correctoption={currentQuestion.correct}
            changeoption={handleOptionSelect}
            selectedoption={currentQuestion.selectedOption}
            markedAsReview={currentQuestion.isMarkedForReview}
          />
          <div className='flex gap-4 mt-8 justify-center'>
            <Button className='bg-purple-400 text-black hover:bg-purple-500' onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </Button>
            <Button className='bg-purple-400 text-black hover:bg-purple-500' onClick={nextQuestion} disabled={currentQuestionIndex === data.length - 1}>
              Next Question
            </Button>
            {!currentQuestion.isMarkedForReview? <Button className='bg-purple-400 text-black hover:bg-purple-500' onClick={()=>{markReview()}} >
              Mark As Review
            </Button>:<Button className='bg-purple-400 text-black hover:bg-purple-500' onClick={()=>{markReview()}} >
            Unmark for Review
            </Button>}
           <Button className='bg-purple-400 text-black hover:bg-purple-500' onClick={()=>{endTest()}} >
              End Test
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center">No questions available.</p>
      )}
    </div>
  );
};

export default QuizPage;
