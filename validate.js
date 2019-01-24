#!/usr/bin/env node

'use strict'

const validator = require('./lib/validator.js');

const command = async (specFile, cmd) => {
    try {
        await validator.validate(specFile);
        console.log("Valid AsyncAPI document");
        process.exit(0);
    }catch (e) {
        console.log("Non valid AsyncAPI document");
        console.error(e.message);
        process.exit(1);
    }

};


module.exports = { command };
