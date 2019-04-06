whiteboards-cli
===============

Whiteboards CLI Utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/whiteboards-cli.svg)](https://npmjs.org/package/whiteboards-cli)
[![Downloads/week](https://img.shields.io/npm/dw/whiteboards-cli.svg)](https://npmjs.org/package/whiteboards-cli)
[![License](https://img.shields.io/npm/l/whiteboards-cli.svg)](https://github.com/whiteboards/whiteboards-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g whiteboards-cli
$ wbds COMMAND
running command...
$ wbds (-v|--version|version)
whiteboards-cli/0.1.0 linux-x64 node-v10.15.1
$ wbds --help [COMMAND]
USAGE
  $ wbds COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wbds hello [FILE]`](#wbds-hello-file)
* [`wbds help [COMMAND]`](#wbds-help-command)

## `wbds hello [FILE]`

describe the command here

```
USAGE
  $ wbds hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ wbds hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/whiteboards/whiteboards-cli/blob/v0.1.0/src/commands/hello.ts)_

## `wbds help [COMMAND]`

display help for wbds

```
USAGE
  $ wbds help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
