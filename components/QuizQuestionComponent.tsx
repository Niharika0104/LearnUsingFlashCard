import { QuizOption } from "@/lib/store/flashcardstore";
interface Quiz{
    question: string;
    options: QuizOption[]; 
    correctOptionId: number; 
    previousQuestion?:()=>void;
    NextQuestion?:()=>void;
    SkipQuestion?:()=>void; 
    MarkAsReview?:()=>void; 

}
export default function QuizQuestionComponent(args:Quiz){
    return(
        <div className="w-[60%] mx-auto h-screen ">
          <div className="text-md font-bold mt-2 mb-5">{args.question}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {args.options.map((item,key)=>(<div className="">{item.text}</div>))}
          </div>
          <div>Mark as review</div>
        </div>
    )
}