#!/usr/bin/env node

'use strict'

const converter = require('./lib/converter.js');
const formats = converter.formats;

const command = async (specFilePath, targetFormat) => {

    if (targetFormat !== formats.YAML || targetFormat !== formats.JSON) {
        console.log("throw `Invalid target format: ${targetFormat}`;");
        process.exit(1);
    }

    const document = await converter.convert(specFilePath, targetFormat);
    console.log(document);
};


module.exports = { command };
