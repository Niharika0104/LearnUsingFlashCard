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
import DarkMode from './DarkMode';
export default function Navbar(){
    return (
        <nav className="bg-gray-200  p-4 shadow-md">
        <div className="flex justify-between items-center  ">
          {/* Logo Section */}
          <div className=" text-lg font-bold">
            <Link href="/">
            <span className='text-purple-600 '>Quiz</span>
            <span className='text-black '>Flip</span>

            </Link>
          </div>
          <DarkMode/>
        
{/*           
       
         
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
                    */}
        </div>
      </nav> 
        
    )
}