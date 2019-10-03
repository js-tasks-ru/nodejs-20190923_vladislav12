const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._limit = options.limit;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    const len = Buffer.byteLength(chunk);
    if (len > (this._limit - this.size)) return callback(new LimitExceededError());
    this.size += len;
    this.push(chunk);
    callback();
  }
}

module.exports = LimitSizeStream