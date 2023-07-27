interface IFile {
  fileName: string;
  characterCount: number;
  status: string;
  description?: string;
  color?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
}
interface IBattle {
  folder: string;
  files: Array<IFile>;
}

interface IBattleResult {
  files: IBattle[];
  totalItems: number;
}
export type { IBattle, IBattleResult, IFile };
