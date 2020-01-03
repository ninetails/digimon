export interface DigimonArgs {
  force?: boolean
  repo: string
  target: string
}

export default function digimon (args: DigimonArgs): void {
  const {
    force,
    repo,
    target
  } = args

  console.log(force, repo, target)
}
