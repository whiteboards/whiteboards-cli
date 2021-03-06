import { Command, flags } from '@oclif/command';
import * as commandExists from 'command-exists';
import * as execa from 'execa';
import * as inquirer from 'inquirer';
import * as os from 'os';

export default class GitUser extends Command {
  public static description = 'set git user config';

  public static flags = {
    help: flags.help({ char: 'h' }),
    global: flags.boolean({ char: 'g' }),
    name: flags.string({ char: 'n' }),
    email: flags.string({ char: 'e' }),
  };

  public static args = [];

  public async run() {
    const { flags } = this.parse(GitUser);

    let { name, email } = flags;

    const hasGit = commandExists.sync('git');

    if (!hasGit) {
      return this.error("Command 'git' not found");
    }

    if (!flags.global) {
      let isInGitRepo: boolean;

      try {
        isInGitRepo = !!(await execa('git', [
          'rev-parse',
          '--is-inside-work-tree',
        ])).stdout;
      } catch (err) {
        if (err.stderr.startsWith('fatal: not a git repository')) {
          isInGitRepo = false;
        } else {
          return this.error('Unknown error while detecting git repository');
        }
      }

      if (!isInGitRepo) {
        return this.error('Not in a git repository');
      }
    }

    const questions: inquirer.Question[] = [];

    if (!name) {
      questions.push({
        name: 'name',
        message: 'Name',
        type: 'input',
        default: os.userInfo().username,
      });
    }

    if (!email) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      questions.push({
        name: 'email',
        message: 'Email',
        type: 'input',
        validate: input => emailRegex.test(input),
      });
    }

    if (questions.length > 0) {
      const answers = await inquirer.prompt(questions);

      if (answers.name) {
        name = answers.name;
      }

      if (answers.email) {
        email = answers.email;
      }
    }

    if (!name || !email) {
      return this.error('Somehow we still missed your name');
    }

    execa('git', [
      'config',
      ...(flags.global ? ['--global'] : []),
      'user.name',
      name,
    ]);
    execa('git', [
      'config',
      ...(flags.global ? ['--global'] : []),
      'user.email',
      email,
    ]);

    this.log(
      `\nSuccessfully set your ${
        flags.global ? 'global' : 'local'
      } git config!`,
    );
  }
}
