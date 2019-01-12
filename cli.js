#!/usr/bin/env node

// @ts-check

'use strict';

const program = require('commander');
const { version } = require('./package.json');
const validate = require('./validate');

function collect(val, item) {
  item.push(val);
  return item;
}

program
    .version(version)
    .usage('<command>')
    .option('-c, --config [configFile]', 'config file (containing JSON/YAML). See README for potential values.');

program
    .command('validate <file-or-url>')
    .description('validate Async-API documents')
    .action(validate.command);


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
