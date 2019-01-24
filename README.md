<h1 align="center">AsyncAPI linter</h1>
<p align="center">
  <em>Validate your AsyncAPI specifications</em>
</p>
<br><br>

## Install

```bash
npm install -g asyncapi-linter
```

## Usage

```bash
Usage: asyncapi-linter <command>

Options:

-V, --version                 output the version number
-h, --help                    output usage information

Commands:
validate <file-or-url>     validate AsyncAPI file/url. If valid, exit code is 0, otherwise exit code is 1    
convert <file-or-url>      convert AsyncAPI file/url from YAML to JSON and vice-versa. No compression is performed
```

### Validate Command
```bash
Usage: asyncapi-linter validate
```

#### Examples

validate a yaml specification
```bash
asyncapi-linter validate asyncapi.yaml
```

validate a json specification
```bash
asyncapi-linter validate asyncapi.json
```

### Convert Command
```bash
Usage: asyncapi-linter convert

Options:

-f, --format   specify desired target format: json|yaml
-h, --help     output usage information

```

#### Examples

convert to yaml
```bash
asyncapi-linter convert -f json asyncapi.json
```

convert to json
```bash
asyncapi-linter convert -f yaml asyncapi.json
```


## Requirements

* Node.js v7.6+

## Author

Raisel Melian ([@raiselmelian](http://twitter.com/raiselmelian))
