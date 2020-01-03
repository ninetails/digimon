export default function resolver (repo: string): Promise<{path: string}>|null {
  console.log('resolver', repo)
  return new Promise((resolve) => resolve({ path: 'foo' }))
}
