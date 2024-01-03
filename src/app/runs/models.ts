export interface BuildParams {
  host: string;
  project: string;
  buildId: string;
}

export interface LHRParams {
  audits: string[];
}

export interface RawRun {
  id: string;
  projectId: string;
  buildId: string;
  representative: boolean;
  url: string;
  lhr: string;
}

interface Audit {
  id: string;
  title: string;
  score: number;
  numericValue: number;
}

export interface LHR {
  environment: {
    benchmarkIndex: number;
  };
  audits: Record<string, Audit>;
}

export type Run = RawRun & {
  lhr: LHR;
};

export interface Statistic {
  id: string;
  benchmarkIndex: number;
  audits: Audit[];
}
