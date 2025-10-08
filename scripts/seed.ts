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
        await db.delete(schema.proMembers);

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

        // ========== UNITS ==========
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn how to greet in Spanish!",
                order: 1,
            },
            {
                id: 2,
                courseId: 1,
                title: "Unit 2",
                description: "Basic Spanish vocabulary and everyday phrases",
                order: 2,
            },
            {
                id: 3,
                courseId: 1,
                title: "Unit 3",
                description: "Numbers, time, and daily activities",
                order: 3,
            }
        ]);

        // ========== LESSONS ==========
        await db.insert(schema.lessons).values([
            // Unit 1 Lessons
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

            // Unit 2 Lessons
            {
                id: 10,
                unitId: 2,
                order: 1,
                title: "Food & Drink",
            },
            {
                id: 11,
                unitId: 2,
                order: 2,
                title: "Family Members",
            },
            {
                id: 12,
                unitId: 2,
                order: 3,
                title: "Colors",
            },
            {
                id: 13,
                unitId: 2,
                order: 4,
                title: "Animals",
            },
            {
                id: 14,
                unitId: 2,
                order: 5,
                title: "At Home",
            },
            {
                id: 15,
                unitId: 2,
                order: 6,
                title: "Body Parts",
            },
            {
                id: 16,
                unitId: 2,
                order: 7,
                title: "Weather & Seasons",
            },
            {
                id: 17,
                unitId: 2,
                order: 8,
                title: "Common Objects",
            },

            // Unit 3 Lessons
            {
                id: 18,
                unitId: 3,
                order: 1,
                title: "Numbers 1-10",
            },
            {
                id: 19,
                unitId: 3,
                order: 2,
                title: "Numbers 11-20",
            },
            {
                id: 20,
                unitId: 3,
                order: 3,
                title: "Telling Time",
            },
            {
                id: 21,
                unitId: 3,
                order: 4,
                title: "Days of the Week",
            },
            {
                id: 22,
                unitId: 3,
                order: 5,
                title: "Months of the Year",
            },
            {
                id: 23,
                unitId: 3,
                order: 6,
                title: "Daily Routines",
            },
            {
                id: 24,
                unitId: 3,
                order: 7,
                title: "Going Places",
            },
        ]);

        // ========== CHALLENGES ==========
        let challengeId = 1;
        let optionId = 1;

        // Unit 1, Lesson 1 Challenges
        const unit1Lesson1Challenges = [
            {
                id: challengeId++,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which of these options mean "the man" in Spanish?',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'How would you greet someone before bed?',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'How would you greet someone in the morning?',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "FILL",
                order: 4,
                question: 'Good night.',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "FILL",
                order: 5,
                question: 'Hello.',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "SELECT",
                order: 6,
                question: 'Which one means "the woman"?',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "ASSIST",
                order: 7,
                question: 'Good afternoon.',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "SELECT",
                order: 8,
                question: 'Which one means "the boy"?',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "FILL",
                order: 9,
                question: 'Good morning.',
            },
            {
                id: challengeId++,
                lessonId: 1,
                type: "ASSIST",
                order: 10,
                question: 'How are you?',
            },
        ];

        // Unit 1, Lesson 2 Challenges
        const unit1Lesson2Challenges = [
            {
                id: challengeId++,
                lessonId: 2,
                type: "ASSIST",
                order: 1,
                question: 'Nice to meet you.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "FILL",
                order: 2,
                question: 'Nice to meet you.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'How do you say "please"?',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "ASSIST",
                order: 4,
                question: 'Thank you.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "FILL",
                order: 5,
                question: 'You\'re welcome.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "SELECT",
                order: 6,
                question: 'Which means "excuse me"?',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "ASSIST",
                order: 7,
                question: 'See you later.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "SELECT",
                order: 8,
                question: 'How do you say "goodbye"?',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "FILL",
                order: 9,
                question: 'Good luck.',
            },
            {
                id: challengeId++,
                lessonId: 2,
                type: "ASSIST",
                order: 10,
                question: 'How\'s it going?',
            },
        ];

        // Unit 2, Lesson 10 Challenges (Food & Drink)
        const unit2Lesson10Challenges = [
            {
                id: challengeId++,
                lessonId: 10,
                type: "SELECT",
                order: 1,
                question: 'Which one is "water"?',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "ASSIST",
                order: 2,
                question: 'I want bread.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "FILL",
                order: 3,
                question: 'The milk.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "SELECT",
                order: 4,
                question: 'Which one means "coffee"?',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "ASSIST",
                order: 5,
                question: 'I like fruit.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "FILL",
                order: 6,
                question: 'The apple.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "SELECT",
                order: 7,
                question: 'How do you say "cheese"?',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "ASSIST",
                order: 8,
                question: 'The rice is good.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "FILL",
                order: 9,
                question: 'I eat chicken.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "SELECT",
                order: 10,
                question: 'Which one is "orange juice"?',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "ASSIST",
                order: 11,
                question: 'The vegetables are healthy.',
            },
            {
                id: challengeId++,
                lessonId: 10,
                type: "FILL",
                order: 12,
                question: 'I drink tea.',
            },
        ];

        // Unit 2, Lesson 11 Challenges (Family Members)
        const unit2Lesson11Challenges = [
            {
                id: challengeId++,
                lessonId: 11,
                type: "SELECT",
                order: 1,
                question: 'Which one means "mother"?',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "ASSIST",
                order: 2,
                question: 'My father is tall.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "FILL",
                order: 3,
                question: 'The brother.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "SELECT",
                order: 4,
                question: 'How do you say "sister"?',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "ASSIST",
                order: 5,
                question: 'My grandmother is nice.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "FILL",
                order: 6,
                question: 'The grandfather.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "SELECT",
                order: 7,
                question: 'Which means "son"?',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "ASSIST",
                order: 8,
                question: 'My daughter is young.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "FILL",
                order: 9,
                question: 'The uncle.',
            },
            {
                id: challengeId++,
                lessonId: 11,
                type: "SELECT",
                order: 10,
                question: 'How do you say "aunt"?',
            },
        ];

        // Unit 3, Lesson 18 Challenges (Numbers 1-10)
        const unit3Lesson18Challenges = [
            {
                id: challengeId++,
                lessonId: 18,
                type: "SELECT",
                order: 1,
                question: 'Which one is "one"?',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "ASSIST",
                order: 2,
                question: 'I have two cats.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "FILL",
                order: 3,
                question: 'Three.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "SELECT",
                order: 4,
                question: 'How do you say "four"?',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "ASSIST",
                order: 5,
                question: 'There are five apples.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "FILL",
                order: 6,
                question: 'Six.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "SELECT",
                order: 7,
                question: 'Which one means "seven"?',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "ASSIST",
                order: 8,
                question: 'I need eight chairs.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "FILL",
                order: 9,
                question: 'Nine.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "SELECT",
                order: 10,
                question: 'How do you say "ten"?',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "ASSIST",
                order: 11,
                question: 'I am seven years old.',
            },
            {
                id: challengeId++,
                lessonId: 18,
                type: "FILL",
                order: 12,
                question: 'One book.',
            },
        ];

        // Unit 3, Lesson 21 Challenges (Days of the Week)
        const unit3Lesson21Challenges = [
            {
                id: challengeId++,
                lessonId: 21,
                type: "SELECT",
                order: 1,
                question: 'Which one is "Monday"?',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "ASSIST",
                order: 2,
                question: 'Today is Tuesday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "FILL",
                order: 3,
                question: 'Wednesday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "SELECT",
                order: 4,
                question: 'How do you say "Thursday"?',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "ASSIST",
                order: 5,
                question: 'Tomorrow is Friday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "FILL",
                order: 6,
                question: 'Saturday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "SELECT",
                order: 7,
                question: 'Which one means "Sunday"?',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "ASSIST",
                order: 8,
                question: 'I work on Monday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "FILL",
                order: 9,
                question: 'On Friday.',
            },
            {
                id: challengeId++,
                lessonId: 21,
                type: "SELECT",
                order: 10,
                question: 'What day comes after Wednesday?',
            },
        ];

        await db.insert(schema.challenges).values([
            ...unit1Lesson1Challenges,
            ...unit1Lesson2Challenges,
            ...unit2Lesson10Challenges,
            ...unit2Lesson11Challenges,
            ...unit3Lesson18Challenges,
            ...unit3Lesson21Challenges,
        ]);

        // ========== CHALLENGE OPTIONS ==========
        await db.insert(schema.challengeOptions).values([
            // Unit 1, Lesson 1, Challenge 1 (SELECT - "the man")
            {
                id: optionId++,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/hombre.png",
                correct: true,
                text: "El Hombre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el hombre.mp3"
            },
            {
                id: optionId++,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/mujer.png",
                correct: false,
                text: "La Mujer",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/la mujer.mp3"
            },
            {
                id: optionId++,
                challengeId: 1,
                imageSrc: "/multiple_choice_options/spanish/nino.png",
                correct: false,
                text: "El Niño",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el niño.mp3"
            },

            // Challenge 2 (ASSIST - greet before bed)
            {
                id: optionId++,
                challengeId: 2,
                correct: false,
                text: "Buenas tardes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas tardes.mp3"
            },
            {
                id: optionId++,
                challengeId: 2,
                correct: true,
                text: "Buenas noches",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas noches.mp3"
            },
            {
                id: optionId++,
                challengeId: 2,
                correct: false,
                text: "Buenos días",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenos días.mp3"
            },

            // Challenge 3 (SELECT - morning greeting)
            {
                id: optionId++,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenas tardes.png",
                correct: false,
                text: "Buenas tardes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas tardes.mp3"
            },
            {
                id: optionId++,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenos días.png",
                correct: true,
                text: "Buenos días",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenos días.mp3"
            },
            {
                id: optionId++,
                challengeId: 3,
                imageSrc: "/multiple_choice_options/spanish/Buenas noches.png",
                correct: false,
                text: "Buenas noches",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas noches.mp3"
            },

            // Challenge 4 (FILL - Good night)
            {
                id: optionId++,
                challengeId: 4,
                correct: true,
                text: "Buenas noches",
            },

            // Challenge 5 (FILL - Hello)
            {
                id: optionId++,
                challengeId: 5,
                correct: true,
                text: "Hola",
            },

            // Challenge 6 (SELECT - "the woman")
            {
                id: optionId++,
                challengeId: 6,
                imageSrc: "/multiple_choice_options/spanish/hombre.png",
                correct: false,
                text: "El Hombre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el hombre.mp3"
            },
            {
                id: optionId++,
                challengeId: 6,
                imageSrc: "/multiple_choice_options/spanish/mujer.png",
                correct: true,
                text: "La Mujer",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/la mujer.mp3"
            },
            {
                id: optionId++,
                challengeId: 6,
                imageSrc: "/multiple_choice_options/spanish/nina.png",
                correct: false,
                text: "La Niña",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/la niña.mp3"
            },

            // Challenge 7 (ASSIST - Good afternoon)
            {
                id: optionId++,
                challengeId: 7,
                correct: true,
                text: "Buenas tardes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas tardes.mp3"
            },
            {
                id: optionId++,
                challengeId: 7,
                correct: false,
                text: "Buenos días",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenos días.mp3"
            },
            {
                id: optionId++,
                challengeId: 7,
                correct: false,
                text: "Buenas noches",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas noches.mp3"
            },

            // Challenge 8 (SELECT - "the boy")
            {
                id: optionId++,
                challengeId: 8,
                imageSrc: "/multiple_choice_options/spanish/nino.png",
                correct: true,
                text: "El Niño",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el niño.mp3"
            },
            {
                id: optionId++,
                challengeId: 8,
                imageSrc: "/multiple_choice_options/spanish/hombre.png",
                correct: false,
                text: "El Hombre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/el hombre.mp3"
            },
            {
                id: optionId++,
                challengeId: 8,
                imageSrc: "/multiple_choice_options/spanish/nina.png",
                correct: false,
                text: "La Niña",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/la niña.mp3"
            },

            // Challenge 9 (FILL - Good morning)
            {
                id: optionId++,
                challengeId: 9,
                correct: true,
                text: "Buenos días",
            },

            // Challenge 10 (ASSIST - How are you?)
            {
                id: optionId++,
                challengeId: 10,
                correct: true,
                text: "¿Cómo estás?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Cómo estás.mp3"
            },
            {
                id: optionId++,
                challengeId: 10,
                correct: false,
                text: "¿Qué tal?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Qué tal.mp3"
            },
            {
                id: optionId++,
                challengeId: 10,
                correct: false,
                text: "Mucho gusto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Mucho gusto.mp3"
            },

            // Unit 1, Lesson 2, Challenge 11 (ASSIST - Nice to meet you)
            {
                id: optionId++,
                challengeId: 11,
                correct: false,
                text: "¿Qué tal?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Qué tal.mp3"
            },
            {
                id: optionId++,
                challengeId: 11,
                correct: false,
                text: "¿Cómo estás?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Cómo estás.mp3"
            },
            {
                id: optionId++,
                challengeId: 11,
                correct: true,
                text: "Mucho gusto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Mucho gusto.mp3"
            },

            // Challenge 12 (FILL - Nice to meet you)
            {
                id: optionId++,
                challengeId: 12,
                correct: true,
                text: "Mucho gusto",
            },

            // Challenge 13 (SELECT - "please")
            {
                id: optionId++,
                challengeId: 13,
                imageSrc: "/multiple_choice_options/spanish/por favor.png",
                correct: true,
                text: "Por favor",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/por favor.mp3"
            },
            {
                id: optionId++,
                challengeId: 13,
                imageSrc: "/multiple_choice_options/spanish/gracias.png",
                correct: false,
                text: "Gracias",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/gracias.mp3"
            },
            {
                id: optionId++,
                challengeId: 13,
                imageSrc: "/multiple_choice_options/spanish/de nada.png",
                correct: false,
                text: "De nada",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/de nada.mp3"
            },

            // Challenge 14 (ASSIST - Thank you)
            {
                id: optionId++,
                challengeId: 14,
                correct: true,
                text: "Gracias",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/gracias.mp3"
            },
            {
                id: optionId++,
                challengeId: 14,
                correct: false,
                text: "Por favor",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/por favor.mp3"
            },
            {
                id: optionId++,
                challengeId: 14,
                correct: false,
                text: "Perdón",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/perdón.mp3"
            },

            // Challenge 15 (FILL - You're welcome)
            {
                id: optionId++,
                challengeId: 15,
                correct: true,
                text: "De nada",
            },

            // Challenge 16 (SELECT - "excuse me")
            {
                id: optionId++,
                challengeId: 16,
                imageSrc: "/multiple_choice_options/spanish/perdón.png",
                correct: true,
                text: "Perdón",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/perdón.mp3"
            },
            {
                id: optionId++,
                challengeId: 16,
                imageSrc: "/multiple_choice_options/spanish/gracias.png",
                correct: false,
                text: "Gracias",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/gracias.mp3"
            },
            {
                id: optionId++,
                challengeId: 16,
                imageSrc: "/multiple_choice_options/spanish/adiós.png",
                correct: false,
                text: "Adiós",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/adiós.mp3"
            },

            // Challenge 17 (ASSIST - See you later)
            {
                id: optionId++,
                challengeId: 17,
                correct: true,
                text: "Hasta luego",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/hasta luego.mp3"
            },
            {
                id: optionId++,
                challengeId: 17,
                correct: false,
                text: "Adiós",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/adiós.mp3"
            },
            {
                id: optionId++,
                challengeId: 17,
                correct: false,
                text: "Hasta mañana",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/hasta mañana.mp3"
            },

            // Challenge 18 (SELECT - "goodbye")
            {
                id: optionId++,
                challengeId: 18,
                imageSrc: "/multiple_choice_options/spanish/adiós.png",
                correct: true,
                text: "Adiós",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/adiós.mp3"
            },
            {
                id: optionId++,
                challengeId: 18,
                imageSrc: "/multiple_choice_options/spanish/hola.png",
                correct: false,
                text: "Hola",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/hola.mp3"
            },
            {
                id: optionId++,
                challengeId: 18,
                imageSrc: "/multiple_choice_options/spanish/gracias.png",
                correct: false,
                text: "Gracias",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/gracias.mp3"
            },

            // Challenge 19 (FILL - Good luck)
            {
                id: optionId++,
                challengeId: 19,
                correct: true,
                text: "Buena suerte",
            },

            // Challenge 20 (ASSIST - How's it going?)
            {
                id: optionId++,
                challengeId: 20,
                correct: true,
                text: "¿Qué tal?",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/¿Qué tal.mp3"
            },
            {
                id: optionId++,
                challengeId: 20,
                correct: false,
                text: "Mucho gusto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Mucho gusto.mp3"
            },
            {
                id: optionId++,
                challengeId: 20,
                correct: false,
                text: "Buenas noches",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 1/Buenas noches.mp3"
            },

            // Unit 2, Lesson 10, Challenge 21 (SELECT - "water")
            {
                id: optionId++,
                challengeId: 21,
                imageSrc: "/multiple_choice_options/spanish/agua.png",
                correct: true,
                text: "El agua",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el agua.mp3"
            },
            {
                id: optionId++,
                challengeId: 21,
                imageSrc: "/multiple_choice_options/spanish/leche.png",
                correct: false,
                text: "La leche",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la leche.mp3"
            },
            {
                id: optionId++,
                challengeId: 21,
                imageSrc: "/multiple_choice_options/spanish/café.png",
                correct: false,
                text: "El café",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el café.mp3"
            },

            // Challenge 22 (ASSIST - I want bread)
            {
                id: optionId++,
                challengeId: 22,
                correct: true,
                text: "Quiero pan",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/quiero pan.mp3"
            },
            {
                id: optionId++,
                challengeId: 22,
                correct: false,
                text: "Quiero agua",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/quiero agua.mp3"
            },
            {
                id: optionId++,
                challengeId: 22,
                correct: false,
                text: "Quiero fruta",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/quiero fruta.mp3"
            },

            // Challenge 23 (FILL - The milk)
            {
                id: optionId++,
                challengeId: 23,
                correct: true,
                text: "La leche",
            },

            // Challenge 24 (SELECT - "coffee")
            {
                id: optionId++,
                challengeId: 24,
                imageSrc: "/multiple_choice_options/spanish/café.png",
                correct: true,
                text: "El café",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el café.mp3"
            },
            {
                id: optionId++,
                challengeId: 24,
                imageSrc: "/multiple_choice_options/spanish/té.png",
                correct: false,
                text: "El té",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el té.mp3"
            },
            {
                id: optionId++,
                challengeId: 24,
                imageSrc: "/multiple_choice_options/spanish/jugo.png",
                correct: false,
                text: "El jugo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el jugo.mp3"
            },

            // Challenge 25 (ASSIST - I like fruit)
            {
                id: optionId++,
                challengeId: 25,
                correct: true,
                text: "Me gusta la fruta",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/me gusta la fruta.mp3"
            },
            {
                id: optionId++,
                challengeId: 25,
                correct: false,
                text: "Me gusta el pan",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/me gusta el pan.mp3"
            },
            {
                id: optionId++,
                challengeId: 25,
                correct: false,
                text: "Me gusta el agua",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/me gusta el agua.mp3"
            },

            // Challenge 26 (FILL - The apple)
            {
                id: optionId++,
                challengeId: 26,
                correct: true,
                text: "La manzana",
            },

            // Challenge 27 (SELECT - "cheese")
            {
                id: optionId++,
                challengeId: 27,
                imageSrc: "/multiple_choice_options/spanish/queso.png",
                correct: true,
                text: "El queso",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el queso.mp3"
            },
            {
                id: optionId++,
                challengeId: 27,
                imageSrc: "/multiple_choice_options/spanish/pan.png",
                correct: false,
                text: "El pan",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el pan.mp3"
            },
            {
                id: optionId++,
                challengeId: 27,
                imageSrc: "/multiple_choice_options/spanish/mantequilla.png",
                correct: false,
                text: "La mantequilla",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la mantequilla.mp3"
            },

            // Challenge 28 (ASSIST - The rice is good)
            {
                id: optionId++,
                challengeId: 28,
                correct: true,
                text: "El arroz es bueno",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el arroz es bueno.mp3"
            },
            {
                id: optionId++,
                challengeId: 28,
                correct: false,
                text: "El arroz es malo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el arroz es malo.mp3"
            },
            {
                id: optionId++,
                challengeId: 28,
                correct: false,
                text: "El pan es bueno",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el pan es bueno.mp3"
            },

            // Challenge 29 (FILL - I eat chicken)
            {
                id: optionId++,
                challengeId: 29,
                correct: true,
                text: "Como pollo",
            },

            // Challenge 30 (SELECT - "orange juice")
            {
                id: optionId++,
                challengeId: 30,
                imageSrc: "/multiple_choice_options/spanish/jugo de naranja.png",
                correct: true,
                text: "Jugo de naranja",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/jugo de naranja.mp3"
            },
            {
                id: optionId++,
                challengeId: 30,
                imageSrc: "/multiple_choice_options/spanish/agua.png",
                correct: false,
                text: "Agua",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/agua.mp3"
            },
            {
                id: optionId++,
                challengeId: 30,
                imageSrc: "/multiple_choice_options/spanish/leche.png",
                correct: false,
                text: "Leche",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/leche.mp3"
            },

            // Challenge 31 (ASSIST - The vegetables are healthy)
            {
                id: optionId++,
                challengeId: 31,
                correct: true,
                text: "Las verduras son saludables",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/las verduras son saludables.mp3"
            },
            {
                id: optionId++,
                challengeId: 31,
                correct: false,
                text: "Las frutas son saludables",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/las frutas son saludables.mp3"
            },
            {
                id: optionId++,
                challengeId: 31,
                correct: false,
                text: "Las verduras son malas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/las verduras son malas.mp3"
            },

            // Challenge 32 (FILL - I drink tea)
            {
                id: optionId++,
                challengeId: 32,
                correct: true,
                text: "Bebo té",
            },

            // Unit 2, Lesson 11, Challenge 33 (SELECT - "mother")
            {
                id: optionId++,
                challengeId: 33,
                imageSrc: "/multiple_choice_options/spanish/madre.png",
                correct: true,
                text: "La madre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la madre.mp3"
            },
            {
                id: optionId++,
                challengeId: 33,
                imageSrc: "/multiple_choice_options/spanish/padre.png",
                correct: false,
                text: "El padre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el padre.mp3"
            },
            {
                id: optionId++,
                challengeId: 33,
                imageSrc: "/multiple_choice_options/spanish/hermana.png",
                correct: false,
                text: "La hermana",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la hermana.mp3"
            },

            // Challenge 34 (ASSIST - My father is tall)
            {
                id: optionId++,
                challengeId: 34,
                correct: true,
                text: "Mi padre es alto",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi padre es alto.mp3"
            },
            {
                id: optionId++,
                challengeId: 34,
                correct: false,
                text: "Mi madre es alta",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi madre es alta.mp3"
            },
            {
                id: optionId++,
                challengeId: 34,
                correct: false,
                text: "Mi padre es bajo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi padre es bajo.mp3"
            },

            // Challenge 35 (FILL - The brother)
            {
                id: optionId++,
                challengeId: 35,
                correct: true,
                text: "El hermano",
            },

            // Challenge 36 (SELECT - "sister")
            {
                id: optionId++,
                challengeId: 36,
                imageSrc: "/multiple_choice_options/spanish/hermana.png",
                correct: true,
                text: "La hermana",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la hermana.mp3"
            },
            {
                id: optionId++,
                challengeId: 36,
                imageSrc: "/multiple_choice_options/spanish/hermano.png",
                correct: false,
                text: "El hermano",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el hermano.mp3"
            },
            {
                id: optionId++,
                challengeId: 36,
                imageSrc: "/multiple_choice_options/spanish/madre.png",
                correct: false,
                text: "La madre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la madre.mp3"
            },

            // Challenge 37 (ASSIST - My grandmother is nice)
            {
                id: optionId++,
                challengeId: 37,
                correct: true,
                text: "Mi abuela es amable",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi abuela es amable.mp3"
            },
            {
                id: optionId++,
                challengeId: 37,
                correct: false,
                text: "Mi abuelo es amable",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi abuelo es amable.mp3"
            },
            {
                id: optionId++,
                challengeId: 37,
                correct: false,
                text: "Mi madre es amable",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi madre es amable.mp3"
            },

            // Challenge 38 (FILL - The grandfather)
            {
                id: optionId++,
                challengeId: 38,
                correct: true,
                text: "El abuelo",
            },

            // Challenge 39 (SELECT - "son")
            {
                id: optionId++,
                challengeId: 39,
                imageSrc: "/multiple_choice_options/spanish/hijo.png",
                correct: true,
                text: "El hijo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el hijo.mp3"
            },
            {
                id: optionId++,
                challengeId: 39,
                imageSrc: "/multiple_choice_options/spanish/hija.png",
                correct: false,
                text: "La hija",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la hija.mp3"
            },
            {
                id: optionId++,
                challengeId: 39,
                imageSrc: "/multiple_choice_options/spanish/padre.png",
                correct: false,
                text: "El padre",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el padre.mp3"
            },

            // Challenge 40 (ASSIST - My daughter is young)
            {
                id: optionId++,
                challengeId: 40,
                correct: true,
                text: "Mi hija es joven",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi hija es joven.mp3"
            },
            {
                id: optionId++,
                challengeId: 40,
                correct: false,
                text: "Mi hijo es joven",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi hijo es joven.mp3"
            },
            {
                id: optionId++,
                challengeId: 40,
                correct: false,
                text: "Mi hija es vieja",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/mi hija es vieja.mp3"
            },

            // Challenge 41 (FILL - The uncle)
            {
                id: optionId++,
                challengeId: 41,
                correct: true,
                text: "El tío",
            },

            // Challenge 42 (SELECT - "aunt")
            {
                id: optionId++,
                challengeId: 42,
                imageSrc: "/multiple_choice_options/spanish/tía.png",
                correct: true,
                text: "La tía",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la tía.mp3"
            },
            {
                id: optionId++,
                challengeId: 42,
                imageSrc: "/multiple_choice_options/spanish/tío.png",
                correct: false,
                text: "El tío",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/el tío.mp3"
            },
            {
                id: optionId++,
                challengeId: 42,
                imageSrc: "/multiple_choice_options/spanish/abuela.png",
                correct: false,
                text: "La abuela",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 2/la abuela.mp3"
            },

            // Unit 3, Lesson 18, Challenge 43 (SELECT - "one")
            {
                id: optionId++,
                challengeId: 43,
                imageSrc: "/multiple_choice_options/spanish/uno.png",
                correct: true,
                text: "Uno",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/uno.mp3"
            },
            {
                id: optionId++,
                challengeId: 43,
                imageSrc: "/multiple_choice_options/spanish/dos.png",
                correct: false,
                text: "Dos",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/dos.mp3"
            },
            {
                id: optionId++,
                challengeId: 43,
                imageSrc: "/multiple_choice_options/spanish/tres.png",
                correct: false,
                text: "Tres",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tres.mp3"
            },

            // Challenge 44 (ASSIST - I have two cats)
            {
                id: optionId++,
                challengeId: 44,
                correct: true,
                text: "Tengo dos gatos",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo dos gatos.mp3"
            },
            {
                id: optionId++,
                challengeId: 44,
                correct: false,
                text: "Tengo tres gatos",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo tres gatos.mp3"
            },
            {
                id: optionId++,
                challengeId: 44,
                correct: false,
                text: "Tengo un gato",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo un gato.mp3"
            },

            // Challenge 45 (FILL - Three)
            {
                id: optionId++,
                challengeId: 45,
                correct: true,
                text: "Tres",
            },

            // Challenge 46 (SELECT - "four")
            {
                id: optionId++,
                challengeId: 46,
                imageSrc: "/multiple_choice_options/spanish/cuatro.png",
                correct: true,
                text: "Cuatro",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/cuatro.mp3"
            },
            {
                id: optionId++,
                challengeId: 46,
                imageSrc: "/multiple_choice_options/spanish/cinco.png",
                correct: false,
                text: "Cinco",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/cinco.mp3"
            },
            {
                id: optionId++,
                challengeId: 46,
                imageSrc: "/multiple_choice_options/spanish/tres.png",
                correct: false,
                text: "Tres",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tres.mp3"
            },

            // Challenge 47 (ASSIST - There are five apples)
            {
                id: optionId++,
                challengeId: 47,
                correct: true,
                text: "Hay cinco manzanas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hay cinco manzanas.mp3"
            },
            {
                id: optionId++,
                challengeId: 47,
                correct: false,
                text: "Hay seis manzanas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hay seis manzanas.mp3"
            },
            {
                id: optionId++,
                challengeId: 47,
                correct: false,
                text: "Hay cuatro manzanas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hay cuatro manzanas.mp3"
            },

            // Challenge 48 (FILL - Six)
            {
                id: optionId++,
                challengeId: 48,
                correct: true,
                text: "Seis",
            },

            // Challenge 49 (SELECT - "seven")
            {
                id: optionId++,
                challengeId: 49,
                imageSrc: "/multiple_choice_options/spanish/siete.png",
                correct: true,
                text: "Siete",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/siete.mp3"
            },
            {
                id: optionId++,
                challengeId: 49,
                imageSrc: "/multiple_choice_options/spanish/ocho.png",
                correct: false,
                text: "Ocho",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/ocho.mp3"
            },
            {
                id: optionId++,
                challengeId: 49,
                imageSrc: "/multiple_choice_options/spanish/seis.png",
                correct: false,
                text: "Seis",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/seis.mp3"
            },

            // Challenge 50 (ASSIST - I need eight chairs)
            {
                id: optionId++,
                challengeId: 50,
                correct: true,
                text: "Necesito ocho sillas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/necesito ocho sillas.mp3"
            },
            {
                id: optionId++,
                challengeId: 50,
                correct: false,
                text: "Necesito siete sillas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/necesito siete sillas.mp3"
            },
            {
                id: optionId++,
                challengeId: 50,
                correct: false,
                text: "Necesito nueve sillas",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/necesito nueve sillas.mp3"
            },

            // Challenge 51 (FILL - Nine)
            {
                id: optionId++,
                challengeId: 51,
                correct: true,
                text: "Nueve",
            },

            // Challenge 52 (SELECT - "ten")
            {
                id: optionId++,
                challengeId: 52,
                imageSrc: "/multiple_choice_options/spanish/diez.png",
                correct: true,
                text: "Diez",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/diez.mp3"
            },
            {
                id: optionId++,
                challengeId: 52,
                imageSrc: "/multiple_choice_options/spanish/nueve.png",
                correct: false,
                text: "Nueve",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/nueve.mp3"
            },
            {
                id: optionId++,
                challengeId: 52,
                imageSrc: "/multiple_choice_options/spanish/once.png",
                correct: false,
                text: "Once",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/once.mp3"
            },

            // Challenge 53 (ASSIST - I am seven years old)
            {
                id: optionId++,
                challengeId: 53,
                correct: true,
                text: "Tengo siete años",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo siete años.mp3"
            },
            {
                id: optionId++,
                challengeId: 53,
                correct: false,
                text: "Tengo ocho años",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo ocho años.mp3"
            },
            {
                id: optionId++,
                challengeId: 53,
                correct: false,
                text: "Tengo seis años",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/tengo seis años.mp3"
            },

            // Challenge 54 (FILL - One book)
            {
                id: optionId++,
                challengeId: 54,
                correct: true,
                text: "Un libro",
            },

            // Unit 3, Lesson 21, Challenge 55 (SELECT - "Monday")
            {
                id: optionId++,
                challengeId: 55,
                imageSrc: "/multiple_choice_options/spanish/lunes.png",
                correct: true,
                text: "Lunes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/lunes.mp3"
            },
            {
                id: optionId++,
                challengeId: 55,
                imageSrc: "/multiple_choice_options/spanish/martes.png",
                correct: false,
                text: "Martes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/martes.mp3"
            },
            {
                id: optionId++,
                challengeId: 55,
                imageSrc: "/multiple_choice_options/spanish/domingo.png",
                correct: false,
                text: "Domingo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/domingo.mp3"
            },

            // Challenge 56 (ASSIST - Today is Tuesday)
            {
                id: optionId++,
                challengeId: 56,
                correct: true,
                text: "Hoy es martes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hoy es martes.mp3"
            },
            {
                id: optionId++,
                challengeId: 56,
                correct: false,
                text: "Hoy es lunes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hoy es lunes.mp3"
            },
            {
                id: optionId++,
                challengeId: 56,
                correct: false,
                text: "Hoy es miércoles",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/hoy es miércoles.mp3"
            },

            // Challenge 57 (FILL - Wednesday)
            {
                id: optionId++,
                challengeId: 57,
                correct: true,
                text: "Miércoles",
            },

            // Challenge 58 (SELECT - "Thursday")
            {
                id: optionId++,
                challengeId: 58,
                imageSrc: "/multiple_choice_options/spanish/jueves.png",
                correct: true,
                text: "Jueves",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/jueves.mp3"
            },
            {
                id: optionId++,
                challengeId: 58,
                imageSrc: "/multiple_choice_options/spanish/viernes.png",
                correct: false,
                text: "Viernes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/viernes.mp3"
            },
            {
                id: optionId++,
                challengeId: 58,
                imageSrc: "/multiple_choice_options/spanish/miércoles.png",
                correct: false,
                text: "Miércoles",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/miércoles.mp3"
            },

            // Challenge 59 (ASSIST - Tomorrow is Friday)
            {
                id: optionId++,
                challengeId: 59,
                correct: true,
                text: "Mañana es viernes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/mañana es viernes.mp3"
            },
            {
                id: optionId++,
                challengeId: 59,
                correct: false,
                text: "Mañana es sábado",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/mañana es sábado.mp3"
            },
            {
                id: optionId++,
                challengeId: 59,
                correct: false,
                text: "Mañana es jueves",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/mañana es jueves.mp3"
            },

            // Challenge 60 (FILL - Saturday)
            {
                id: optionId++,
                challengeId: 60,
                correct: true,
                text: "Sábado",
            },

            // Challenge 61 (SELECT - "Sunday")
            {
                id: optionId++,
                challengeId: 61,
                imageSrc: "/multiple_choice_options/spanish/domingo.png",
                correct: true,
                text: "Domingo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/domingo.mp3"
            },
            {
                id: optionId++,
                challengeId: 61,
                imageSrc: "/multiple_choice_options/spanish/sábado.png",
                correct: false,
                text: "Sábado",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/sábado.mp3"
            },
            {
                id: optionId++,
                challengeId: 61,
                imageSrc: "/multiple_choice_options/spanish/lunes.png",
                correct: false,
                text: "Lunes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/lunes.mp3"
            },

            // Challenge 62 (ASSIST - I work on Monday)
            {
                id: optionId++,
                challengeId: 62,
                correct: true,
                text: "Trabajo el lunes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/trabajo el lunes.mp3"
            },
            {
                id: optionId++,
                challengeId: 62,
                correct: false,
                text: "Trabajo el martes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/trabajo el martes.mp3"
            },
            {
                id: optionId++,
                challengeId: 62,
                correct: false,
                text: "Trabajo el domingo",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/trabajo el domingo.mp3"
            },

            // Challenge 63 (FILL - On Friday)
            {
                id: optionId++,
                challengeId: 63,
                correct: true,
                text: "El viernes",
            },

            // Challenge 64 (SELECT - What day comes after Wednesday?)
            {
                id: optionId++,
                challengeId: 64,
                imageSrc: "/multiple_choice_options/spanish/jueves.png",
                correct: true,
                text: "Jueves",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/jueves.mp3"
            },
            {
                id: optionId++,
                challengeId: 64,
                imageSrc: "/multiple_choice_options/spanish/martes.png",
                correct: false,
                text: "Martes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/martes.mp3"
            },
            {
                id: optionId++,
                challengeId: 64,
                imageSrc: "/multiple_choice_options/spanish/viernes.png",
                correct: false,
                text: "Viernes",
                audioSrc: "/multiple_choice_options/audios/spanish/unit 3/viernes.mp3"
            },
        ]);

        console.log("Seeding Finished.")
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database.");
    }
};

main();