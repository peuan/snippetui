interface IShowCase {
  folder: string;
  files: Array<{
    fileName: string;
    characterCount: number;
    name?: string;
    auther?: string;
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "error"
      | "gradient";
    tags?: string[];
  }>;
}

interface IShowCaseResult {
  files: IShowCase[];
  totalItems: number;
}
export type { IShowCase, IShowCaseResult };
