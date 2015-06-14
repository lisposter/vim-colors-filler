#! /usr/bin/env node
'use strict';

const fs = require('fs');
const filler = require('../');

var filePathFrom = process.argv[2];
var filePathTo = process.argv[3];

fs.writeFileSync(filePathTo, filler.gui2cterm(fs.readFileSync(filePathFrom).toString()));
