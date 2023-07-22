interface IBattle {
  folder: string;
  files: Array<{
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
  }>;
}

interface IBattleResult {
  files: IBattle[];
  totalItems: number;
}
export type { IBattle, IBattleResult };
