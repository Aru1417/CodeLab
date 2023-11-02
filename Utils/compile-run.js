const os = require('os');
const _ = require('lodash');
const { fs, errorToJSON, exec } = require('../Utils/global');
const { c, node, python,cpp ,java} = require('compile-run');

const osCompile = {
    'exe': ['windows_nt'],
    'out': ['darwin', 'linux']
};



module.exports = {
    c,
    node,
    python,cpp,java
};