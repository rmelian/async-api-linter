#!/usr/bin/env node

'use strict'

const validator = require('./lib/validator.js');

const command = async (specFile, cmd) => {
    try {
        await validator.validate(specFile);
        // console.log("valid");
        process.exit(0);
    }catch (e) {
        // console.error("NOT valid");
        // console.error(e.message);
        process.exit(1);
    }

};


module.exports = { command };
