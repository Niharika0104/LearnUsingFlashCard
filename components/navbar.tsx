"use client";

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import FlashCardForm from './FlashCardForm';
export default function Navbar(){
    return (
        <nav className="bg-gray-200  p-4 shadow-md">
        <div className="flex justify-between items-center  ">
          {/* Logo Section */}
          <div className=" text-lg font-bold">
            <Link href="/">
            <span>Quiz</span>
            <span>Flip</span>

            </Link>
          </div>
          
        
          
          {/* Button Section */}
         
          <Dialog>
                    <DialogTrigger className="bg-background px-4 py-1 text-primary rounded-md border">
                        Create FlashCard
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Flash Cards
                              </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            Create a new snippet, and save it for later.
                        </DialogDescription>
                        <FlashCardForm />
                    </DialogContent>
                    </Dialog>
        </div>
      </nav>
        
    )
}