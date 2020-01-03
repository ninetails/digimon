/* eslint-disable @typescript-eslint/camelcase */
import child_process from 'child_process'
import getConfig from '@digimon/tooling-helpers/lib/getConfig'
import cli from '.'

jest.mock('@digimon/tooling-helpers/lib/getConfig')

let mockSpawn: jest.SpyInstance<child_process.ChildProcess, [string, readonly string[], child_process.SpawnOptions]>

beforeEach(() => {
  mockSpawn = jest.spyOn(child_process, 'spawn')
  ;(getConfig as jest.MockedFunction<typeof getConfig>)
    .mockImplementation(() => '/path/to/config/file')
});

afterEach(() => jest.clearAllMocks)
afterAll(() => jest.restoreAllMocks)

describe.skip('@digimon/tooling-jest', () => {
  it('should call jest', () => {
    cli.parse([])
    expect(mockSpawn.mock.calls[0]).toHaveBeenCalledWith('jest')
  })
})
