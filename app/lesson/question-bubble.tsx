import { useState, useEffect } from 'react';
import Image from 'next/image';

type Props = {
    question: string;
    mascotFolder?: string;
};

// List of available quiz masters
const MASCOTS = [
    'grumpy panda.png',
    //TODO: add more quiz masters
];

export const QuestionBubble = ({ 
    question, 
    mascotFolder = '/quiz_masters' 
}: Props) => {
    const [selectedMascot, setSelectedMascot] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Select a random mascot on component mount
        const randomIndex = Math.floor(Math.random() * MASCOTS.length);
        setSelectedMascot(MASCOTS[randomIndex]);
    }, []);

    const mascotPath = selectedMascot ? `${mascotFolder}/${selectedMascot}` : '';

    return (
        <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 mb-6 animate-in fade-in slide-in-from-left duration-500">
            {/* Mascot Image with subtle animation */}
            <div className="relative flex-shrink-0 group">
                {mascotPath && (
                    <>
                        <Image 
                            src={mascotPath}
                            alt="quiz master"
                            height={80}
                            width={80}
                            className="hidden lg:block rounded-full transition-transform duration-300 group-hover:scale-105"
                            onLoad={() => setIsLoaded(true)}
                            style={{ opacity: isLoaded ? 1 : 0 }}
                        />
                        <Image 
                            src={mascotPath}
                            alt="quiz master"
                            height={60}
                            width={60}
                            className="block lg:hidden rounded-full transition-transform duration-300 group-hover:scale-105"
                            onLoad={() => setIsLoaded(true)}
                            style={{ opacity: isLoaded ? 1 : 0 }}
                        />
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                )}
            </div>

            {/* Question Bubble with improved styling */}
            <div className="relative flex-1 max-w-2xl">
                <div className="relative py-3 px-4 lg:py-4 lg:px-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Question text with better typography */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-800 dark:text-gray-100 leading-relaxed font-medium">
                        {question}
                    </p>
                    
                    {/* Speech bubble tail with improved styling */}
                    <div 
                        className="absolute -left-2 top-6 lg:top-8 w-4 h-4 bg-white dark:bg-gray-800 border-l-2 border-b-2 border-gray-200 dark:border-gray-700 transform rotate-45"
                        style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
                    />
                </div>

                {/* Optional: Add a thinking indicator for long questions */}
                {question.length > 100 && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Take your time to read carefully</span>
                    </div>
                )}
            </div>
        </div>
    );
};


 