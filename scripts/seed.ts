import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database.");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/flags/esp.svg",
            },
            {
                id: 2,
                title: "French",
                imageSrc: "/flags/fra.png",
            },
            {
                id: 3,
                title: "Chinese",
                imageSrc: "/flags/chn.svg",
            },
            {
                id: 4,
                title: "Japanese",
                imageSrc: "/flags/jap.webp",
            },
        ]);


        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // Spanish
                title: "Unit 1",
                description: "Learn how to greet in Spanish!",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "¡Hola!",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Basic Greetings",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Reviewing Introductions",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Who Are You?",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "The Verb 'Ser'",
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: "Polite Expressions",
            },
            {
                id: 7,
                unitId: 1,
                order: 7,
                title: "¡Adiós!",
            },
            {
                id: 8,
                unitId: 1,
                order: 8,
                title: "Saying Your Name",
            },
            {
                id: 9,
                unitId: 1,
                order: 9,
                title: "Saying Your Name 2",
            },

        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which of these options mean "the man" in Spanish?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'How would you greet someone before bed?',
                
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'How would you greet someone in the morning?',
            },

            {
                id: 4,
                lessonId: 2,
                type: "ASSIST",
                order: 1,
                question: 'Nice to meet you.',
            },
            // New FILL-type challenges
            {
                id: 5,
                lessonId: 1,
                type: "FILL",
                order: 4,
                question: 'Good night.',
            },
            {
                id: 6,
                lessonId: 1,
                type: "FILL",
                order: 5,
                question: 'Hello.',
            },
            {
                id: 7,
                lessonId: 2,
                type: "FILL",
                order: 2,
                question: 'Nice to meet you.',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/hombre.png",
                correct: true,
                text: "El Hombre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el hombre.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/mujer.png",
                correct: false,
                text: "La Mujer",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/la mujer.mp3"
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/nino.png",
                correct: false,
                text: "El Niño",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el niño.mp3"
            },


            {
                id: 4,
                challengeId: 2,
                correct: false,
                text: "Buenas tardes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas tardes.mp3"
            },
            {
                id: 5,
                challengeId: 2,
                correct: true,
                text: "Buenos días",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenos días.mp3"
            },
            {
                id: 6,
                challengeId: 2,
                correct: false,
                text: "Mucho gusto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Mucho gusto.mp3"
            },


            {
                id: 7,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenas tardes.png",
                correct: false,
                text: "Buenas tardes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas tardes.mp3"
            },
            {
                id: 8,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenos días.png",
                correct: true,
                text: "Buenos días",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenos días.mp3"
            },
            {
                id: 9,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenas noches.png",
                correct: false,
                text: "Buenas noches",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas noches.mp3"
            },


            {
                id: 10,
                challengeId: 4,
                correct: false,
                text: "¿Qué tal?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Qué tal.mp3"
            },
            {
                id: 11,
                challengeId: 4,
                correct: false,
                text: "¿Cómo estás?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Cómo estás.mp3"
            },
            {
                id: 12,
                challengeId: 4,
                correct: true,
                text: "Mucho gusto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Mucho gusto.mp3"
            },

            // Correct answers for FILL-type challenges
            {
                id: 13,
                challengeId: 5,
                correct: true,
                text: "Buenas noches",
            },
            {
                id: 14,
                challengeId: 6,
                correct: true,
                text: "Hola",
            },
            {
                id: 15,
                challengeId: 7,
                correct: true,
                text: "Mucho gusto",
            },
        ])

        console.log("Seeding Finished.")
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database.");
    }
};

main();