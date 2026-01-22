
export enum PrizeType {
  MAGNET = 'magnet',
  JOKE = 'joke'
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  type: PrizeType;
  color: string;
  longDescription: string;
  downloadUrl?: string;
}

export interface Lead {
  name: string;
  phone: string;
  province: string;
  sector: string;
  budget_band: string;
  // Nuevos campos para el informe mierder
  squad_size: string;
  target_danger: number; // 1-10
  risk_of_ex_call: string;
  party_vibe: string;
  mvp_drunk: string;
}

export interface Diagnosis {
  global_score: number;
  liver_score: number;
  chaos_score: number;
  shame_score: number;
  summary: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  viral_quote: string;
  recommended_next_step: string;
}

export type AppStep = 'welcome' | 'form_lead' | 'form_details' | 'wheel' | 'result';
