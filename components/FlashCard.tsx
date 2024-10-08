"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card'; // Assuming Card component exists
import { useTheme } from 'next-themes';
interface FlashCardData{
    term:string;
    description:string;
    onEdit?:(a:string,b:string)=>void;
}
const FlashcardComponent = ({ term, description }:FlashCardData) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { theme } = useTheme();
  const handleFlip = () => setIsFlipped(!isFlipped);
 

  return (
    <>
   
    <div className="w-64 h-40">
      <div className={`relative w-full h-full `}>
        
        {/* Front Side */}
       { !isFlipped?<Card className={`absolute w-full h-full flex justify-center items-center transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : 'rotate-0'} ${theme==="dark"?"bg-white text-black":""}`}  onClick={handleFlip}>
          <CardHeader className=''>
            
              <h2>{term}</h2>
            
          </CardHeader>
          
        </Card>:

   
        <Card className={`absolute w-full h-full flex justify-center items-center transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : 'rotate-0'} ${theme==="dark"?"bg-white text-black":""}`}  onClick={handleFlip}>
          <CardContent >
            <p>{description}</p>
          </CardContent>
         
        </Card>}
      </div>

      {/* CSS for 3D flip */}
      <style jsx>{`
       
        
        .rotate-y-180 {
          transform: rotateX(180deg);
        }
          .rotate-x-180 {
          transform: -rotateY(180deg);
        }
      `}</style>
    </div>
    </>
  );
};

export default FlashcardComponent;
