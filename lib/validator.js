'use strict';
const parser = require('./parser');

const validate = async (specFile) => {

    await parser.parse(specFile);
    return true;
};

module.exports = {validate};
