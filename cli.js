#!/usr/bin/env node

// @ts-check

'use strict';

const program = require('commander');
const { version } = require('./package.json');
const validate = require('./validate');
const convert = require('./convert');

function collect(val, item) {
  item.push(val);
  return item;
}

program
    .version(version)
    .usage('<command>');
    // .option('-c, --config [configFile]', 'config file (containing JSON/YAML). See README for potential values.');

program
    .command('validate <file-or-url>')
    .description('validate AsyncAPI file/url')
    .action(validate.command);

program
    .command('convert <file-or-url>')
    .description('convert AsyncAPI file/url from YAML to JSON and vice-versa. No compression is performed')
    .option('-f, --format <format>', 'specify desired target format: json|yaml', /^(json|yaml)$/i)
    .action((specFile, cmd) => {
        convert.command(specFile, cmd.format)
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
