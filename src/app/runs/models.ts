export interface BuildParams {
  host?: string;
  project?: Project;
  build?: Build;
}

export interface Project {
  id: string;
  name: string;
}

export interface RawBuild {
  id: string;
  branch: string;
  commitMessage: string;
}

export interface Build extends RawBuild {
  name: string;
}

export interface RunsParams {
  category?: Category;
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

export interface Category {
  id: string;
  title: string;
  score: number;
  auditRefs: { id: string; weight: string }[];
}

export interface LHR {
  environment: {
    benchmarkIndex: number;
  };
  audits: Record<string, Audit>;
  categories: Record<string, Category>;
}

export type Run = RawRun & {
  lhr: LHR;
};

export interface Cell {
  label: string;
  value: unknown;
}

export interface Row {
  id: string;
  cells: Cell[];
}
