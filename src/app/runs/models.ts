export interface HostParams {
  host: string;
}

export interface ProjectParams extends HostParams {
  project: string;
}

export interface BranchParams extends ProjectParams {
  branch: string;
}

export interface BuildParams extends ProjectParams {
  build: string;
}

export interface RunsParams extends BuildParams {
  url: string;
}

export interface BuildFormState {
  host?: string;
  project?: Project;
  url?: URL;
  branch?: Branch;
  build?: Build;
}

export interface Project {
  id: string;
  name: string;
  baseBranch: string;
}

export interface Branch {
  branch: string;
}

export interface URL {
  url: string;
}

export interface Build {
  id: string;
  branch: string;
  commitMessage: string;
}

export interface RunsFormState {
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
