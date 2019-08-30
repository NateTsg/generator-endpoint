# generator-endpoint [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> it generates base template to start a node api project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-endpoint using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-endpoint
```
### Usage
Start the generator:
```bash
yo endpoint
```
Then generate your new project by answering the following prompts.

![Alt text](https://media.giphy.com/media/IgMPE75aeZbpNEpSIB/giphy.gif "Generator endpoint usage")

Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.

That'll generate a project with all the common tools setup. This includes:

- Filled package.json file
- Moongoose models
- Endpoints for those models
- Default User Model with authentication

License

### Running your server

First go into the directory of your application and install the dependencies
```bash
npm install
```
Then run the project using
```bash
npm run dev
```
## Getting To Know Yeoman
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

ISC © [Nathan]()


[npm-image]: https://badge.fury.io/js/generator-endpoint.svg
[npm-url]: https://npmjs.org/package/generator-endpoint
[travis-image]: https://travis-ci.com/NateTsg/generator-endpoint.svg?branch=master
[travis-url]: https://travis-ci.com/NateTsg/generator-endpoint
[daviddm-image]: https://david-dm.org/NateTsg/generator-endpoint.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/NateTsg/generator-endpoint
