import fs from 'fs'
import { join } from 'path'
import getConfig from './getConfig'

let mockExistsSync: jest.SpyInstance<boolean, [fs.PathLike]>

beforeEach(() => {
  mockExistsSync = jest.spyOn(fs, 'existsSync')
})

afterEach(() => jest.clearAllMocks)
afterEach(() => jest.restoreAllMocks)

describe('getConfig', () => {
  it('should test for each fileName & path', () => {
    mockExistsSync
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true)

    expect(getConfig(['file-1', 'file-2'], ['path-1', 'path-2'])).toBe(join('path-2', 'file-2'))
  })

  it('should throw an error if none found', () => {
    mockExistsSync.mockImplementation(() => false)

    expect(() => getConfig(['file-1', 'file-2'], ['path-1', 'path-2']))
      .toThrowErrorMatchingInlineSnapshot(`
"Config file not found. Tested for:
path-1/file-1
path-1/file-2
path-2/file-1
path-2/file-2"
`)
  })

  it('should return if thing to return passed', () => {
    let config

    expect(() => {
      config = getConfig(['file-1', 'file-2'], ['path-1', 'path-2'], null)
    })
      .not.toThrow()

    expect(config).toBe(null)
  });
})
