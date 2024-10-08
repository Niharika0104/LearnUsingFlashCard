"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTrophy } from "react-icons/fa"; // Trophy icon using react-icons
import { useRouter,useParams } from 'next/navigation';
import { domainToASCII } from "url";
interface QuizResultProps {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  reviewedQuestions:number;
  unAnsweredQuestions:number;  
}

export default function QuizResult({ correctAnswers, wrongAnswers, totalQuestions, onRetry }: QuizResultProps) {
  const [showTrophy, setShowTrophy] = useState(correctAnswers > wrongAnswers); // Show trophy based on score
  const router=useRouter();
  const {id}=useParams();
  const result=localStorage.getItem('result');
  const [data,setData]=useState<QuizResultProps>()
  useEffect(()=>{
    
   setData(JSON.parse(result))
  },[result])
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      {showTrophy && (
        <div className="flex items-center justify-center mb-8">
          <FaTrophy className="text-yellow-400 text-6xl" />
          <h2 className="text-4xl font-bold ml-4">Congratulations!</h2>
        </div>
      )}
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
        <p className="text-lg mb-2">Correct Answers: <span className="text-green-500 font-bold">{data?.correctAnswers}</span></p>
        <p className="text-lg mb-2">Wrong Answers: <span className="text-red-500 font-bold">{data?.wrongAnswers}</span></p>
        <p className="text-lg mb-2">UnAnswered Questions: <span className="text-amber-500 font-bold">{data?.unAnsweredQuestions}</span></p>
        <p className="text-lg mb-2">Total Questions: <span className="font-bold">{data?.totalQuestions}</span></p>

        <div className="flex justify-center mt-6 gap-4">
          <Button onClick={()=>{ router.push("/" + id + "/quiz"); // Retry the quiz
        localStorage.removeItem('result');}} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Retry Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
export type {QuizResultProps}