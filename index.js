'use strict';

const hexRgb = require('hex-rgb');
const x256 = require('x256');

module.exports = {
  gui2cterm: gui2cterm,
//  cterm2gui: cterm2gui
};

function gui2cterm(str) {
  var lines = str.split('\n');
  return lines.map(function(line) {
    if (line.indexOf('guibg') < 0) return line;
    var fg = /guifg=(#?\w+)\s/g.exec(line)[1];
    var bg = /guibg=(#?\w+)\s/g.exec(line)[1];
    return line.replace(/ctermfg=(#?\w+)\s/g, 'ctermfg=' + getX256(fg) + ' ').replace(/ctermbg=(#?\w+)\s/g, 'ctermbg=' + getX256(bg) + ' ');
  }).join('\n');
}

function getX256(str) {
  return x256.apply(null, hexRgb(str));
}
