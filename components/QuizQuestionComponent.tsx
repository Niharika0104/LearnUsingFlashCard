import { QuizOption } from "@/lib/store/flashcardstore";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface Quiz {
  question: string;
  options: string[];
  correctoption: string;
  changeoption: (id: number) => void;
  selectedoption: number;
  markedAsReview: boolean;
}

export default function QuizQuestionComponent({
  question,
  options,
  changeoption,
  selectedoption,
  markedAsReview,
}: Quiz) {
  // Debugging instead of alert
  console.log("Marked as Review: ", markedAsReview);

  const { theme, setTheme } = useTheme();

  // Empty useEffect placeholder removed since it does nothing currently.
  useEffect(() => {}, [markedAsReview]);

  return (
    <div>
      <div className="w-full flex justify-between">
        <div
          className={`text-md font-bold mt-5 mb-10 
          }`}
        >
          {question}
        </div>
        {markedAsReview && (
          <div>
          <div className="bg-amber-400 text-black text-center rounded-lg py-2 px-4 font-semibold">
            Marked for Review
          </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((item, key) => (
          <div
            key={key}
            className={`bg-purple-500 text-white p-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-semibold
            ${key === selectedoption ? "border-4 border-purple-900 bg-purple-700 " : ""}`} // Highlight selected option
            onClick={() => changeoption(key)} // Update selected option on click
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
