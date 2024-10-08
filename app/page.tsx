"use client";
import { CopilotSidebar } from '@copilotkit/react-ui';
import "@copilotkit/react-ui/styles.css";
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import useFlashCardStore from '@/lib/store/flashcardstore';
import { Flashcard, QuizQuestion } from '@/lib/store/flashcardstore';
import RecentFlashCardTopic from "@/components/FlashCardTopics";


export default function Home() {
  const flashcards = useFlashCardStore((state) => state.flashcards);
  const addFlashCard = useFlashCardStore((state) => state.addTopicContent);

  useCopilotReadable({
    description: 'A code snippet manager',
    value: flashcards,
  });

  const addTopics = (args: { flashcards: Flashcard[], quiz: QuizQuestion[] ,topic:string}) => {
    // args.flashcards.forEach((newFlashcard) => {
    //   const existingFlashcard = flashcards.find(element => 
    //     element.flashcards.some(flashcard => 
    //       flashcard.term === newFlashcard.term &&
    //       flashcard.description === newFlashcard.description &&
    //       flashcard.topic === newFlashcard.topic
    //     )
    //   );

      // If the flashcard does not exist, add it
      // if (!existingFlashcard) {
      //   addFlashCard({ flashcards: [newFlashcard], quiz: args.quiz });
      // }
      addFlashCard(args);
    };
   

    useCopilotAction({
      name: "create-flashcards-and-also-quiz-questions-for-those-flashcards",
      description: `Create a new flashcard along with corresponding quiz questions. Each flashcard should contain a term, description, topic, and relevant tags. Additionally, for each flashcard, generate quiz questions with multiple answer options. 
      The quiz questions should conform to the 'QuizQuestion' interface, where:
      - Each question contains a string 'question', an array of four 'QuizOption' objects for 'options', and the 'correctOptionId' corresponding to the correct answer.
      - Each 'QuizOption' object should follow the 'QuizOption' interface, having an 'id' and a 'text' value.`,
      parameters: [
        {
          name: "flashcards",
          description: "The flashcards for the given topic",
          type: "object[]", // Use "array" as the type
        },
        {
          name: "quiz",
          description: "The quiz questions for the given topic, adhering to the QuizQuestion interface",
          type: "object[]", // Use "array" for QuizQuestion[]
        },
        {
          name:"topic",
          description: "The title of the topic",
          type: "string"
        }
      ],
      handler: (args: { flashcards: Flashcard[], quiz: QuizQuestion[], topic: string }) => {
        addTopics(args);
      },
    });
    
  return (
    <>
     <RecentFlashCardTopic/>
      <CopilotSidebar
        instructions={"You are assisting the user with creating flashcards on any topic they ask for. Break down information into concise, easy-to-remember points, and include key facts, definitions, or questions on one side, with answers or explanations on the other. Organize the information in a way that enhances memorization and recall. Add relevant tags for better categorization and future review."}
        labels={{
          title: "FlashCard Buddy - Study Assistant",
          initial: "Hey there! 👋 Ready to create some flashcards? Let me know the topic!",
        }}
      />
    </>
  );
}