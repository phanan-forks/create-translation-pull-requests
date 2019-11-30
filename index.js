const github = require('@actions/github')
const core = require('@actions/core')

const generateBranchName = () => `changes-${Date.now()}`

try {
  const octokit = new github.GitHub(core.getInput('GITHUB_TOKEN'))

  console.log(JSON.stringify(github.context.payload, undefined, 2))

  const branch = octokit.git.createRef({
    owner: github.context.payload.repository.owner.login,
    repo: github.context.payload.repository.name,
    ref: generateBranchName(),
    sha: github.context.payload.head
  })

  console.log(JSON.stringify(branch, undefined, 2))
} catch (error) {
  core.setFailed(error.message);
}
