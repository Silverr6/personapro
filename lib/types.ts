export interface AnalysisResult {
  score: number;
  scoreBreakdown: {
    formatting: number;
    content: number;
    impact: number;
    keywords: number;
  };
  cvCritique: string[];
  rewrittenSummary: string;
  linkedinHeadline: string;
  linkedinAbout: string;
  linkedinTips: string[];
  brandStatement: string;
  brandingTips: string[];
  postIdeas: string[];
}

export interface AnalyzeRequest {
  name: string;
  goal: string;
  cv: string;
  linkedin?: string;
  extra?: string;
  lang: string;
}
