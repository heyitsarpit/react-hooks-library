import fg from 'fast-glob'

export function findFunctions(dir: string, ignore: string[] = []): string[] {
  return fg.sync('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['**/dist', '**/node_modules', ...ignore]
  })
}
