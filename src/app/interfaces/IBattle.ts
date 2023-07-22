interface IBattle {
  folder: string;
  files: Array<{
    fileName: string;
    characterCount: number;
    status: string;
    description?: string;
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "error"
      | "gradient";
  }>;
}

interface IBattleResult {
  files: IBattle[];
  totalItems: number;
}
export type { IBattle, IBattleResult };
