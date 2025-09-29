"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";

const facts = [
  "Spaced repetition is one of the most effective ways to remember new information long-term.",
  "Immersion, like watching shows or speaking with natives, accelerates language learning more than studying alone.",
  "The average adult can comfortably learn around 10–20 new words a day with consistent practice.",
  "Writing things by hand strengthens memory more than typing.",
  "Mistakes are essential to learning; they signal the brain to adapt and improve.",
  "Teaching someone else a concept is one of the best ways to solidify your own understanding.",
  "Short, frequent study sessions are more effective than long, infrequent cramming.",
  "Flashcards with images are remembered better than flashcards with only text.",
  "Learning before sleep can improve retention since the brain consolidates memories overnight.",
  "Active recall (testing yourself) is more powerful than passive review (just rereading notes).",
  "Connecting new information to things you already know makes learning much faster.",
  "Language learners who speak out loud remember vocabulary better than those who study silently.",
  "Taking breaks during study sessions improves focus and prevents burnout.",
  "Music and rhythm can help with memorizing words and patterns in any subject.",
  "Learning in context (like words in sentences) sticks better than learning isolated facts.",
  "Consistency beats intensity — daily practice builds mastery over time.",
  "Curiosity boosts learning by activating reward systems in the brain.",
  "Your brain can learn new skills at any age thanks to neuroplasticity.",
  "Visualization strengthens memory — imagining a word or concept helps it stick.",
  "Confidence in speaking a new language often matters more than perfect grammar.",
  "Reviewing material just before forgetting it maximizes retention (this is the basis of spaced repetition).",
  "Chunking information (grouping it into smaller parts) makes complex topics easier to remember.",
  "Sleep, exercise, and nutrition all strongly affect learning and memory.",
  "Gamified learning increases motivation by turning progress into rewards.",
  "Listening more than speaking at the start helps with language comprehension.",
  "Your brain filters out unneeded information unless you actively use it.",
  "Switching up study locations and contexts can improve recall.",
  "Mnemonics turn difficult information into easier-to-remember stories or patterns.",
  "Studying with others improves accountability and helps fill knowledge gaps.",
  "Motivation and consistency matter more than raw talent in language learning.",
];

const Loading = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Simulate: real data load (e.g. API call)
    const fetchData = new Promise((resolve) =>
      setTimeout(resolve, 1000) // pretend backend took 1s
    );

    // Minimum 3s loader
    const minDelay = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    // Wait for BOTH: data + min delay
    Promise.all([fetchData, minDelay]).then(() => setReady(true));
  }, []);

  if (!ready) {
    const randomFact =
      facts[Math.floor(Math.random() * facts.length)];

    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6 text-center">
        {/* Bigger image on top */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <Image
            src="/gifs/duolingo_jumping.gif"
            alt="Loading"
            unoptimized
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Loader below image */}
        <Loader className="h-8 w-8 text-muted-foreground animate-spin" />

        {/* Fun fact */}
        <p className="text-sm sm:text-base text-neutral-600 italic max-w-md">
          💡 Fun fact: {randomFact}
        </p>
      </div>
    );
  }

};

export default Loading;
