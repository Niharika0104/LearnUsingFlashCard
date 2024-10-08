"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from 'next/navigation';

interface QuizResultProps {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  reviewedQuestions: number;
  unAnsweredQuestions: number;
}

export default function QuizResult() {
  
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<QuizResultProps | null>(null); // Default to null until data is loaded

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('result');
      if (result) {
        setData(JSON.parse(result));
      }
    }
  }, []); // Empty dependency array to ensure this runs only once on mount

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
     
      <div className={`text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center bg-white`}>
        <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
        <p className="text-lg mb-2">Correct Answers: <span className="text-green-500 font-bold">{data?.correctAnswers}</span></p>
        <p className="text-lg mb-2">Wrong Answers: <span className="text-red-500 font-bold">{data?.wrongAnswers}</span></p>
        <p className="text-lg mb-2">UnAnswered Questions: <span className="text-amber-500 font-bold">{data?.unAnsweredQuestions}</span></p>
        <p className="text-lg mb-2">Total Questions: <span className="font-bold">{data?.totalQuestions}</span></p>

        <div className="flex justify-center mt-6 gap-4">
          <Button onClick={() => {
            router.push("/" + id + "/quiz"); // Retry the quiz
            if (typeof window !== 'undefined') {
              localStorage.removeItem('result');
            }
          }} className="bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-semibold">
            Retry Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

export type { QuizResultProps };
