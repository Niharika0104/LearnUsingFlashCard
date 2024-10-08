import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Interface for flashcards
interface Flashcard {
  term: string;
  description: string;
  topic: string;
  tags: string[];
}

// Interface for quiz options
interface QuizOption {
  id: number;
  text: string;
}

// Interface for a quiz question
interface QuizQuestion {
  id:number;
  question: string;
  options: string[]; // Array of 4 options
  correct: string; // ID of the correct option
  selectedOption:string
}

// Interface for the topic's JSON object
interface TopicContent {
  id: number;
  topic:string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

// Store interface
interface FlashcardStore {
  flashcards: TopicContent[];
  addTopicContent: (topicContent: Omit<TopicContent, 'id'>) => void;
  removeTopicContent: (id: number) => void;
}

const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set) => ({
      flashcards: [],
      addTopicContent: (newTopicContent) =>
        set((state) => ({
          flashcards: [...state.flashcards, { ...newTopicContent, id: Date.now() }],
        })),
      
      removeTopicContent: (id) =>
        set((state) => ({
          flashcards: state.flashcards.filter((topicContent) => topicContent.id !== id),
        })),
    }),
    {
      name: 'flashcard-storage', // Key to store flashcards in local storage
      storage: createJSONStorage(() => localStorage), // Use local storage for persistence
    }
  )
);
export default useFlashcardStore;
export type { Flashcard, QuizQuestion,TopicContent,QuizOption };
