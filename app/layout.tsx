import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import { ThemeProvider } from "@/components/theme-provider"



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuizFlip",
  description: "QuizFlip is a platform where users can create flashcards on any topic and take quizzes based on the flashcards they've generated, helping them improve retention and recall through interactive learning."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

          <CopilotKit runtimeUrl="/api/copilotkit">
          
            {children}
          </CopilotKit>
          </ThemeProvider>
      </body>
    </html>
  );
}