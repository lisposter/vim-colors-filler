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
    var xFg = fg.toLowerCase() === 'none' ? 'NONE' : getX256(fg);
    var xBg = bg.toLowerCase() === 'none' ? 'NONE' : getX256(bg);
    return line.replace(/ctermfg=(#?\w+)\s/g, 'ctermfg=' + xFg + ' ').replace(/ctermbg=(#?\w+)\s/g, 'ctermbg=' + xBg + ' ');
  }).join('\n');
}

function getX256(str) {
  return x256.apply(null, hexRgb(str));
}
