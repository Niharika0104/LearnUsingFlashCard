import Image from "next/image";
import { CopilotSidebar } from '@copilotkit/react-ui'
import "@copilotkit/react-ui/styles.css";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
    <Navbar/>
    <CopilotSidebar
  instructions={"You are assisting the user with creating flashcards on any topic they ask for. Break down information into concise, easy-to-remember points, and include key facts, definitions, or questions on one side, with answers or explanations on the other. Organize the information in a way that enhances memorization and recall. Add relevant tags for better categorization and future review."}
  labels={{
    title: "FlashCard Buddy - Study Assistant",
    initial: "Hey there! 👋 Ready to create some flashcards? Let me know the topic!"
  }}
/>
</>
  );
}
