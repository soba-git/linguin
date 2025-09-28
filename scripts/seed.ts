import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

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
                id:1,
                courseId:1, // Spanish
                title: "Unit 1",
                description: "Learn how to greet in Spanish!",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1, // Learn how to greet in spanish
                order: 1,
                title: "¡Hola!",
            },
            {
                id:2,
                unitId:1, // Learn how to greet in spanish
                order: 2,
                title: "How are you? but in Spanish.",
            },
            {
                id:3,
                unitId:1, // Learn how to greet in spanish
                order: 3,
                title: "Basic greetings.",
            },
            {
                id:4,
                unitId:1, // Learn how to greet in spanish
                order: 4,
                title: "¡Buenos noches!",
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
                type: "SELECT",
                order: 2,
                question: 'Which of these options mean "the woman" in Spanish?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/hombre.png",
                correct: true,
                text: "El Hombre",
                audioSrc: "/multiple_choice_options/audios/spanish/hombre.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/mujer.png",
                correct: false,
                text: "La Mujer",
                audioSrc: "/multiple_choice_options/audios/spanish/mujer.mp3"
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/nino.png",
                correct: false,
                text: "El Nino",
                audioSrc: "/multiple_choice_options/audios/spanish/nino.mp3"
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