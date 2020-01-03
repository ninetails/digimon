import { existsSync } from 'fs'
import { join } from 'path'

export default function getConfig<T = any> (fileNames: string[] = [], paths: string[] = [], returnIfNoneFound?: T): string | T {
  for (const path of paths) {
    for (const fileName of fileNames) {
      const testFile = join(path, fileName)
      if (existsSync(testFile)) {
        return testFile
      }
    }
  }

  const allTests = paths.flatMap((path: string) => fileNames.map((fileName: string) => join(path, fileName)))

  if (returnIfNoneFound === undefined) {
    throw new Error(`Config file not found. Tested for:\n${allTests.join('\n')}`)
  }

  return returnIfNoneFound
}
