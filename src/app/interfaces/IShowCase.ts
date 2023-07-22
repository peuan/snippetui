interface IShowCase {
  folder: string;
  files: Array<{
    fileName: string;
    characterCount: number;
    name?: string;
    auther?: string;
    color?:
      | "default"
      | "destructive"
      | "ghost"
      | "link"
      | "outline"
      | "secondary";
    tags?: string[];
  }>;
}

interface IShowCaseResult {
  files: IShowCase[];
  totalItems: number;
}
export type { IShowCase, IShowCaseResult };
