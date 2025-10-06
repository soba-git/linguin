import { pgTable, pgEnum, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


/**
 * Courses table
 * Stores all courses available in the system
 */
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  title: text("title").notNull(), // Course title
  imageSrc: text("image_src").notNull(), // Course image path
});

/**
 * Relation from courses to user progress
 * One course can have many users progressing through it
 */
export const courseRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),   // Unit 1
  description: text("description").notNull(), // Learn how to greet in Japanese!
  courseId: integer("course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
  order: integer("order").notNull(), // order of the unit so we know how to display it
});

export const unitsRelations = relations(units, ({many,one}) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(()=> units.id, {onDelete: "cascade"}).notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({one, many}) => ({
  unit: one (units, {
    fields: [lessons.unitId],
    references: [units.id]
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "FILL"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, {onDelete: "cascade"}).notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({one, many}) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengesOptionsRelations = relations(challengeOptions, ({one}) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  })
}));

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

/**
 * User progress table
 * Stores information about each user's progress in courses
 */
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(), // Unique ID for the user
  userName: text("user_name").notNull().default("User"), // Default name if none provided
  userImageSrc: text("user_image_src").notNull().default("/user.svg"), // Default avatar
  activeCourseId: integer("active_course_id")
    .references(() => courses.id, { onDelete: "cascade" }), // Link to currently active course
  hearts: integer("hearts").notNull().default(10), // Hearts or lives user has
  points: integer("points").notNull().default(0), // Points accumulated by user
});

/**
 * Relation from user progress to courses
 * A user can have one active course
 */
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const proMembers = pgTable("pro_members",{
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  paystackCustomerId: text("paystack_customer_id").notNull().unique(),
  paystackSubscriptionId: text("paystack_subscription_id").notNull().unique(),
  paystackPriceId: text("paystack_price_id").notNull(),
  paystackCurrentSubscriptionEnd: timestamp("paystack_current_subscription_end").notNull(),
});