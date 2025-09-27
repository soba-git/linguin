"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";

const facts = [
  "Spanish is the second-most spoken native language in the world.",
  "The French Academy has been regulating the French language since 1635.",
  "German is famous for its extremely long compound words.",
  "Mandarin Chinese has over 50,000 characters, but 2,500 cover most texts.",
  "The Korean alphabet Hangul was created in 1443 by King Sejong.",
  "Swahili borrows many words from Arabic due to trade history.",
  "Russian uses the Cyrillic alphabet, which has 33 letters.",
  "Arabic is written from right to left.",
  "Italian is considered the closest language to Latin.",
  "Hindi is written in the Devanagari script.",
  "Portuguese is spoken in Brazil, the largest country in South America.",
  "Japanese has three writing systems: Hiragana, Katakana, and Kanji.",
  "Icelandic has changed very little from Old Norse.",
  "Dutch is often called the easiest language for English speakers to learn.",
  "Turkish completely reformed its writing system in 1928, switching to Latin script.",
  "Polish has one of the most complex consonant clusters in Europe.",
  "Finnish is part of the Uralic language family, not Indo-European.",
  "Hebrew was revived as a spoken language in the 19th century.",
  "Zulu is one of South Africa’s 11 official languages.",
  "Greek has been spoken for over 3,000 years.",
  "Thai is a tonal language with five distinct tones.",
  "Vietnamese uses a Latin-based script with tone marks.",
  "Bengali is the 7th most spoken native language in the world.",
  "Norwegian has two official written standards: Bokmål and Nynorsk.",
  "Persian (Farsi) is written in a variant of the Arabic script.",
  "Tagalog, the basis of Filipino, is the national language of the Philippines.",
  "Hungarian has 14–18 grammatical cases depending on how you count them.",
  "Swedish has influenced English with words like 'smorgasbord' and 'ombudsman'.",
  "Irish Gaelic is taught in schools across Ireland.",
  "Esperanto was created in 1887 as a universal second language.",
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

  // ✅ Replace this with your actual page content
  return <div className="p-6">✨ Content Loaded</div>;
};

export default Loading;
