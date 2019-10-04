const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
	this.str = '';
	this.arr = [];
  }

  _transform(chunk, encoding, callback) {
	this.str += chunk.toString();
	callback();
  }

  _flush(callback) {
	this.arr = this.str.split(os.EOL);
	for(let i=0;i<this.arr.length;i++){
		this.push(this.arr[i]);
	}
	callback();
  }
}

module.exports = LineSplitStream;
