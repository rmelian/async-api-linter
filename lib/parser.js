const fs = require('fs');
const path = require('path');
const ZSchema = require('z-schema');
const YAML = require('js-yaml');
const RefParser = require('json-schema-ref-parser');

const validator = new ZSchema();

async function getFileContent (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, filePath), (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

function parseContent (content) {
  content = content.toString('utf8');
  try {
    return JSON.parse(content);
  } catch (e) {
    return YAML.safeLoad(content);
  }
}

async function dereference (json) {
  return RefParser.dereference(json, {
    dereference: {
      circular: 'ignore'
    }
  });
}

async function bundle(json) {
  return RefParser.bundle(json, {
    dereference: {
      circular: 'ignore'
    }
  });
}

async function validate (json, schema) {
  return new Promise((resolve, reject) => {
    validator.validate(json, schema, (err, valid) => {
      if (err) return reject(err);
      return resolve(json);
    });
  });
}

async function parse (filePath) {
    let content, parsedContent, dereferencedJSON, bundledJSON, parsed;

    if (typeof filePath === 'string') {
      content = await getFileContent(filePath);
    } else if (typeof filePath === 'object') {
      content = JSON.stringify(filePath);
    } else {
      // console.error(`Could not find a valid asyncapi definition: ${filePath}`);
      throw `Could not find a valid asyncapi definition: ${filePath}`;
    }


  try {
    parsedContent = parseContent(content);
  } catch (e) {
    console.error('Can not parse the content of the AsyncAPI specification file');
    // console.error(e);
      throw e;
  }

  try {
    dereferencedJSON = await dereference(parsedContent);
  } catch (e) {
    console.error('Can not dereference the JSON obtained from the content of the AsyncAPI specification file');
    // console.error(e);
      throw e;
  }

  try {
    bundledJSON = await bundle(dereferencedJSON);
  } catch (e) {
      console.error('Can not bundle the JSON obtained from the content of the AsyncAPI specification file');
    // console.error(e);
      throw e;
  }

  try {
    const asyncAPIschema = require('asyncapi')[bundledJSON.asyncapi];
    parsed = await validate(bundledJSON, asyncAPIschema);
  } catch (e) {
    console.error('Invalid JSON obtained from the content of the AsyncAPI specification file');
    // console.error(e);
      throw e;
  }

  return JSON.parse(JSON.stringify(parsed));
};

module.exports = {
    parse: parse,
    getFileContent: getFileContent,
    dereference: dereference,
    bundle, bundle
};

