export interface InterviewScores {
  understandingPersonalCare: number;
  handlingMobilityIssues: number;
  healthSafetyAwareness: number;
  knowledgeOfSafeguarding: number;
  nutritionMealPreparation: number;

  spokenEnglishCompetency: number;
  listeningSkills: number;
  abilityToExplainInstructions: number;
  empathyProfessionalLanguage: number;

  timeManagementAwareness: number;
  attitudeWillingnessToLearn: number;
  adaptability: number;
}

export interface InterviewFormValues {
  interviewerName: string;
  interviewDate: string;

  scores: InterviewScores;

  interviewerSignature?: unknown | null;
}

export interface CreateInterviewPayload {
  interviewerName: string;
  interviewDate: string;
  scores: InterviewScores;
  interviewerSignature?: unknown | null;
}

export interface UpdateInterviewPayload {
  interviewerName?: string;
  interviewDate?: string;
  scores?: Partial<InterviewScores>;
  interviewerSignature?: unknown | null;
}

export interface Interview {
  id: string;
  application_id: string;
  interviewer_id: string;
  interviewer_name: string;
  interview_date: string;
  scores: InterviewScores;
  raw_score: number;
  normalized_score: number;
  interviewer_signature?: unknown | null;
  created_at: string;
  updated_at: string;
}

export interface InterviewNote {
  id: string;
  interview_id: string;
  content: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}
