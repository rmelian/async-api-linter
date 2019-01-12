'use strict';
const parse = require('./parser');

const validate = async (specFile) => {

    await parse(specFile);
    return true;

};

module.exports = {validate};
