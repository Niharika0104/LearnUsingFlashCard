"use client";
import useFlashCardStore from '@/lib/store/flashcardstore';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Flashcard } from '@/lib/store/flashcardstore';
import FlashcardComponent from '@/components/FlashCard';

const LearnPage = () => {
  const { id } = useParams();
  const flashcards = useFlashCardStore((state) => state.flashcards);
  const [data, setData] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (flashcards.length) {
      // Filter the topic content by ID and extract the flashcards
      const res: Flashcard[] = flashcards
        .filter((elem) => elem.id === Number(id)) // Fix filter condition to return boolean
        .flatMap((elem) => elem.flashcards); // Extract flashcards from the matching topic

      setData(res); // Update the state with filtered flashcards
    }
  }, [flashcards, id]); // useEffect should depend on flashcards and id, not data

  return (
    <div className='w-full flex justify-center '>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl: gap-4 m-4 '>
      {data.map((item, key) => (
       
          <FlashcardComponent term={item.term} description={item.description} key={key}  />
       
      ))}
    </div>
    </div>

  );
};

export default LearnPage;
