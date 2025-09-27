import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
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