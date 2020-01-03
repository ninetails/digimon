import cli from '.'
import digimon from '@digimon/core'

jest.mock('@digimon/core', () => jest.fn())

afterEach(() => jest.clearAllMocks)
afterAll(() => jest.restoreAllMocks)

describe('@digimon/cli', () => {
  it('should call @digimon/core', () => {
    cli.parse(['repo', 'target'])
    expect(digimon).toHaveBeenCalledWith(expect.objectContaining({
      force: false,
      repo: 'repo',
      target: 'target'
    }))
  })

  describe('parameters', () => {
    describe('force', () => {
      it('should be false by default', () => {
        cli.parse(['repo', 'target'])
        expect(digimon).toHaveBeenCalledWith(expect.objectContaining({
          force: false
        }))
      })

      it('should repass -f', () => {
        cli.parse(['-f', 'repo', 'target'])
        expect(digimon).toHaveBeenCalledWith(expect.objectContaining({
          force: true
        }))
      })
    })

    describe('path', () => {
      it('should pass nothing by default', () => {
        cli.parse(['repo', 'target'])
        expect((digimon as jest.MockedFunction<typeof digimon>).mock.calls[0][0]).not.toHaveProperty('path')
      })

      it('should repass path', () => {
        cli.parse(['-p', 'foo', 'repo', 'target'])
        expect(digimon).toHaveBeenCalledWith(expect.objectContaining({
          path: 'foo'
        }))
      })
    })
  })
})
