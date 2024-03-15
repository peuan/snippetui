interface IFile {
  fileName: string
  characterCount: number
  status: string
  description?: string
  percentage?: string
  color?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
  rank: number
}
interface IBattle {
  folder: string
  files: Array<IFile>
}

interface IBattleResult {
  files: IBattle[]
  totalItems: number
  allFiles: Array<IFile>
}
export type { IBattle, IBattleResult, IFile }
