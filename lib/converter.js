'use strict';
const parser = require('./parser');
const YAML = require('js-yaml');

const formats = Object.freeze({
    JSON: "json",
    YAML: "yaml"
});

function convertToJson(content) {

    let jsonObject = JSON.parse(content);

    return YAML.safeDump(jsonObject);
}

async function convertToYaml(content) {
    const parsedContent = YAML.safeLoad(content);

    const bundledContent = await parser.bundle(parsedContent);

    const dereferencedContent = await parser.dereference(bundledContent);

    return JSON.stringify(dereferencedContent);
}

const convert = async (specFilePath, targetFormat) => {

    let content = await parser.getFileContent(specFilePath);

    content = content.toString('utf8');

    if (targetFormat === formats.YAML) {

        return convertToJson(content);

    } else if (targetFormat === formats.JSON) {

        return await convertToYaml(content);
    }

    throw `Invalid target format: ${targetFormat}`;
};

module.exports = {
    convert: convert,
    formats: formats
};

