import { z } from "zod";

/**
 * --------------------------------------------------------------------------
 * Interview Score Schema
 * --------------------------------------------------------------------------
 */

const scoreField = z
  .number({
    error: "Score is required",
  })
  .int("Score must be a whole number")
  .min(0, "Minimum score is 0")
  .max(5, "Maximum score is 5");

export const interviewScoresSchema = z.object({
  understandingPersonalCare: scoreField,
  handlingMobilityIssues: scoreField,
  healthSafetyAwareness: scoreField,
  knowledgeOfSafeguarding: scoreField,
  nutritionMealPreparation: scoreField,

  spokenEnglishCompetency: scoreField,
  listeningSkills: scoreField,
  abilityToExplainInstructions: scoreField,
  empathyProfessionalLanguage: scoreField,

  timeManagementAwareness: scoreField,
  attitudeWillingnessToLearn: scoreField,
  adaptability: scoreField,
});

/**
 * --------------------------------------------------------------------------
 * Interview Note Schema
 * --------------------------------------------------------------------------
 */

export const interviewNoteSchema = z.object({
  id: z.string().min(1, "Note ID is required"),
  content: z.string().trim().min(1, "Note cannot be empty"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * --------------------------------------------------------------------------
 * Interview Form Schema
 * --------------------------------------------------------------------------
 */

export const interviewSchema = z.object({
  interviewerName: z
    .string()
    .trim()
    .min(2, "Interviewer name must contain at least 2 characters"),

  interviewDate: z.string().min(1, "Interview date is required"),

  scores: interviewScoresSchema,

  interviewerSignature: z.any().nullable().optional(),
});

/**
 * --------------------------------------------------------------------------
 * Inferred Types
 * --------------------------------------------------------------------------
 */

export type InterviewSchemaValues = z.infer<typeof interviewSchema>;

export type InterviewScoresSchemaValues = z.infer<typeof interviewScoresSchema>;

export type InterviewNoteSchemaValues = z.infer<typeof interviewNoteSchema>;
