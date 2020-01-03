import { guessResolverPackageNameFromRepoString } from './resolver'

jest.mock('@digimon/resolver-gitlab', () => jest.fn(), { virtual: true })
jest.mock('digimon-resolver-foo', () => jest.fn(), { virtual: true })
jest.mock('@namespace/custom-resolver', () => jest.fn(), { virtual: true })
jest.mock('@namespace/digimon-resolver-custom', () => jest.fn(), { virtual: true })

describe('guessResolverPackageNameFromRepoString', () => {
  it('should assume @digimon/resolver-github by default', () => {
    expect(guessResolverPackageNameFromRepoString('user/repo'))
      .toBe('@digimon/resolver-github')
  })

  describe('custom resolver prefixed with digimon-resolver-*', () => {
    it('should just return it', () => {
      expect(guessResolverPackageNameFromRepoString('digimon-resolver-foo:user/repo'))
        .toBe('digimon-resolver-foo')
    })
  })

  describe('custom namespaced resolver', () => {
    it('should return if is installed', () => {
      expect(guessResolverPackageNameFromRepoString('@namespace/custom-resolver:user/repo'))
        .toBe('@namespace/custom-resolver')
    })

    it('should infer digimon-resolver-', () => {
      expect(guessResolverPackageNameFromRepoString('@namespace/custom:user/repo'))
        .toBe('@namespace/digimon-resolver-custom')
    })

    // it.skip('should throw an error if not found any of above', () => {
    //   expect(() => guessResolverPackageNameFromRepoString('@namespace/non-existent:user/repo'))
    //     .toThrow()
    // })

    it('should just return the first', () => {
      expect(guessResolverPackageNameFromRepoString('@namespace/non-existent:user/repo'))
        .toBe('@namespace/non-existent')
    })
  })

  describe('fallbacks', () => {
    it('should infer a @digimon/resolver-* if installed', () => {
      expect(guessResolverPackageNameFromRepoString('gitlab:user/repo'))
        .toBe('@digimon/resolver-gitlab')
    })

    // it.skip('should throw if gets a resolver not installed @digimon/resolver-*', () => {
    //   expect(() => guessResolverPackageNameFromRepoString('bitbucket:user/repo')).toThrow()
    // })

    it('should infer a @digimon/resolver-* if not installed', () => {
      expect(guessResolverPackageNameFromRepoString('baz:user/repo'))
        .toBe('@digimon/resolver-baz')
    })
  })
})
