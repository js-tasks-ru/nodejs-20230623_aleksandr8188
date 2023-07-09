const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limitLeft = options.limit;
    this.encoding = options.encoding;
  }

  _transform(chunk, encoding, callback) {
    if (chunk.toString(this.encoding).length > this.limitLeft) {
      return callback(new LimitExceededError());
    }

    this.limitLeft -= chunk.toString().length;

    return callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
