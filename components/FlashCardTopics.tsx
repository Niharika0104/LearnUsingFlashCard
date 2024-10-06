import { useEffect } from "react";
import useFlashcardStore from "@/lib/store/flashcardstore";
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'; 
import { useRouter } from 'next/navigation';

interface Data{
    topic:string;
    FlashCards:[]
}
export default function RecentFlashCardTopic(){
    const flashcards = useFlashcardStore((state) => state.flashcards);
    const router=useRouter();
    return(
        <>
      { <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl: gap-4 m-4 ">
  {flashcards.map((item, key) => {
    return (
      
        <Card className="relative group w-64 h-40 flex items-center justify-center transition-transform duration-300 text-center" key={key}>
          <CardContent className=" w-full h-full">
            <p className="opacity-100 group-hover:opacity-0  flex justify-center items-center h-full w-full">{item.topic}</p>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600" onClick={()=>{router.push(item.id+"/learn")}}>Learn</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={()=>{router.push(item.id+"/quiz")}}>Test</button>
        </div>
          </CardContent>
          
        </Card>

       
        
     
    );
  })}
</div>
}
        </>
    )
}