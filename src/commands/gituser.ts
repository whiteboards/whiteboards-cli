import {Command, flags} from '@oclif/command'
import * as commandExists from 'command-exists'
import * as execa from 'execa'
import * as inquirer from 'inquirer'
import * as os from 'os'

export default class GitUser extends Command {
  static description = 'set git user config'

  static flags = {
    help: flags.help({char: 'h'}),
    global: flags.boolean({char: 'g'}),
    name: flags.string({char: 'n'}),
    email: flags.string({char: 'e'})
  }

  static args = []

  async run() {
    const {flags} = this.parse(GitUser)

    const hasGit = commandExists.sync('git')

    if (!hasGit) {
      throw new Error('command git not found')
    }

    if (!flags.global) {
      const isInGitRepo = !!(await execa('git', [
        'rev-parse',
        '--is-inside-work-tree'
      ])).stdout

      if (!isInGitRepo) {
        throw new Error('not in a git repository')
      }
    }

    const questions: inquirer.Question[] = []

    if (!flags.name) {
      questions.push({
        name: 'name',
        message: 'Name',
        type: 'input',
        default: os.userInfo().username
      })
    }

    if (!flags.email) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      questions.push({
        name: 'email',
        message: 'Email',
        type: 'input',
        validate: input => emailRegex.test(input)
      })
    }

    if (questions.length > 0) {
      const answers = await inquirer.prompt(questions)

      if (answers.name) {
        flags.email = answers.name
      }

      if (answers.email) {
        flags.email = answers.email
      }
    }

    if (!flags.name || !flags.email) {
      throw new Error('Somehow we still missed your name')
    }

    execa('git', [
      'config',
      ...(flags.global ? ['--global'] : []),
      'user.name',
      flags.name
    ])
    execa('git', [
      'config',
      ...(flags.global ? ['--global'] : []),
      'user.email',
      flags.email
    ])
  }
}
