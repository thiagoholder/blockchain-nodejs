const Block = require('./block.js');

const block = new Block('3123', '21313145DLASKJ', '09810983DKJAHSH', '100' );
console.log(block.toString());
console.log(Block.genesis().toString());
const primeiroBloco = Block.mineBlock(Block.genesis(), '$500');
console.log(primeiroBloco.toString());