#!/usr/bin/env node

// @ts-check

'use strict';

const program = require('commander');
const { version } = require('./package.json');
const validate = require('./validate');
const convert = require('./convert');

program
    .version(version)
    .usage('<command>');

program
    .command('validate <file-or-url>')
    .description('validate AsyncAPI file/url. If valid, exit code is 0, otherwise exit code is 1')
    .action(validate.command);

program
    .command('convert <file-or-url>')
    .description('convert AsyncAPI file/url from YAML to JSON and vice-versa. No compression is performed')
    .option('-f, --format <format>', 'specify desired target format: json|yaml')
    .action((specFile, cmd) => {
        console.log(cmd.format);
        convert.command(specFile, cmd.format)
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
