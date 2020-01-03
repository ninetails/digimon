export function guessResolverPackageNameFromRepoString (repo: string, req = require): string {
  const [,, resolver] = repo.match(/^(([^:]+):)?([^:]+)$/) as Array<string|undefined>

  if (resolver === undefined) {
    return '@digimon/resolver-github'
  }

  if (resolver.includes('digimon-resolver-')) {
    return resolver
  }

  if (resolver.startsWith('@') && resolver.includes('/')) {
    try {
      req(resolver)
      return resolver
    } catch (err) {}

    const [, ns, pkg] = resolver.match(/^@([^/]+)\/([^/]+)$/) as Array<string|undefined>
    try {
      req(`@${ns}/digimon-resolver-${pkg}`)
      return `@${ns}/digimon-resolver-${pkg}`
    } catch (err) {}
    // throw new Error(`Resolver not found (tried ${resolver} and ${`@${ns}/digimon-resolver-${pkg}`}). Please install it globally before running digimon.`)

    return resolver
  }

  try {
    req(`@digimon/resolver-${resolver}`)
    return `@digimon/resolver-${resolver}`
  } catch (err) {}
  // throw new Error(`Resolver not found (${`@digimon/resolver-${resolver}`}). Please install it globally before running digimon.`)

  // fallback
  return `@digimon/resolver-${resolver}`
}
