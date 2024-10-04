import { useState } from "react";
import { Select,SelectItem,SelectTrigger,SelectValue } from "./ui/select"; // Import the Select component from the local path
import { Input } from "./ui/input"; // Import Input from the local path
import { Button } from "./ui/button"; // Import Button from the local path

const topics = [
  "AWS",
  "React",
  "JavaScript",
  "Node.js",
  "Python",
  "Machine Learning",
  "Databases",
  "Web Development",
];

const FlashcardForm = () => {
  const [topic, setTopic] = useState("");
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Topic:", topic);
    console.log("Term:", term);
    console.log("Description:", description);
    // Clear the form
    setTopic("");
    setTerm("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Create a Flashcard</h2>

      {/* Topic Select */}
      <div className="mt-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Select a Topic
        </label>
        <Select
          id="topic"
          value={topic}
          onValueChange={setTopic} // Use onValueChange to set the selected topic
          placeholder="Choose a topic"
          required
        >
            <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="select the topic" />
  </SelectTrigger>
          {topics.map((t) => (
            <SelectItem  key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Term Input */}
      <div className="mt-4">
        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
          Term
        </label>
        <Input
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter term"
          required
          className="mt-1"
        />
      </div>

      {/* Description Input */}
      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="mt-1 w-full border-gray-300 rounded-md"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button type="submit" className="w-full">
          Create Flashcard
        </Button>
      </div>
    </form>
  );
};

export default FlashcardForm;
