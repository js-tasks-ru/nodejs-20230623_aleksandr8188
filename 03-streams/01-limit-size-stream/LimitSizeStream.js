const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limitLeft = options.limit;
    this.encoding = options.encoding;
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.byteLength(chunk, this.encoding) > this.limitLeft) {
      return callback(new LimitExceededError());
    }

    this.limitLeft -= Buffer.byteLength(chunk, this.encoding);

    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
